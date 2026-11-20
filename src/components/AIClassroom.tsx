import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, GraduationCap, Lightbulb, Mic, MicOff, Send, Sparkles, Square, Volume2, VolumeX, WandSparkles } from "lucide-react";
import "./AIClassroom.css";
import { initialSession, replyToLearner } from "./tutorEngine";

type Props = { selectedSubjects: string[]; onOpenCurriculum: () => void };
type Message = { role: "tutor" | "student"; text: string };
type RecognitionResult = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type RecognitionInstance = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: RecognitionResult) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type RecognitionConstructor = new () => RecognitionInstance;
type SpeechWindow = Window & {
  SpeechRecognition?: RecognitionConstructor;
  webkitSpeechRecognition?: RecognitionConstructor;
};

const welcome = "Welcome to your learning space! I'm your AI tutor. You can give me a name, choose a subject, and tell me how you prefer to start. We'll adapt as we learn together.";
const subjectQuestions: Record<string, string> = {
  "Mathematics": "Help me understand quadratic equations",
  "Mathematical Literacy": "Show me how to calculate percentages in a budget",
  "Physical Sciences": "Explain Newton's laws with examples",
  "Life Sciences": "Explain meiosis in simple terms",
  "English": "Help me analyse a poem",
  "Geography": "Explain tropical cyclones",
  "History": "Help me understand the Cold War",
  "Accounting": "Explain cash flow statements",
  "Business Studies": "Explain the functions of management",
  "Economics": "Explain inflation and its effects",
  "Agricultural Sciences": "Explain soil fertility",
  "Computer Applications Technology": "Explain spreadsheet formulas",
  "Information Technology": "Explain object-oriented programming",
  "Tourism": "Explain sustainable tourism",
  "Exam Skills": "Help me plan my exam revision",
};
const allSubjects = ["Mathematics", "Mathematical Literacy", "Physical Sciences", "Life Sciences", "English", "Geography", "History", "Accounting", "Business Studies", "Economics", "Agricultural Sciences", "Computer Applications Technology", "Information Technology", "Tourism", "Exam Skills"];

