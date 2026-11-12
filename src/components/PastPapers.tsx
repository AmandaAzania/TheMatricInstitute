import { useEffect, useMemo, useState } from "react";
import { ArrowDownToLine, BookOpen, CalendarDays, Eye, FileText, X } from "lucide-react";
import "./PastPapers.css";
import { paperCatalog, type PaperResource } from "./paperCatalog";

interface PastPapersProps {
  subjectOptions: string[];
  initialSubject?: string;
  onBack: () => void;
}

type StoredUpload = Omit<PaperResource, "url" | "origin"> & { file: Blob };
const suppliedDocuments: PaperResource[] = paperCatalog.map((paper) => ({
  ...paper,
  url: `/past-papers/${encodeURIComponent(paper.fileName)}`,
}));

function readLocalPapers(): Promise<StoredUpload[]> {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) { resolve([]); return; }
    const request = indexedDB.open("matric-institute-resource-library", 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains("uploaded-papers")) {
        request.result.createObjectStore("uploaded-papers", { keyPath: "id" });
      }
    };
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("uploaded-papers", "readonly");
      const getRequest = transaction.objectStore("uploaded-papers").getAll();
      getRequest.onsuccess = () => resolve(getRequest.result as StoredUpload[]);
      getRequest.onerror = () => reject(getRequest.error);
      transaction.oncomplete = () => db.close();
    };
  });
}

const subjectAliases: Record<string, string> = {
  "English FAL": "English First Additional Language",
  "isiXhosa FAL": "IsiXhosa First Additional Language",
  "isiZulu FAL": "IsiZulu First Additional Language",
  "isiNdebele FAL": "IsiNdebele First Additional Language",
};

