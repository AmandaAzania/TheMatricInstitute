
# The Matric Institute

**An affordable digital learning platform for South African matric rewrite candidates.**

> Knowledge. Discipline. Excellence.

**Project status:** Early-stage development — frontend prototype.

---

## About the Project

The Matric Institute is an educational technology initiative focused on making matric revision and examination preparation more accessible to learners in South Africa.

The platform is being developed to support learners rewriting their National Senior Certificate (NSC) examinations through an affordable, structured online learning environment.

The long-term vision is to provide subject-specific academic resources, interactive AI-assisted teaching, examination preparation tools and personalised learning support.

The proposed membership model is **R50 for 12 months of access**.

Payment processing and membership activation are not yet implemented.

## The Problem

Learners rewriting matric examinations may face barriers such as:

- Limited access to affordable revision classes.
- Difficulty finding organised past examination papers and marking guidelines.
- Limited access to individualised academic support.
- Lack of structured tools to practise and monitor examination readiness.

The Matric Institute aims to bring these learning resources together in one digital platform.

## Project Objectives

1. Provide a centralised catalogue of South African NSC subjects.
2. Organise past examination papers, marking guidelines and study resources by subject.
3. Develop an interactive AI teaching agent that provides curriculum-aligned explanations and guided lessons.
4. Create a practice examination environment with learner feedback and performance tracking.
5. Make matric revision resources more affordable and accessible.

## Current Features

The current version is a frontend prototype.

| Feature | Status |
|---|---|
| Academic dashboard | Implemented |
| Initial subject catalogue | Implemented |
| Subject search | Implemented |
| Subject category filters | Implemented |
| Individual subject dashboards | Implemented |
| Responsive navigation | Implemented |
| | Saved learner subjects | Implemented (browser storage prototype) |
| AI classroom | Planned |
| Past paper library | Planned |
| Practice examination system | Planned |
| Learner authentication | Planned |
| Database and progress tracking | Planned |
| R50 annual membership | Planned |
| Payment integration | Planned |
| Administration dashboard | Planned |

The current subject catalogue is an initial development dataset. It is not yet a verified, exhaustive register of all approved South African NSC subjects and language levels.

## Technology Stack

### Currently implemented

- **React** — frontend application.
- **TypeScript** — application development and type safety.
- **Vite** — development server and production build tooling.
- **CSS** — interface styling and responsive layouts.
- **Lucide React** — interface icons.

### Planned technologies

- **Python and FastAPI** — backend services and AI integration.
- **Supabase and PostgreSQL** — database and authentication.
- **OpenAI API or another suitable language model API** — AI teaching functionality.
- **pgvector** — curriculum document retrieval.
- **Cloudflare Pages** — frontend hosting and deployment.

Planned technologies are not yet integrated into the application.

## Design Direction

The Matric Institute follows an institutional academic design direction inspired by traditional university environments.

The visual identity includes:

- Oxford-inspired maroon.
- Midnight navy.
- Warm ivory.
- Subtle antique gold accents.
- Serif headings paired with clean sans-serif typography.

The intention is to create a professional, sophisticated and welcoming academic experience.

## Getting Started

### Requirements

- Node.js (LTS recommended).
- npm.
- Git.

### Installation

Clone the repository:

```bash
git clone https://github.com/AmandaAzania/TheMatricInstitute.git
```

Navigate into the project:

```bash
cd TheMatricInstitute
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

`http://localhost:5173/`

### Production Build

To test the production build:

```bash
npm run build
```

Vite generates the production application inside the `dist` directory.

## Project Structure

```text
TheMatricInstitute/
│
├── public/
│
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Development Roadmap

### Phase 1 — Frontend Foundation

- [x] Establish React and TypeScript application.
- [x] Develop the academic dashboard.
- [x] Create the initial subject catalogue.
- [x] Implement subject discovery and navigation.
- [ ] Implement learner subject selection and saved subjects.

### Phase 2 — Educational Resources

- [ ] Verify the official NSC subject catalogue.
- [ ] Develop a subject-based resource library.
- [ ] Organise past examination papers and marking guidelines.
- [ ] Develop topic-based learning and lesson navigation.

### Phase 3 — AI-Assisted Learning

- [ ] Develop the AI classroom interface.
- [ ] Integrate an AI teaching agent.
- [ ] Ground teaching responses in approved curriculum content.
- [ ] Introduce guided questions and explanations.

### Phase 4 — Examination Preparation

- [ ] Develop practice examinations.
- [ ] Implement automated marking for suitable question types.
- [ ] Introduce learner performance tracking.
- [ ] Develop progress reports.

### Phase 5 — Platform Infrastructure

- [ ] Implement learner registration and authentication.
- [ ] Connect the database.
- [ ] Implement annual membership management.
- [ ] Integrate payment processing.
- [ ] Develop an administration dashboard.

## Project Status and Disclaimer

This is an independent educational technology project in active development.

The current application is a demonstration prototype. It does not yet provide live AI teaching, verified learner accounts, payment processing or a complete examination resource library.

The project is not affiliated with or endorsed by the South African Department of Basic Education.

Curriculum documents, examination resources and marking guidelines will be checked for accuracy, relevance and appropriate permissions before publication.

## Repository

GitHub: https://github.com/AmandaAzania/TheMatricInstitute

**The Matric Institute — Knowledge. Discipline. Excellence.**