export default function AIClassroom({ selectedSubjects, onOpenCurriculum }: Props) {
  const [messages, setMessages] = useState<Message[]>([{ role: "tutor", text: welcome }]);
  const [tutorName] = useState(() => {
    try { return localStorage.getItem("tmi_tutor_name") || ""; } catch { return ""; }
  });
  const subjects = selectedSubjects.length ? selectedSubjects : allSubjects;
  const displayName = tutorName.trim() || "Your AI tutor";
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const chatHistoryRef = useRef<{ role: "user" | "model"; text: string }[]>([]);
  const [topic, setTopic] = useState<string>("");
  const suggestions = [subjectQuestions[topic] || "Help me understand this subject", "Quiz me on this subject", "Give me a hint", "Help me make a study plan", "How do I prepare for exams?"];
  const [subjectChoice, setSubjectChoice] = useState<string>("");
  const [started, setStarted] = useState(false);
  const [learningPreference, setLearningPreference] = useState("Explain simply");
  const sessionRef = useRef(initialSession());
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<RecognitionInstance | null>(null);
  const voiceRef = useRef(false);
  const voiceSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const recognitionSupported = typeof window !== "undefined" &&
    Boolean((window as SpeechWindow).SpeechRecognition || (window as SpeechWindow).webkitSpeechRecognition);

  useEffect(() => { voiceRef.current = voiceEnabled; }, [voiceEnabled]);
  useEffect(() => { try { localStorage.setItem("tmi_tutor_name", tutorName.trim().slice(0, 40)); } catch { /* storage may be unavailable */ } }, [tutorName]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);
  useEffect(() => () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    recognitionRef.current?.stop();
  }, []);

  const speak = (text: string) => {
    if (!voiceSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-ZA";
    utterance.rate = 0.92;
    utterance.pitch = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.toLowerCase().startsWith("en"));
    if (englishVoice) utterance.voice = englishVoice;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const send = async (value = draft) => {
    const question = value.trim();
    if (!question || loading || !started) return;
    setDraft("");
    setMessages(current => [...current, { role: "student", text: question }]);
    const apiUrl = import.meta.env.VITE_TUTOR_API_URL as string | undefined;
    if (!apiUrl) {
      const result = replyToLearner(question, sessionRef.current, selectedSubjects);
      sessionRef.current = result.session;
      setMessages(current => [...current, { role: "tutor", text: result.text }]);
      setApiStatus("Guided demo uses limited built-in topics. Configure VITE_TUTOR_API_URL for personalised subject tutoring.");
      if (voiceRef.current) speak(result.text);
      return;
    }
    setLoading(true);
    setApiStatus("");
    try {
      const response = await fetch(`${apiUrl.replace(/\/$/, "")}/api/tutor/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, topic, tutorName: displayName, learningPreference, subjects: selectedSubjects, history: chatHistoryRef.current.slice(-12) }),
      });
      const data: { reply?: string; error?: string } = await response.json();
      if (!response.ok || !data.reply) throw new Error(data.error || "The tutor is temporarily unavailable.");
      chatHistoryRef.current = [...chatHistoryRef.current, { role: "user" as const, text: question }, { role: "model" as const, text: data.reply! }].slice(-12);
      setMessages(current => [...current, { role: "tutor", text: data.reply! }]);
      if (voiceRef.current) speak(data.reply);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to connect to the tutor.";
      setApiStatus(`Live AI unavailable: ${message}`);
      setMessages(current => [...current, { role: "tutor", text: "I couldn't reach the live AI service right now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const startLesson = () => {
    if (!subjectChoice) return;
    setTopic(subjectChoice);
    setStarted(true);
    chatHistoryRef.current = [];
    setApiStatus("");
    setMessages([{ role: "tutor", text: `Wonderful choice! Welcome to ${subjectChoice}. I'm ${displayName}, your AI tutor. I'll adapt my explanations and practice to your feedback. We'll begin with ${learningPreference.toLowerCase()}, but you can change that any time. What would you like to learn first?` }]);
  };

  const changeSubject = (nextSubject: string) => {
    if (loading || nextSubject === topic) return;
    setTopic(nextSubject);
    setSubjectChoice(nextSubject);
    chatHistoryRef.current = [];
    setMessages([{ role: "tutor", text: `Welcome to ${nextSubject}! Let's begin a fresh lesson. Tell me what you want to learn, or ask me for a quiz.` }]);
    setApiStatus("");
  };

  const toggleVoice = () => {
    if (voiceEnabled) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setVoiceEnabled(false);
    } else if (voiceSupported) {
      setVoiceEnabled(true);
      speak(`Hello! I'm ${displayName}, your AI tutor. What shall we learn today?`);
    }
  };

  const toggleMic = () => {
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const SpeechRecognition = (window as SpeechWindow).SpeechRecognition || (window as SpeechWindow).webkitSpeechRecognition;
    if (!SpeechRecognition) { setVoiceError("Speech input is not supported in this browser. You can type your question instead."); return; }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-ZA";
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) setDraft(transcript);
      };
      recognition.onerror = () => { setVoiceError("Microphone access was unavailable. Check your browser permissions."); setListening(false); };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      setVoiceError("");
      recognition.start();
      setListening(true);
    } catch { setVoiceError("Speech input couldn't start. Try typing instead."); setListening(false); }
  };

  return (
    <section className="ai-classroom-page">
      <div className="ai-classroom-heading">
        <div>
          <span className="eyebrow">THE MATRIC INSTITUTE · INTERACTIVE LEARNING</span>
          <h1>AI Classroom<span className="ai-heading-period">.</span></h1>
          <p>Choose a topic, practise with guided questions, get hints, and hear your professor speak.</p>
        </div>
        <span className="ai-coming-soon">{import.meta.env.VITE_TUTOR_API_URL ? "LIVE AI" : "GUIDED DEMO"}</span>
      </div>
      {!started ? (
        <div className="ai-welcome-panel">
          <div className="ai-welcome-professor"><GraduationCap size={30}/><div><strong>{displayName}</strong><p>{welcome}</p></div></div>
          <h2>What would you like to learn today?</h2>
          <p>Choose from your subjects. You can update your subjects in My Curriculum.</p>
          <div className="ai-subject-grid" role="group" aria-label="Choose your subject">
            {subjects.map(subject => <button type="button" key={subject} className={subjectChoice === subject ? "ai-subject-option selected" : "ai-subject-option"} aria-pressed={subjectChoice === subject} onClick={() => setSubjectChoice(subject)}><BookOpen size={16}/>{subject}</button>)}
          </div>
          <label className="ai-learning-label" htmlFor="ai-learning-preference">How would you like to start?</label>
          <select id="ai-learning-preference" className="ai-learning-select" value={learningPreference} onChange={e => setLearningPreference(e.target.value)}>
            <option>Explain simply</option><option>Show an example</option><option>Quiz me</option><option>Help me revise</option>
          </select>
          <button type="button" className="ai-start-button" disabled={!subjectChoice} onClick={startLesson}>Start learning <ArrowUpRight size={17}/></button>
          <p className="ai-welcome-note">AI-generated answers may contain mistakes. Avoid sharing personal information.</p>
        </div>
      ) : <div className="ai-classroom-layout">
        <div className="ai-main-panel">
          <div className="ai-tutor-header">
            <div className="ai-professor-avatar" aria-hidden="true"><GraduationCap size={27}/><Sparkles size={14}/></div>
            <div className="ai-professor-title">
              <strong>{displayName}</strong>
              <small>PERSONALISED AI TUTOR · {import.meta.env.VITE_TUTOR_API_URL ? "LIVE AI" : "DEMO MODE"}</small>
            </div>
            <div className="ai-voice-controls">
              <button type="button" onClick={toggleVoice} disabled={!voiceSupported} title={voiceEnabled ? "Turn spoken answers off" : "Turn spoken answers on"} aria-label={voiceEnabled ? "Turn spoken answers off" : "Turn spoken answers on"}>
                {voiceEnabled ? <Volume2 size={19}/> : <VolumeX size={19}/>}
                <span>{voiceEnabled ? "Voice on" : "Voice off"}</span>
              </button>
              {speaking && <button type="button" onClick={() => { window.speechSynthesis.cancel(); setSpeaking(false); }} aria-label="Stop speaking"><Square size={15}/> Stop</button>}
            </div>
          </div>
          <div className="ai-demo-notice"><WandSparkles size={16}/><span>{import.meta.env.VITE_TUTOR_API_URL ? "Live Gemini tutor: AI-generated explanations may contain mistakes. Do not share personal information." : "Guided demo: quizzes and explanations run locally until the AI backend is configured."}</span></div>
          <div className="ai-topic-picker" aria-label="Choose a learning subject">
            <span>CURRENT SUBJECT: {topic}</span>
            <div><label htmlFor="ai-switch-subject">Switch subject: </label><select id="ai-switch-subject" className="ai-learning-select" value={topic} disabled={loading} onChange={e => changeSubject(e.target.value)}>{subjects.map(item => <option key={item} value={item}>{item}</option>)}</select></div>
            <div><label htmlFor="ai-change-preference">Learning approach: </label><select id="ai-change-preference" className="ai-learning-select" value={learningPreference} onChange={e => setLearningPreference(e.target.value)}><option>Explain simply</option><option>Show an example</option><option>Quiz me</option><option>Help me revise</option></select></div>
          </div>
          <div className="ai-chat-history" ref={scrollRef} role="log" aria-label="Classroom conversation" aria-live="polite">
            {messages.map((message, i) => (
              <div className={`ai-chat-message ai-chat-${message.role}`} key={i}>
                <div className="ai-chat-speaker">{message.role === "tutor" ? displayName.toUpperCase() : "YOU"}</div>
                <p>{message.text}</p>
                {message.role === "tutor" && voiceSupported && <button type="button" onClick={() => speak(message.text)} aria-label="Read this answer aloud"><Volume2 size={14}/> Listen</button>}
              </div>
            ))}
          </div>
          <div className="ai-suggestion-section">
            <span>TRY ASKING</span>
            <div className="ai-suggestion-list">
              {suggestions.map(item => <button key={item} type="button" onClick={() => send(item)}><Lightbulb size={14}/>{item}</button>)}
            </div>
          </div>
          <form className="ai-chat-form" onSubmit={e => { e.preventDefault(); send(); }}>
            <div className="ai-message-composer">
              <input value={draft} onChange={e => setDraft(e.target.value)} aria-label="Ask your study guide" placeholder={listening ? "Listening..." : "Ask your study guide a question..."} />
              <button type="button" className={listening ? "ai-mic-active" : "ai-mic-button"} onClick={toggleMic} disabled={!recognitionSupported} title={recognitionSupported ? "Dictate a question" : "Speech input unavailable"} aria-label={listening ? "Stop listening" : "Dictate a question"}>{listening ? <MicOff size={19}/> : <Mic size={19}/>}</button>
              <button type="submit" aria-label="Send message" disabled={!draft.trim() || loading}><Send size={19}/></button>
            </div>
          </form>
          {loading && <p className="ai-disclaimer" role="status">{displayName} is thinking...</p>}
          {apiStatus && <p className="ai-voice-error" role="status">{apiStatus}</p>}
          {voiceError && <p className="ai-voice-error" role="status">{voiceError}</p>}
          <p className="ai-disclaimer">Voice and microphone availability depend on your browser. The tutor uses an AI-generated response and browser speech.</p>
        </div>
        <aside className="ai-side-panel">
          <span className="eyebrow">YOUR LEARNING SPACE</span>
          <h3>Practise. Reflect. Improve.</h3>
          <p>Start a guided quiz, ask for hints, and receive explanations when you need help. Your quiz progress stays in this classroom session.</p>
          <div className="ai-side-rule"/>
          <strong>MY CURRICULUM</strong>
          <span>{selectedSubjects.length} selected {selectedSubjects.length === 1 ? "subject" : "subjects"}</span>
          <button type="button" onClick={onOpenCurriculum}>View my curriculum <ArrowUpRight size={15}/></button>
          <div className="ai-professor-footnote"><BookOpen size={17}/><span>Your AI tutor adapts to your questions and preferences. Always check important answers against trusted study materials.</span></div>
        </aside>
      </div>}
    </section>
  );
}
