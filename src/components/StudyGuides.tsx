import { useMemo, useState } from "react";
import { ArrowDownToLine, BookOpen, Eye, FileText, Search, X } from "lucide-react";
import { studyGuideCatalog, type StudyGuide } from "./studyGuideCatalog";
import "./PastPapers.css";
import "./StudyGuides.css";

export default function StudyGuides() {
  const [subject, setSubject] = useState("All Subjects");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<StudyGuide | null>(null);
  const subjects = useMemo(() => [...new Set(studyGuideCatalog.map(guide => guide.subject))].sort(), []);
  const guides = studyGuideCatalog.filter(guide =>
    (subject === "All Subjects" || guide.subject === subject) &&
    `${guide.title} ${guide.subject} ${guide.description} ${guide.topics.join(" ")}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <section className="exam-library study-guide-library">
      <header className="exam-library-heading">
        <span className="exam-library-eyebrow">THE MATRIC INSTITUTE · ACADEMIC RESOURCES</span>
        <h1>Study Guides</h1>
        <p>Find your Grade 12 revision resources. Preview a guide online or download the PDF for offline studying.</p>
      </header>
      <div className="exam-library-filters">
        <label><span><BookOpen size={16}/> Subject</span>
          <select value={subject} onChange={e => setSubject(e.target.value)}><option>All Subjects</option>{subjects.map(item => <option key={item}>{item}</option>)}</select>
        </label>
        <label><span><Search size={16}/> Search guides</span>
          <input className="study-guide-search-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by subject or topic" />
        </label>
      </div>
      <div className="exam-library-results-heading"><strong>{guides.length} study guide{guides.length === 1 ? "" : "s"}</strong><span>Read online or download</span></div>
      {guides.length ? <div className="exam-library-grid">
        {guides.map(guide => <article className="exam-paper-card" key={guide.id}>
          <div className="exam-paper-sheet study-guide-sheet">
            <div className="study-guide-sheet-top"><BookOpen size={26}/><span>STUDY RESOURCE</span></div>
            <div className="study-guide-sheet-heading">GRADE {guide.grade}<br/>STUDY GUIDE</div>
            <div className="exam-paper-grey-panel"><strong>{guide.subject.toUpperCase()}</strong><span>{guide.title}</span></div>
            <div className="exam-paper-sheet-footer"><span>{guide.publisher}</span></div>
          </div>
          <div className="exam-paper-card-body">
            <div className="exam-paper-tags"><span>Study Guide</span></div>
            <h2>{guide.subject}</h2>
            <p className="exam-paper-session">Grade {guide.grade} · {guide.title}</p>
            <p className="exam-paper-filename"><FileText size={14}/>{decodeURIComponent(guide.url.split("/").pop() || "Study guide.pdf")}</p>
            <div className="exam-paper-actions">
              <button type="button" onClick={() => setPreview(guide)}><Eye size={17}/> Preview</button>
              <a href={guide.url} download><ArrowDownToLine size={17}/> Download</a>
            </div>
          </div>
        </article>)}
      </div> : <div className="exam-library-empty"><BookOpen size={28}/><h2>No matching study guides</h2><p>Try a different subject or search term.</p></div>}
      <p className="exam-library-attribution">Study guides retain their original publisher attribution and copyright conditions. The Matric Institute does not claim authorship or endorsement by the publishers.</p>
      {preview && <div className="exam-library-overlay" onMouseDown={e => { if (e.target === e.currentTarget) setPreview(null); }}>
        <section className="exam-library-modal" role="dialog" aria-modal="true" aria-label={`Preview ${preview.title}`}>
          <div className="exam-library-modal-header"><div><h2>{preview.subject}</h2><p>{preview.title} · Grade {preview.grade}</p></div>
            <div className="exam-library-modal-actions"><a href={preview.url} download><ArrowDownToLine size={17}/> Download</a><button type="button" onClick={() => setPreview(null)} aria-label="Close preview"><X size={21}/></button></div>
          </div>
          <iframe title={`PDF preview of ${preview.title}`} src={preview.url}/>
        </section>
      </div>}
    </section>
  );
}
