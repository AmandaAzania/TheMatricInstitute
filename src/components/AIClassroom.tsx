import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, GraduationCap, Lightbulb, Mic, MicOff, Send, Sparkles, Square, Volume2, VolumeX, WandSparkles } from "lucide-react";
import "./AIClassroom.css";

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

const welcome = "Welcome to your classroom! I'm Professor Dumbledore, your fictional study guide. Choose a topic or ask me a question. I can offer short revision tips, and I can read my answers aloud.";
const suggestions = [
  "Help me make a study plan",
  "How do I prepare for exams?",
  "Explain algebra basics",
  "How do I write a good essay?",
];

function respond(question: string, subjects: string[]): string {
  const q = question.toLowerCase();
  if (/\b(hello|hi|hey|good morning)\b/.test(q)) return "Welcome, learner! What would you like to work on today? Try algebra, exam preparation, essay writing, or a study plan.";
  if (/algebra|equation|variable|mathematics|maths/.test(q)) return "Algebra starts with finding an unknown value. For example, if x + 3 = 8, subtract 3 from both sides to find x = 5. Try this: x + 6 = 14. What is x?";
  if (/essay|english|literature|paragraph/.test(q)) return "A strong essay begins with a clear argument. Use an introduction, body paragraphs with evidence and explanation, and a conclusion. For each body paragraph, try Point, Evidence, Explain, Link.";
  if (/science|physics|chemistry/.test(q)) return "In science, start by identifying what you know, what you need to find, and the units involved. Draw a simple diagram where helpful, then select the appropriate formula or principle.";
  if (/study plan|timetable|schedule|routine/.test(q)) {
    const chosen = subjects.length ? subjects.slice(0, 3).join(", ") : "your most challenging subjects";
    return `Here's a starter plan: choose a 25-minute focus session for ${chosen}, take a short break, then spend 15 minutes recalling what you learned without notes. Rotate subjects across the week.`;
  }
  if (/exam|test|past paper|revision|memorandum/.test(q)) return "For exam preparation, start with a past paper, try questions without looking at the memo, then mark your work and record the topics you need to revisit. Repeat those topics before trying another paper.";
  if (/motivat|nervous|stress|worried|confidence/.test(q)) return "Progress comes from consistent, manageable steps. Choose one topic, practise a few questions, and review what you understand. You do not need to master everything in one session.";
  if (/^8$|x\s*=\s*8|answer is 8/.test(q)) return "Correct! For x + 6 = 14, subtract 6 from both sides, so x = 8. Well done.";
  return "That's a thoughtful question. I'm currently a guided classroom demo, so I can't reliably answer every subject question yet. Try asking about algebra, essay writing, study plans, or exam preparation. Full AI tutoring is coming later.";
}

export default function AIClassroom({ selectedSubjects, onOpenCurriculum }: Props) {
  const [messages, setMessages] = useState<Message[]>([{ role: "tutor", text: welcome }]);
  const [draft, setDraft] = useState("");
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

  const send = (value = draft) => {
    const question = value.trim();
    if (!question) return;
    const answer = respond(question, selectedSubjects);
    setMessages(current => [...current, { role: "student", text: question }, { role: "tutor", text: answer }]);
    setDraft("");
    if (voiceRef.current) speak(answer);
  };

  const toggleVoice = () => {
    if (voiceEnabled) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setVoiceEnabled(false);
    } else if (voiceSupported) {
      setVoiceEnabled(true);
      speak("Hello! I'm Professor Dumbledore, your study guide. What shall we learn today?");
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
          <p>Meet your storybook-inspired study guide. Ask a question, hear a response and practise at your own pace.</p>
        </div>
        <span className="ai-coming-soon">GUIDED DEMO</span>
      </div>
      <div className="ai-classroom-layout">
        <div className="ai-main-panel">
          <div className="ai-tutor-header">
            <div className="ai-professor-avatar" aria-hidden="true"><GraduationCap size={27}/><Sparkles size={14}/></div>
            <div className="ai-professor-title">
              <strong>Professor Dumbledore</strong>
              <small>FICTIONAL STUDY GUIDE · DEMO MODE</small>
            </div>
            <div className="ai-voice-controls">
              <button type="button" onClick={toggleVoice} disabled={!voiceSupported} title={voiceEnabled ? "Turn spoken answers off" : "Turn spoken answers on"} aria-label={voiceEnabled ? "Turn spoken answers off" : "Turn spoken answers on"}>
                {voiceEnabled ? <Volume2 size={19}/> : <VolumeX size={19}/>}
                <span>{voiceEnabled ? "Voice on" : "Voice off"}</span>
              </button>
              {speaking && <button type="button" onClick={() => { window.speechSynthesis.cancel(); setSpeaking(false); }} aria-label="Stop speaking"><Square size={15}/> Stop</button>}
            </div>
          </div>
          <div className="ai-demo-notice"><WandSparkles size={16}/><span>Interactive preview: responses are prewritten learning tips, not generated by a live AI model. Voice uses your browser's synthetic speech.</span></div>
          <div className="ai-chat-history" ref={scrollRef} role="log" aria-label="Classroom conversation" aria-live="polite">
            {messages.map((message, i) => (
              <div className={`ai-chat-message ai-chat-${message.role}`} key={i}>
                <div className="ai-chat-speaker">{message.role === "tutor" ? "PROFESSOR DUMBLEDORE" : "YOU"}</div>
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
              <button type="submit" aria-label="Send message" disabled={!draft.trim()}><Send size={19}/></button>
            </div>
          </form>
          {voiceError && <p className="ai-voice-error" role="status">{voiceError}</p>}
          <p className="ai-disclaimer">Voice and microphone availability depend on your browser. No human professor is speaking.</p>
        </div>
        <aside className="ai-side-panel">
          <span className="eyebrow">YOUR LEARNING SPACE</span>
          <h3>A little curiosity goes a long way.</h3>
          <p>Choose a subject, explore a topic, and practise with short guided responses.</p>
          <div className="ai-side-rule"/>
          <strong>MY CURRICULUM</strong>
          <span>{selectedSubjects.length} selected {selectedSubjects.length === 1 ? "subject" : "subjects"}</span>
          <button type="button" onClick={onOpenCurriculum}>View my curriculum <ArrowUpRight size={15}/></button>
          <div className="ai-professor-footnote"><BookOpen size={17}/><span>Inspired by a fictional wizarding-school professor. Not an official Harry Potter product.</span></div>
        </aside>
      </div>
    </section>
  );
}
