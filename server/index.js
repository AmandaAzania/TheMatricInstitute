import { createServer } from "node:http";

const PORT = Number(process.env.PORT || 3000);
const KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const ORIGIN = process.env.ALLOWED_ORIGIN || "";
const MAX_BODY = 20000;
const hits = new Map();

function send(res, status, payload, origin = "") {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...(origin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
  });
  res.end(JSON.stringify(payload));
}

const systemInstruction = `You are Professor Dumbledore, a fictional, warm, thoughtful academic tutor for The Matric Institute, a South African Grade 12 study platform. Do not claim to be a real person or an official Harry Potter character service. Speak in clear, supportive, concise English. Focus on South African CAPS/NSC study terminology, but do not claim you have checked official CAPS documents. For academic questions: ask what the learner knows, break down explanations into small steps, offer worked examples and one short check-for-understanding question. If asked for a quiz, ask one question at a time and wait for an answer before grading it. Do not invent facts or exam marking guidelines. If unsure, say so and suggest checking the official textbook or teacher. Do not request personal data. Avoid making decisions for the learner or presenting guesses as certain. For unsafe or age-inappropriate requests, redirect to safe educational help.`;

createServer(async (req, res) => {
  const requestOrigin = req.headers.origin || "";
  const permitted = Boolean(ORIGIN && requestOrigin === ORIGIN);
  if (req.method === "GET" && req.url === "/health") return send(res, 200, { ok: true, provider: "gemini" });
  if (req.method === "OPTIONS" && req.url === "/api/tutor/chat") {
    if (!permitted) return send(res, 403, { error: "Origin not allowed" });
    res.writeHead(204, { "Access-Control-Allow-Origin": ORIGIN, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "600", Vary: "Origin" });
    return res.end();
  }
  if (req.url !== "/api/tutor/chat" || req.method !== "POST") return send(res, 404, { error: "Not found" });
  if (!permitted) return send(res, 403, { error: "Origin not allowed" });
  if (!KEY) return send(res, 503, { error: "AI service is not configured" }, ORIGIN);
  const ip = (req.socket.remoteAddress || "unknown");
  const now = Date.now();
  const record = hits.get(ip) || { count: 0, reset: now + 60000 };
  if (now > record.reset) { record.count = 0; record.reset = now + 60000; }
  record.count++;
  hits.set(ip, record);
  if (hits.size > 2000) for (const [key, value] of hits) if (now > value.reset) hits.delete(key);
  if (record.count > 12) return send(res, 429, { error: "Too many questions. Please wait a minute." }, ORIGIN);
  let raw = "";
  try {
    for await (const chunk of req) {
      raw += chunk.toString();
      if (raw.length > MAX_BODY) return send(res, 413, { error: "Request too large" }, ORIGIN);
    }
    const body = JSON.parse(raw);
    if (typeof body.message !== "string" || !body.message.trim() || body.message.length > 1500) return send(res, 400, { error: "Please enter a question under 1500 characters." }, ORIGIN);
    const topic = typeof body.topic === "string" ? body.topic.slice(0, 70) : "General";
    const subjects = Array.isArray(body.subjects) ? body.subjects.filter(s => typeof s === "string").slice(0, 12).map(s => s.slice(0, 80)) : [];
    const history = Array.isArray(body.history) ? body.history.slice(-12).filter(m => m && ["user", "model"].includes(m.role) && typeof m.text === "string").map(m => ({ role: m.role, parts: [{ text: m.text.slice(0, 1500) }] })) : [];
    const contents = [...history, { role: "user", parts: [{ text: body.message }] }];
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    let upstream;
    try {
      upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: `${systemInstruction}\nCurrent subject: ${topic}. Learner-selected subjects: ${subjects.join(", ") || "not selected"}.` }] }, contents, generationConfig: { maxOutputTokens: 600, temperature: 0.5 } }),
        signal: controller.signal,
      });
    } finally { clearTimeout(timer); }
    if (!upstream.ok) {
      // Log only the HTTP status and a safe, allowlisted category. Never log keys, prompts, or raw provider responses.
      const category = ({
        400: "INVALID_REQUEST_OR_MODEL", 401: "UNAUTHORIZED_KEY", 403: "PERMISSION_DENIED_OR_KEY_RESTRICTION",
        404: "MODEL_NOT_FOUND", 429: "RATE_LIMIT_OR_QUOTA", 500: "PROVIDER_INTERNAL_ERROR",
        502: "PROVIDER_GATEWAY_ERROR", 503: "PROVIDER_UNAVAILABLE", 504: "PROVIDER_TIMEOUT",
      })[upstream.status] || "OTHER_PROVIDER_ERROR";
      console.error(`[Gemini API] HTTP ${upstream.status}; category=${category}`);
      return send(res, upstream.status === 429 ? 429 : 502, {
        error: upstream.status === 429 ? "AI free-tier limit reached. Please try later." : "AI provider is temporarily unavailable."
      }, ORIGIN);
    }
    const result = await upstream.json();
    const reply = result.candidates?.[0]?.content?.parts?.map(p => p.text || "").join(" ").trim();
    if (!reply) return send(res, 502, { error: "The AI did not return an answer. Please try again." }, ORIGIN);
    return send(res, 200, { reply: reply.slice(0, 5000) }, ORIGIN);
  } catch (error) {
    return send(res, 502, { error: "Could not reach the AI provider. Please try again." }, ORIGIN);
  }
}).listen(PORT, "0.0.0.0", () => console.log(`Tutor API listening on port ${PORT}`));
