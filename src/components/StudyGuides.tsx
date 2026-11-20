import { useMemo, useState } from "react";
import { BookOpen, Download, ExternalLink, Search } from "lucide-react";
import { studyGuideCatalog } from "./studyGuideCatalog";
import "./StudyGuides.css";

export default function StudyGuides() {
  const [subject, setSubject] = useState("All Subjects");
  const [query, setQuery] = useState("");
  const subjects = useMemo(() => [...new Set(studyGuideCatalog.map(guide => guide.subject))].sort(), []);
  const guides = studyGuideCatalog.filter(guide =>
    (subject === "All Subjects" || guide.subject === subject) &&
    `${guide.title} ${guide.subject} ${guide.description} ${guide.topics.join(" ")}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <section className="study-guides">
      <span className="study-guides-eyebrow">THE MATRIC INSTITUTE · ACADEMIC RESOURCES</span>
      <h1>Study Guides</h1>
      <p>Explore approved learning materials. Read a guide online or download it to study offline.</p>
      <div className="study-guides-filters">
        <label>Subject
          <select value={subject} onChange={event => setSubject(event.target.value)}>
            <option>All Subjects</option>
            {subjects.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>Search guides
          <div className="study-guides-search"><Search size={17}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by topic or title" /></div>
        </label>
      </div>
      <div className="study-guides-count">{guides.length} study guide{guides.length === 1 ? "" : "s"} available</div>
      {guides.length === 0 ? (
        <div className="study-guides-empty"><BookOpen size={32}/><h2>Study guides are coming soon</h2><p>We're preparing a library of approved learning resources. Past examination papers are already available under Past Papers.</p></div>
      ) : (
        <div className="study-guides-grid">{guides.map(guide => (
          <article className="study-guides-card" key={guide.id}>
            <span>STUDY GUIDE · {guide.subject} · Grade {guide.grade}</span>
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <small>{guide.publisher} · {guide.topics.join(", ")}</small>
            <div className="study-guides-actions">
              <a href={guide.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={16}/> Preview PDF</a>
              <a href={guide.url} download><Download size={16}/> Download PDF</a>
            </div>
          </article>
        ))}</div>
      )}
    </section>
  );
}
