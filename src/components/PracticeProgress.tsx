import { useEffect, useState } from "react";
import { getAttempts, saveAttempt, type Session, type StudyAttempt } from "../lib/supabase";
import "./LearnerAccount.css";
import "./StudyGuides.css";

const questions = [
  {subject:"Mathematics",q:"Solve 2x + 6 = 14. What is x?",options:["2","4","6","8"],answer:1,explain:"Subtract 6 from both sides, then divide 8 by 2."},
  {subject:"Mathematics",q:"What is the gradient of y = 3x + 2?",options:["2","3","5","1"],answer:1,explain:"In y = mx + c, the gradient is m."},
  {subject:"Life Sciences",q:"Which organelle is the main site of photosynthesis?",options:["Nucleus","Mitochondrion","Chloroplast","Ribosome"],answer:2,explain:"Chloroplasts contain chlorophyll and support photosynthesis."},
  {subject:"Physical Sciences",q:"What is the SI unit of force?",options:["Joule","Newton","Watt","Pascal"],answer:1,explain:"Force is measured in newtons (N)."},
  {subject:"Geography",q:"Which instrument measures atmospheric pressure?",options:["Barometer","Thermometer","Anemometer","Rain gauge"],answer:0,explain:"A barometer measures air pressure."},
  {subject:"Economics",q:"Inflation is a sustained increase in what?",options:["General price level","Unemployment only","Exports only","Population"],answer:0,explain:"Inflation means a sustained rise in the general price level."},
];
const percent = (a: StudyAttempt) => a.total > 0 ? Math.round(a.score / a.total * 100) : 0;
export default function PracticeProgress({session,mode}:{session:Session;mode:"practice"|"progress"}) {
  const [subject,setSubject]=useState("Mathematics");
  const [index,setIndex]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [attempts,setAttempts]=useState<StudyAttempt[]>([]);
  const [error,setError]=useState("");
  const [saved,setSaved]=useState(false);
  useEffect(()=>{getAttempts(session).then(setAttempts).catch(e=>setError(e.message));},[session]);
  const list=questions.filter(q=>q.subject===subject);
  const question=list[index%list.length];
  async function answer(n:number) {
    if(selected!==null)return;
    setSelected(n);setSaved(false);
    try {await saveAttempt(session,{subject,score:n===question.answer?1:0,total:1});setSaved(true);setAttempts(await getAttempts(session));}
    catch(e){setError(e instanceof Error?e.message:"Could not save attempt");}
  }
  const subjects=[...new Set(attempts.map(a=>a.subject))];
  return <section className="study-guides">
    <h1>{mode==="practice"?"Practice & quizzes":"My learning progress"}</h1>
    <p>{mode==="practice"?"Practise questions and review explanations. Your answers are saved to My Progress.":"Track your practice results over time, subject by subject. Each point represents one saved question attempt."}</p>
    {error&&<p role="alert" className="account-error">{error}</p>}
    {mode==="progress" ? <div className="study-guides-grid">{subjects.map(s=>{
      const rows=attempts.filter(a=>a.subject===s).slice().reverse();
      const total=rows.reduce((n,a)=>n+a.total,0);
      const correct=rows.reduce((n,a)=>n+a.score,0);
      const recent=rows.slice(-5);
      const earlier=rows.slice(-10,-5);
      const recentAvg=recent.length?Math.round(recent.reduce((n,a)=>n+percent(a),0)/recent.length):0;
      const earlierAvg=earlier.length?Math.round(earlier.reduce((n,a)=>n+percent(a),0)/earlier.length):null;
      return <article key={s} className="study-guides-card">
        <span>SUBJECT PROGRESS</span><h2>{s}</h2>
        <p>{rows.length} saved question attempts · {correct} / {total} correct overall</p>
        <strong>Recent 5 attempts: {recentAvg}%</strong>
        <p>{earlierAvg===null?"Complete more practice to compare your results.":recentAvg>earlierAvg?`Improving: up ${recentAvg-earlierAvg} percentage points from the previous 5 attempts.`:recentAvg<earlierAvg?`Down ${earlierAvg-recentAvg} percentage points from the previous 5 attempts. Keep practising!`:"Steady compared with the previous 5 attempts."}</p>
        <div style={{display:"flex",gap:4,alignItems:"end",height:90}} aria-label={`Results over time for ${s}`} role="img">
          {rows.slice(-20).map((a,i)=><div key={i} title={`Attempt ${rows.length-Math.min(rows.length,20)+i+1}: ${percent(a)}%`} style={{flex:1,minWidth:5,height:`${Math.max(4,percent(a)*0.8)}px`,background:"#865767",borderRadius:"4px 4px 0 0"}} />)}
        </div><small>Oldest → newest (last 20 attempts). Each bar shows the percentage correct.</small>
      </article>;
    })}{attempts.length===0&&<p>No practice results yet. Visit Practice Exams to begin.</p>}</div> :
    <div className="study-guides-card" style={{maxWidth:650}}>
      <label htmlFor="quiz-subject">Subject</label><select id="quiz-subject" value={subject} onChange={e=>{setSubject(e.target.value);setIndex(0);setSelected(null);}}>{[...new Set(questions.map(q=>q.subject))].map(s=><option key={s}>{s}</option>)}</select>
      <h2>{question.q}</h2>
      {question.options.map((option,n)=><button key={option} className="account-primary" style={{background:selected===n?"#98778a":"#633a4b",textAlign:"left"}} disabled={selected!==null} onClick={()=>answer(n)}>{option}</button>)}
      {selected!==null&&<><p>{selected===question.answer?"Correct!":"Not quite."} {question.explain}</p><p>{saved?"Result saved to your profile.":error?"Unable to save this result.":"Saving result…"}</p><button className="account-primary" onClick={()=>{setIndex(i=>i+1);setSelected(null);}}>Next question</button></>}
    </div>}
  </section>;
}