export default function PastPapers({ subjectOptions, initialSubject }: PastPapersProps) {
  const [subject, setSubject] = useState(initialSubject || "All Subjects");
  const [year, setYear] = useState("All Years");
  const [localPapers, setLocalPapers] = useState<PaperResource[]>([]);
  const [preview, setPreview] = useState<PaperResource | null>(null);
  const [storageWarning, setStorageWarning] = useState("");

  useEffect(() => {
    if (initialSubject) setSubject(subjectAliases[initialSubject] || initialSubject);
  }, [initialSubject]);

  useEffect(() => {
    let active = true;
    const urls: string[] = [];
    readLocalPapers().then((papers) => {
      if (!active) return;
      setLocalPapers(papers.map((paper) => {
        const url = URL.createObjectURL(paper.file);
        urls.push(url);
        return { ...paper, url, origin: "local" as const };
      }));
    }).catch(() => {
      if (active) setStorageWarning("Previously saved local PDFs could not be loaded.");
    });
    return () => { active = false; urls.forEach((url) => URL.revokeObjectURL(url)); };
  }, []);

  const allPapers = useMemo(() => [...suppliedDocuments, ...localPapers], [localPapers]);
  const subjects = useMemo(() => Array.from(new Set([
    ...subjectOptions.map((item) => subjectAliases[item] || item),
    ...allPapers.map((paper) => paper.subject),
  ])).sort((a, b) => a.localeCompare(b)), [subjectOptions, allPapers]);
  const years = useMemo(() => Array.from(new Set(allPapers.map((paper) => paper.year))).sort((a, b) => Number(b) - Number(a)), [allPapers]);
  const filteredPapers = useMemo(() => allPapers.filter((paper) =>
    (subject === "All Subjects" || paper.subject === subject) &&
    (year === "All Years" || paper.year === year)
  ).sort((a, b) => Number(b.year) - Number(a.year) || a.subject.localeCompare(b.subject) || a.paper.localeCompare(b.paper) || a.kind.localeCompare(b.kind)), [allPapers, subject, year]);

  return (
    <section className="exam-library">
      <header className="exam-library-heading">
        <span className="exam-library-eyebrow">THE MATRIC INSTITUTE · ACADEMIC RESOURCES</span>
        <h1>Past Examination Papers</h1>
        <p>Department of Basic Education examination materials, organised to make studying easier. Choose a subject and year, then read or download.</p>
      </header>

      <div className="exam-library-filters">
        <label><span><BookOpen size={16} /> Subject</span>
          <select value={subject} onChange={(event) => setSubject(event.target.value)}>
            <option value="All Subjects">All Subjects</option>
            {subjects.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label><span><CalendarDays size={16} /> Year</span>
          <select value={year} onChange={(event) => setYear(event.target.value)}>
            <option value="All Years">All Years</option>
            {years.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>

      {storageWarning && <p role="status" className="exam-library-warning">{storageWarning}</p>}
      <div className="exam-library-results-heading">
        <strong>{filteredPapers.length} document{filteredPapers.length === 1 ? "" : "s"}</strong>
        <span>Original documents · Organised by The Matric Institute</span>
      </div>

      {filteredPapers.length > 0 ? (
        <div className="exam-library-grid">
          {filteredPapers.map((paper) => (
            <article className="exam-paper-card" key={paper.id}>
              <div className="exam-paper-sheet">
                <div className="exam-paper-source">
                  <div className="exam-paper-source-mark">
                     <img
                       src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Coat_of_arms_of_South_Africa_(heraldic).svg"
                       alt="South African national Coat of Arms"
                       loading="lazy"
                       onError={(event) => {
                         event.currentTarget.style.display = "none";
                         event.currentTarget.parentElement?.classList.add("exam-paper-emblem-unavailable");
                       }}
                     />
                   </div>
                  <div><strong>basic education</strong><span>Department of Basic Education</span><span>REPUBLIC OF SOUTH AFRICA</span></div>
                </div>
                <div className="exam-paper-exam-heading">SENIOR CERTIFICATE EXAMINATIONS /<br />NATIONAL SENIOR CERTIFICATE EXAMINATIONS</div>
                <div className="exam-paper-grey-panel">
                  <strong>{paper.subject.toUpperCase()}{paper.language ? ` · ${paper.language.toUpperCase()}` : ""}</strong>
                  <span>{paper.paper.toUpperCase()} · {paper.session.toUpperCase()} {paper.year}{paper.province ? ` · ${paper.province.toUpperCase()}` : ""}</span>
                  {paper.kind !== "Question Paper" && <span>{paper.kind.toUpperCase()}</span>}
                </div>
                <div className="exam-paper-sheet-footer">
                  <span>{paper.marks ? `MARKS: ${paper.marks}` : "NSC EXAMINATION RESOURCE"}</span>
                  {paper.duration && <span>TIME: {paper.duration}</span>}
                </div>
              </div>
              <div className="exam-paper-card-body">
                <div className="exam-paper-tags"><span>{paper.kind}</span></div>
                <h2>{paper.subject}</h2>
                <p className="exam-paper-session">{paper.paper} · {paper.session} {paper.year}{paper.province ? ` · ${paper.province}` : ""}</p>
                <p className="exam-paper-filename" title={paper.fileName}><FileText size={14} /> {paper.fileName}</p>
                <div className="exam-paper-actions">
                  <button type="button" onClick={() => setPreview(paper)}><Eye size={17} /> Preview</button>
                  <a href={paper.url || "#"} download={paper.fileName}><ArrowDownToLine size={17} /> Download</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="exam-library-empty"><FileText size={28} /><h2>No papers available yet</h2><p>Try a different subject or year.</p></div>
      )}

      <p className="exam-library-attribution">The Matric Institute organises access to examination resources. It is not the Department of Basic Education and does not claim authorship or endorsement of these papers. Original document copyright and usage restrictions remain with their respective rights holders.</p>

      {preview && (
        <div className="exam-library-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreview(null); }}>
          <section className="exam-library-modal" role="dialog" aria-modal="true" aria-label={`Preview ${preview.fileName}`}>
            <div className="exam-library-modal-header">
              <div><h2>{preview.subject} · {preview.paper}</h2><p>{preview.kind} · {preview.session} {preview.year}</p></div>
              <div className="exam-library-modal-actions"><a href={preview.url} download={preview.fileName}><ArrowDownToLine size={17} /> Download</a><button type="button" onClick={() => setPreview(null)} aria-label="Close preview"><X size={21} /></button></div>
            </div>
            <iframe title={`PDF preview of ${preview.fileName}`} src={preview.url || ""} />
          </section>
        </div>
      )}
    </section>
  );
}
