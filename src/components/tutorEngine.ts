export type TutorTopic = "Mathematics" | "English" | "Science" | "Exam Skills";
export type TutorSession = { topic: TutorTopic; questionIndex: number; awaitingAnswer: boolean; score: number; attempts: number };
export const initialSession = (): TutorSession => ({ topic: "Mathematics", questionIndex: 0, awaitingAnswer: false, score: 0, attempts: 0 });

type Exercise = { prompt: string; answer: string[]; hint: string; explanation: string };
const exercises: Record<TutorTopic, Exercise[]> = {
  Mathematics: [
    { prompt: "Solve for x: x + 6 = 14.", answer: ["8", "x=8", "x = 8"], hint: "Subtract 6 from both sides.", explanation: "x + 6 = 14. Subtract 6 from each side: x = 14 − 6 = 8." },
    { prompt: "Solve for x: 3x = 21.", answer: ["7", "x=7", "x = 7"], hint: "Divide both sides by 3.", explanation: "3x = 21, so x = 21 ÷ 3 = 7." },
    { prompt: "What is 15% of 200?", answer: ["30", "30.0"], hint: "Convert 15% to 0.15 and multiply by 200.", explanation: "15% = 0.15; 0.15 × 200 = 30." },
  ],
  English: [
    { prompt: "Which sentence is correct? A) She don't like reading. B) She doesn't like reading.", answer: ["b", "b)", "she doesn't like reading", "she doesn't like reading."], hint: "For she/he/it, use 'doesn't'.", explanation: "B is correct: 'She doesn't like reading.' The subject 'she' takes 'doesn't'." },
    { prompt: "Identify the figure of speech: 'The wind whispered through the trees.'", answer: ["personification"], hint: "An inanimate thing is given a human action.", explanation: "Personification: the wind is described as whispering, a human action." },
    { prompt: "What is the main purpose of a conclusion in an argumentative essay? A) Introduce unrelated facts B) Reinforce the argument", answer: ["b", "b)", "reinforce the argument"], hint: "Think about bringing the argument together.", explanation: "B: reinforce the argument by summarising key points and restating the position without introducing new claims." },
  ],
  Science: [
    { prompt: "What is the SI unit of force?", answer: ["newton", "newtons", "n"], hint: "It is named after a physicist who described laws of motion.", explanation: "The SI unit of force is the newton (N)." },
    { prompt: "A 2 kg object accelerates at 3 m/s². What is the net force in newtons?", answer: ["6", "6 n", "6n", "6 newtons"], hint: "Use F = ma.", explanation: "F = ma = 2 kg × 3 m/s² = 6 N." },
    { prompt: "Is a pH of 3 acidic, neutral, or basic?", answer: ["acidic", "acid"], hint: "Values below 7 are acidic.", explanation: "A pH of 3 is acidic because it is below 7." },
  ],
  "Exam Skills": [
    { prompt: "When reviewing a past paper, what should you do first? A) Read the memo B) Attempt the questions", answer: ["b", "b)", "attempt the questions"], hint: "Try independently before checking answers.", explanation: "B: attempt the questions first. Then use the memorandum to check your work and identify gaps." },
    { prompt: "True or false: It is useful to practise with a timer before an examination.", answer: ["true", "t"], hint: "Think about managing time under exam conditions.", explanation: "True. Timed practice helps you pace yourself and allocate time to questions." },
    { prompt: "Which helps retention more? A) Rereading only B) Testing yourself without notes", answer: ["b", "b)", "testing yourself without notes"], hint: "Retrieving information from memory is active practice.", explanation: "B: self-testing encourages active recall, which generally strengthens retention." },
  ],
};
const clean = (s: string) => s.toLowerCase().trim().replace(/[.!?]+$/g, "").replace(/\s+/g, " ");
export const currentExercise = (session: TutorSession): Exercise => exercises[session.topic][session.questionIndex % exercises[session.topic].length];
export function replyToLearner(input: string, session: TutorSession, subjects: string[]): { text: string; session: TutorSession } {
  const q = clean(input);
  const next = { ...session };
  if (/^(help|commands|what can you do)$/.test(q)) return { text: "I can explain algebra, essay writing and science concepts; run short quizzes; give hints; and help plan revision. Try 'quiz', 'hint', 'next question', 'study plan', or choose a topic above.", session: next };
  if (/^(hint|give me a hint|help me with this)$/.test(q) && next.awaitingAnswer) return { text: `A hint: ${currentExercise(next).hint} Have another try.`, session: next };
  if (/^(skip|next|next question|show answer|reveal answer)$/.test(q) && next.awaitingAnswer) {
    const exercise = currentExercise(next);
    next.questionIndex += 1; next.awaitingAnswer = true; next.attempts = 0;
    return { text: `${exercise.explanation}\n\nNext question: ${currentExercise(next).prompt}`, session: next };
  }
  if (/^(quiz|test me|practice|practise|ask me a question|start quiz)$/.test(q)) {
    next.awaitingAnswer = true; next.attempts = 0;
    return { text: `Let's practise ${next.topic}. Question ${next.questionIndex + 1}: ${currentExercise(next).prompt}\n\nReply with your answer, or say 'hint'.`, session: next };
  }
  const topicMatch: Array<[RegExp, TutorTopic]> = [
    [/^(mathematics|maths|math|algebra)$/, "Mathematics"],
    [/^(english|essay writing|literature)$/, "English"],
    [/^(science|physical sciences|physics|chemistry)$/, "Science"],
    [/^(exam skills|exam preparation|revision)$/, "Exam Skills"],
  ];
  for (const [pattern, topic] of topicMatch) if (pattern.test(q)) {
    next.topic = topic; next.questionIndex = 0; next.awaitingAnswer = false; next.attempts = 0;
    return { text: `Excellent. Our topic is now ${topic}. Say 'quiz' for a guided practice question, or ask me to explain a concept.`, session: next };
  }
  if (next.awaitingAnswer) {
    const exercise = currentExercise(next);
    if (exercise.answer.some(a => clean(a) === q)) {
      next.score += 1; next.questionIndex += 1; next.attempts = 0;
      return { text: `Correct! ✨ ${exercise.explanation}\n\nYour score is ${next.score}. Next question: ${currentExercise(next).prompt}`, session: next };
    }
    next.attempts += 1;
    if (next.attempts >= 2) {
      next.questionIndex += 1; next.attempts = 0;
      return { text: `Good effort. ${exercise.explanation}\n\nLet's try another: ${currentExercise(next).prompt}`, session: next };
    }
    return { text: `Not quite. ${exercise.hint} Try again, or type 'skip' to see the worked answer.`, session: next };
  }
  if (/study plan|timetable|schedule|routine/.test(q)) {
    const focus = subjects.length ? subjects.slice(0, 3).join(", ") : "your chosen subjects";
    return { text: `Let's build a realistic revision routine for ${focus}. Try 25 minutes on one topic, a short break, then 15 minutes of questions without notes. Finish by checking your answers against a memo. What subject feels most challenging?`, session: next };
  }
  if (/algebra|linear equation|solve for x/.test(q)) return { text: "An equation is a balance: whatever you do to one side, do to the other. Example: 2x + 4 = 12. Subtract 4: 2x = 8. Divide by 2: x = 4. Say 'Mathematics' and then 'quiz' to practise.", session: next };
  if (/essay|paragraph|literature|english/.test(q)) return { text: "For a strong paragraph, use PEEL: Point, Evidence, Explain, Link. State your idea, support it with an example or quotation, explain its relevance, and link it to your argument. Say 'English' and then 'quiz' for practice.", session: next };
  if (/force|newton|motion|science|physics/.test(q)) return { text: "Newton's second law says F = ma: net force equals mass multiplied by acceleration. Force is measured in newtons (N). Say 'Science' and then 'quiz' to check your understanding.", session: next };
  if (/exam|past paper|memorandum|revision/.test(q)) return { text: "A good revision loop: attempt a past paper, mark it with the memorandum, write down recurring mistakes, revisit those topics, then retry similar questions. Say 'Exam Skills' and then 'quiz' to practise.", session: next };
  if (/^(hello|hi|hey|good morning|good afternoon)$/.test(q)) return { text: `Welcome back, learner! We're studying ${next.topic}. Would you like an explanation, a short quiz, or a study plan?`, session: next };
  return { text: `I understand you're asking about “${input.trim().slice(0, 80)}”. My teaching knowledge is still limited to guided Mathematics, English, Science and Exam Skills examples. I don't want to invent an answer. Choose a topic above, or type 'help' to see what I can do.`, session: next };
}
