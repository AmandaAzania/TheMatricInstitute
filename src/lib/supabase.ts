// Supabase Auth REST client. Only the public anon/publishable key belongs in the frontend.
const URL = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
export const configured = Boolean(URL && KEY);
export type Session = { access_token: string; refresh_token: string; expires_at?: number; user: { id: string; email?: string } };
const SESSION_KEY = "tmi_session_v1";
export function storedSession(): Session | null { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch { return null; } }
function save(s: Session | null) { if (s) sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); else sessionStorage.removeItem(SESSION_KEY); }
async function request(path: string, method = "GET", body?: unknown, token?: string) {
  const response = await fetch(`${URL}${path}`, { method, headers: { apikey: KEY, Authorization: `Bearer ${token || KEY}`, "Content-Type": "application/json", ...(path.includes("on_conflict=") ? { Prefer: "resolution=merge-duplicates" } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.msg || data.error_description || data.message || data.error || `Request failed (${response.status})`);
  return data;
}
export async function signIn(email: string, password: string): Promise<Session> { const s = await request("/auth/v1/token?grant_type=password", "POST", {email,password}); save(s); return s; }
export async function signUp(email: string, password: string) { return request("/auth/v1/signup", "POST", {email,password}); }
export async function recover(email: string) { return request("/auth/v1/recover", "POST", {email}); }
export async function refresh(): Promise<Session | null> { const s = storedSession(); if (!s) return null; try { const next = await request("/auth/v1/token?grant_type=refresh_token", "POST", {refresh_token:s.refresh_token}); save(next); return next; } catch { save(null); return null; } }
export async function validSession(): Promise<Session | null> { const s=storedSession(); if (!s) return null; if (s.expires_at && Date.now()/1000 > s.expires_at-60) return refresh(); try { await request("/auth/v1/user", "GET", undefined, s.access_token); return s; } catch { return refresh(); } }
export async function signOut() { const s=storedSession(); if(s) { try { await request("/auth/v1/logout", "POST", {}, s.access_token); } catch { /* clear locally even if offline */ } } save(null); }
export type LearnerProfile = { user_id: string; display_name: string; tutor_name: string; goal: string; subjects: string[] };
export async function getProfile(s: Session): Promise<LearnerProfile | null> { const rows = await request(`/rest/v1/learner_profiles?user_id=eq.${encodeURIComponent(s.user.id)}&select=*`, "GET", undefined, s.access_token); return rows[0] || null; }
export async function putProfile(s: Session, p: Omit<LearnerProfile,"user_id">) { return request("/rest/v1/learner_profiles?on_conflict=user_id", "POST", {user_id:s.user.id,...p}, s.access_token); }
export type StudyAttempt = { subject: string; score: number; total: number; created_at?: string };
export async function saveAttempt(s: Session, a: StudyAttempt) { return request("/rest/v1/study_attempts", "POST", {user_id:s.user.id,...a}, s.access_token); }
export async function getAttempts(s: Session): Promise<StudyAttempt[]> { return request(`/rest/v1/study_attempts?user_id=eq.${encodeURIComponent(s.user.id)}&select=subject,score,total,created_at&order=created_at.desc&limit=100`, "GET", undefined, s.access_token); }
