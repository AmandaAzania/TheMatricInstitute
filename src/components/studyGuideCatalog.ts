/**
 * Administrator-curated public study guide catalogue.
 * Add a PDF under public/study-guides/ and add its metadata here ONLY after
 * verifying permission to distribute it. Do not add copyrighted guides without permission.
 * This catalogue provides learner preview/download links. AI retrieval is a later phase.
 */
export type StudyGuide = {
  id: string;
  title: string;
  subject: string;
  grade: number;
  description: string;
  publisher: string;
  topics: string[];
  url: string;
};

export const studyGuideCatalog: StudyGuide[] = [];
