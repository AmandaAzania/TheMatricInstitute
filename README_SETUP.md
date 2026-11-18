# The Matric Institute — Real Gemini AI tutor

This ZIP contains full replacement `src/components/AIClassroom.tsx`, `src/components/AIClassroom.css`, `src/components/tutorEngine.ts` and a standalone Node.js API in `server/`. It assumes the prior Curriculum/AI Classroom update is already installed (which provides `src/App.tsx` and `src/Curriculum.css`). No local npm required.

## 1. Install files from repository root

```bash
cd ~/Desktop/TheMatricInstitute
unzip -l ~/Downloads/MatricInstitute_Gemini_Integration.zip
unzip -o ~/Downloads/MatricInstitute_Gemini_Integration.zip
git add src/components/AIClassroom.tsx src/components/AIClassroom.css src/components/tutorEngine.ts server/index.js server/package.json server/Dockerfile server/.env.example server/.gitignore README_SETUP.md
git commit -m "Add portable Gemini tutor API and classroom integration"
git push origin main
```

## 2. Deploy the independent backend

Choose a Node.js-capable hosting service (not static-only hosting). Create a web service from this GitHub repository. Set its **root directory** to `server`, build command to empty or `echo ready`, and start command to `node index.js`. Alternatively deploy using `server/Dockerfile`. Set secret environment variables on the hosting service:

- `GEMINI_API_KEY` = the key you created in Google AI Studio (never paste into GitHub)
- `GEMINI_MODEL` = `gemini-2.5-flash` (verify this model is available to your key)
- `ALLOWED_ORIGIN` = the exact public website origin, e.g. `https://thematricinstitute.mandygudlwa.workers.dev` (no trailing slash)
- `PORT` = host-provided port; defaults to 3000

Your backend should respond at `https://YOUR-BACKEND.example/health`. Never publish the API key in frontend variables.

## 3. Connect the frontend

On your **frontend hosting service's build environment variables**, add:

`VITE_TUTOR_API_URL=https://YOUR-BACKEND.example`

This URL is public and contains no secret. Trigger a new frontend deployment so Vite includes it in the build. The frontend calls `https://YOUR-BACKEND.example/api/tutor/chat`. If the variable is absent, the existing local guided demo remains available.

## 4. Verify

Open AI Classroom, check the LIVE AI badge, ask a question outside the scripted demo (e.g. `Explain photosynthesis in Grade 12 terms`). Try Voice on. If unavailable, check browser console, the backend service logs, and allowed origin.

## Notes

- This is a development prototype, not yet suitable for unrestricted public launch. IP rate limiting is in-memory only, can reset on redeploy, and CORS is **not authentication**. Before a public rollout add proper user authentication, durable per-user quotas, cost caps, abuse monitoring, and appropriate child privacy safeguards.
- The free tier can have availability and quota restrictions; verify Google's current free-tier terms before sending real learner content. Avoid personal or sensitive learner data.
- AI can be inaccurate; review CAPS/NSC alignment with verified curriculum sources.
- `server/index.js` isolates the model provider; to switch to OpenAI later, replace that backend integration while keeping the React chat API contract.
- The package has not been run through a React production build in this environment.
