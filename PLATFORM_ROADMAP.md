# The Matric Institute — platform roadmap

## Current foundation (verified in supplied project)
- React/Vite app with Dashboard, Subjects, My Curriculum, Past Papers and AI Classroom.
- Gemini tutor via separate Node server; personalised tutor name and subject prompts.
- Past Papers PDFs bundled as public assets; optional local IndexedDB PDFs are browser-only.
- No server-backed learner accounts or cross-device progress persistence yet.
- Practice Exams navigation is currently a placeholder.

## Release 1 — study library navigation (included in this update)
- Add Study Guides section alongside Past Papers; subject and keyword filters.
- Administrator-curated catalogue, preview/download links, empty state until approved PDFs are added.
- No unlicensed PDFs bundled. No AI retrieval claims.

## Release 2 — secure learner accounts and onboarding
- Supabase project setup, auth and session management; sign-in/signup as landing screen.
- Password recovery and email verification; private learner profile and subject preferences.
- Database row-level security and per-user data isolation; consent/privacy design for minors.
- Avoid localStorage for sensitive personal learning data. Do not expose service role keys.
- Requires project URL and publishable/anon key in Cloudflare build environment (not secrets in git).

## Release 3 — study guides and grounded tutoring
- Verify guide redistribution licences; upload approved PDFs and metadata.
- Extract/index content server-side; store page-level citations and topic metadata.
- Retrieve relevant sections by subject/topic; show sources and original page links.
- Implement content moderation, provenance checks, and retrieval tests; don't treat model output as authoritative.

## Release 4 — assessments and progress
- Build practice exams with marking and explanations; store attempts per learner.
- Personalised study plans and measurable progress; learner feedback and accessibility testing.

## Release 5 — real-world pilot
- Mobile and low-bandwidth testing; usability testing with matric learners and repeat candidates.
- Free access for initial pilot; evaluate return use, comprehension and learner satisfaction.
- Explore school licences only after product/market and operational validation.
