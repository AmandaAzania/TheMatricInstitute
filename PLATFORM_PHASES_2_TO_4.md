# Platform phases 2–4 — deployment checklist

## Phase 2: real accounts (requires Supabase setup)
1. Create a Supabase project and run `SUPABASE_SETUP.sql` in SQL Editor. If policies already exist, review them before rerunning SQL.
2. Under Supabase Authentication > URL Configuration, set the deployed Cloudflare site URL and allowed redirect URLs. Enable email confirmation; configure email delivery for production.
3. In Cloudflare build environment, set `VITE_SUPABASE_URL` to the project URL and `VITE_SUPABASE_ANON_KEY` to the **public** anon/publishable key (NEVER service_role). Trigger a fresh build. Do not put a service-role key in frontend code.
4. Test registration, email verification, sign-in, password reset, profile saving and sign-out with two separate test accounts. Check one account cannot read another account's records.
5. Authentication uses browser sessionStorage for this pilot (sign-in may be required in a new tab). For production, add hardened auth/session management, consent and privacy notices, account deletion, and safeguarding processes for under-18 learners.

## Phase 3: Study Guides + tutor reference
- PDF files are provided in the separate `MatricInstitute_StudyGuide_PDFs.zip`. Extract into the project root before pushing. Their metadata and searchable PDF-page excerpts are in the core update.
- The server reads `server/guide-index.json` and searches the selected subject, then supplies up to three excerpts to Gemini. Citations are prompted but not independently verified; the tutor may make mistakes.
- Some DBE Mind the Gap guides carry CC BY-NC-SA or other restrictive licences. **Do not use these materials commercially or sell access without checking each guide's specific rights and attribution requirements.** A free pilot is not automatically noncommercial. Verify licences and current curriculum relevance before public distribution. Original PDFs must retain their copyright notices.
- PDF pages may not align with printed page numbers. References use PDF page indexes.

## Phase 4: initial practice & progress
- `Practice Exams` has a small starter question bank; these are examples, NOT a full CAPS-aligned exam system.
- `My Progress` stores quiz attempts per signed-in learner with Supabase RLS. Full exam papers, adaptive assessments, reporting and school licensing remain future work.

## Build/deployment
- Extract core ZIP, then the PDF ZIP, in your project root. Commit and push. Cloudflare redeploys frontend; Render redeploys server.
- In Render set `GEMINI_MODEL` to your currently working model. Keep `GEMINI_API_KEY` secret.
- Test Cloudflare build output. This package was checked with static syntax checks; if npm install/build cannot be run, the hosting build is the final verification.
