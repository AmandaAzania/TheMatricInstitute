
import { useEffect, useState } from "react";
import PastPapers from "./components/PastPapers";

import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Library,
  ClipboardCheck,
  MessageSquareText,
  Settings,
  Search,
  Bell,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  BookMarked,
  Clock3,
  Award,
  Menu,
  X,
  Bookmark,
  FileText,
  Sparkles,
  BarChart3,
  House,
} from "lucide-react";

import "./App.css";

// ==========================================
// SUBJECT DIRECTORY
// ==========================================

const subjects = [
  {
    name: "Mathematics",
    category: "Mathematics",
    code: "MATH",
    description: "Pure mathematics, algebra and problem solving.",
  },
  {
    name: "Mathematical Literacy",
    category: "Mathematics",
    code: "MATH LIT",
    description: "Practical mathematics for everyday life.",
  },
  {
    name: "English Home Language",
    category: "Languages",
    code: "ENG HL",
    description: "Language, literature and communication.",
  },
  {
    name: "English First Additional Language",
    category: "Languages",
    code: "ENG FAL",
    description: "Language development and literature.",
  },
  {
    name: "Afrikaans Home Language",
    category: "Languages",
    code: "AFR HL",
    description: "Afrikaans language and literature.",
  },
  {
    name: "Afrikaans First Additional Language",
    category: "Languages",
    code: "AFR FAL",
    description: "Language and communication.",
  },
  {
    name: "isiXhosa Home Language",
    category: "Languages",
    code: "XHO HL",
    description: "Language and literature.",
  },
  {
    name: "isiZulu Home Language",
    category: "Languages",
    code: "ZUL HL",
    description: "Language and literature.",
  },
  {
    name: "Sesotho Home Language",
    category: "Languages",
    code: "SES HL",
    description: "Language and literature.",
  },
  {
    name: "Setswana Home Language",
    category: "Languages",
    code: "TSW HL",
    description: "Language and literature.",
  },
  {
    name: "Sepedi Home Language",
    category: "Languages",
    code: "PED HL",
    description: "Language and literature.",
  },
  {
    name: "siSwati Home Language",
    category: "Languages",
    code: "SSW HL",
    description: "Language and literature.",
  },
  {
    name: "Tshivenda Home Language",
    category: "Languages",
    code: "VEN HL",
    description: "Language and literature.",
  },
  {
    name: "isiNdebele Home Language",
    category: "Languages",
    code: "NDE HL",
    description: "Language and literature.",
  },
  {
    name: "itsonga",
    category: "Languages",
    code: "TSO HL",
    description: "Language and literature.",
  },
  {
    name: "Physical Sciences",
    category: "Sciences",
    code: "PHY SCI",
    description: "Physics, chemistry and scientific investigation.",
  },
  {
    name: "Life Sciences",
    category: "Sciences",
    code: "LIFE SCI",
    description: "Biology, ecology and human physiology.",
  },
  {
    name: "Agricultural Sciences",
    category: "Sciences",
    code: "AGR SCI",
    description: "Agricultural systems and science.",
  },
  {
    name: "Accounting",
    category: "Commerce",
    code: "ACC",
    description: "Financial accounting and reporting.",
  },
  {
    name: "Business Studies",
    category: "Commerce",
    code: "BUS",
    description: "Business management and entrepreneurship.",
  },
  {
    name: "Economics",
    category: "Commerce",
    code: "ECO",
    description: "Microeconomics and macroeconomics.",
  },
  {
    name: "Geography",
    category: "Humanities",
    code: "GEO",
    description: "Physical and human geography.",
  },
  {
    name: "History",
    category: "Humanities",
    code: "HIST",
    description: "Historical events and interpretation.",
  },
  {
    name: "Computer Applications Technology",
    category: "Technology",
    code: "CAT",
    description: "Digital literacy and computer applications.",
  },
  {
    name: "Information Technology",
    category: "Technology",
    code: "IT",
    description: "Programming and computer systems.",
  },
  {
    name: "Engineering Graphics and Design",
    category: "Technology",
    code: "EGD",
    description: "Technical drawing and design.",
  },
  {
    name: "Tourism",
    category: "Other",
    code: "TOUR",
    description: "Tourism operations and destinations.",
  },
  {
    name: "Consumer Studies",
    category: "Other",
    code: "CONS",
    description: "Consumer education and management.",
  },
  {
    name: "Hospitality Studies",
    category: "Other",
    code: "HOSP",
    description: "Hospitality operations and services.",
  },
  {
    name: "Life Orientation",
    category: "Other",
    code: "LO",
    description: "Personal development and life skills.",
  },
  {
    name: "Visual Arts",
    category: "Arts",
    code: "ART",
    description: "Visual expression and artistic practice.",
  },
  {
    name: "Dramatic Arts",
    category: "Arts",
    code: "DRAMA",
    description: "Performance and dramatic theory.",
  },
  {
    name: "Music",
    category: "Arts",
    code: "MUSIC",
    description: "Music theory and practical studies.",
  },
  {
    name: "Design",
    category: "Arts",
    code: "DESIGN",
    description: "Creative design and visual communication.",
  },
  {
    name: "Dance Studies",
    category: "Arts",
    code: "DANCE",
    description: "Dance performance and theory.",
  },
];

// ==========================================
// SUBJECT CATEGORIES
// ==========================================

const categories = [
  "All Subjects",
  "Languages",
  "Mathematics",
  "Sciences",
  "Commerce",
  "Humanities",
  "Technology",
  "Arts",
  "Other",
];

// ==========================================
// SUBJECT FEATURES
// ==========================================

const features = [
  {
    title: "AI Classroom",
    description: "Learn with your personal AI academic tutor.",
    icon: MessageSquareText,
    label: "INTERACTIVE LEARNING",
  },
  {
    title: "Past Papers",
    description: "Explore previous NSC examination papers.",
    icon: FileText,
    label: "EXAMINATION LIBRARY",
  },
  {
    title: "Practice Exams",
    description: "Test your knowledge and track your results.",
    icon: ClipboardCheck,
    label: "ASSESSMENT CENTRE",
  },
  {
    title: "Study Resources",
    description: "Access notes, guides and revision material.",
    icon: Library,
    label: "ACADEMIC RESOURCES",
  },
];

// ==========================================
// MAIN APPLICATION
// ==========================================

function App() {
  // NAVIGATION STATE

  const [activePage, setActivePage] = useState("Dashboard");

  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  // SEARCH AND FILTER STATE

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All Subjects");

  // MOBILE MENU STATE

  const [mobileMenu, setMobileMenu] = useState(false);

  // ==========================================
  // LEARNER'S SELECTED SUBJECTS
  // ==========================================

  const [mySubjects, setMySubjects] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("matric-institute-subjects");

      if (!stored) {
        return [];
      }

      const parsed: unknown = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter(
        (item): item is string =>
          typeof item === "string" &&
          subjects.some((subject) => subject.name === item)
      );
    } catch {
      return [];
    }
  });

  // SAVE SELECTED SUBJECTS TO BROWSER STORAGE

  useEffect(() => {
    try {
      localStorage.setItem(
        "matric-institute-subjects",
        JSON.stringify(mySubjects)
      );
    } catch (error) {
      console.error("Unable to save selected subjects:", error);
    }
  }, [mySubjects]);

  // ==========================================
  // FILTER SUBJECTS
  // ==========================================

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch = subject.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Subjects" ||
      subject.category === category;

    return matchesSearch && matchesCategory;
  });

  // FIND CURRENT SUBJECT

  const currentSubject = subjects.find(
    (subject) => subject.name === activeSubject
  );

  // ==========================================
  // NAVIGATION FUNCTIONS
  // ==========================================

  const openSubject = (name: string) => {
    setActiveSubject(name);
    setActivePage("Subjects");
    setMobileMenu(false);
  };

  const goToPage = (page: string) => {
    setActivePage(page);
    setActiveSubject(null);
    setMobileMenu(false);
  };

  // ==========================================
  // ADD OR REMOVE LEARNER SUBJECTS
  // ==========================================

  const toggleMySubject = (subjectName: string) => {
    setMySubjects((current) =>
      current.includes(subjectName)
        ? current.filter((name) => name !== subjectName)
        : [...current, subjectName]
    );
  };

  // ==========================================
  // SIDEBAR NAVIGATION
  // ==========================================

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Subjects",
      icon: BookOpen,
    },
    {
      name: "My Subjects",
      icon: Bookmark,
    },
    {
      name: "AI Classroom",
      icon: MessageSquareText,
    },
    {
      name: "Past Papers",
      icon: Library,
    },
    {
      name: "Practice Exams",
      icon: ClipboardCheck,
    },
    {
      name: "My Progress",
      icon: BarChart3,
    },
  ];

  // ==========================================
  // RENDER APPLICATION
  // ==========================================

  return (
    <div className="app-shell">

      {/* MOBILE OVERLAY */}

      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>

        {/* BRAND */}

        <div className="brand">

          <div className="brand-emblem">
            <GraduationCap size={25} />
          </div>

          <div>
            <h2>THE MATRIC</h2>
            <span>INSTITUTE</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>

        </div>

        <div className="institution-label">
          ACADEMIC PORTAL
        </div>

        {/* MAIN NAVIGATION */}

        <nav className="navigation">

          {navItems.map((item) => {
            const Icon = item.icon;

            const selected =
              activePage === item.name &&
              (item.name !== "Subjects" || !activeSubject);

            return (
              <button
                key={item.name}
                className={`nav-item ${selected ? "nav-active" : ""}`}
                onClick={() => goToPage(item.name)}
              >
                <Icon size={18} strokeWidth={1.7} />

                <span>{item.name}</span>

                {selected && (
                  <span className="active-indicator" />
                )}
              </button>
            );
          })}

        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">

          <div className="sidebar-divider" />

          <button
            className="nav-item"
            onClick={() => goToPage("Settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          {/* MEMBERSHIP CARD */}

          <div className="membership-card">

            <span className="membership-label">
              YOUR MEMBERSHIP
            </span>

            <h4>Academic Access</h4>

            <p>12-month learning access</p>

            <div className="membership-status">
              <span className="status-dot" />
              Preview account
            </div>

          </div>

          <div className="sidebar-footer">
            <span>AN INSTITUTION FOR EVERY AMBITION.</span>
            <span>EST. 2026</span>
          </div>

        </div>

      </aside>

      {/* ======================================
          MAIN CONTENT AREA
      ====================================== */}

      <main className="main-content">

        {/* TOP NAVIGATION BAR */}

        <header className="topbar">

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">

            <span>ACADEMIC PORTAL</span>

            <ChevronRight size={13} />

            <strong>
              {activeSubject || activePage}
            </strong>

          </div>

          <div className="topbar-actions">

            <button
              className="icon-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <div className="topbar-divider" />

            {/* LEARNER PROFILE */}

            <div className="profile">

              <div className="profile-avatar">
                ST
              </div>

              <div className="profile-info">
                <strong>Student Name</strong>
                <span>Matric Candidate</span>
              </div>

            </div>

          </div>

        </header>

        <div className="page-container">

          {/* ======================================
              1. LEARNER DASHBOARD
          ====================================== */}

          {activePage === "Dashboard" && !activeSubject && (

            <>

              <section className="welcome-section">

                <div>

                  <span className="eyebrow">
                    <span className="gold-line" />
                    YOUR ACADEMIC JOURNEY
                  </span>

                  <h1>
                    Knowledge is the beginning
                    <br />
                    of <em>every possibility.</em>
                  </h1>

                  <p>
                    Welcome to your academic home.
                    Your next chapter starts with what you learn today.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => goToPage("Subjects")}
                  >
                    Explore your subjects
                    <ArrowUpRight size={17} />
                  </button>

                </div>

                {/* INSTITUTIONAL SEAL */}

                <div className="welcome-seal">

                  <div className="seal-circle">

                    <GraduationCap
                      size={43}
                      strokeWidth={1.2}
                    />

                    <span>THE MATRIC</span>
                    <strong>INSTITUTE</strong>

                    <small>
                      KNOWLEDGE · DISCIPLINE · EXCELLENCE
                    </small>

                  </div>

                </div>

              </section>

              {/* LEARNER STATISTICS */}

              <section className="stats-grid">

                <div className="stat-card">

                  <span className="stat-icon">
                    <BookOpen size={19} />
                  </span>

                  <span className="stat-label">
                    AVAILABLE SUBJECTS
                  </span>

                  <strong>{subjects.length}</strong>

                  <span className="stat-note">
                    Explore the curriculum
                  </span>

                </div>

                <div className="stat-card">

                  <span className="stat-icon">
                    <Bookmark size={19} />
                  </span>

                  <span className="stat-label">
                    MY SUBJECTS
                  </span>

                  <strong>
                    {String(mySubjects.length).padStart(2, "0")}
                  </strong>

                  <span className="stat-note">
                    Your selected subjects
                  </span>

                </div>

                <div className="stat-card">

                  <span className="stat-icon">
                    <Clock3 size={19} />
                  </span>

                  <span className="stat-label">
                    LEARNING HOURS
                  </span>

                  <strong>00</strong>

                  <span className="stat-note">
                    Your journey starts here
                  </span>

                </div>

                <div className="stat-card">

                  <span className="stat-icon">
                    <Award size={19} />
                  </span>

                  <span className="stat-label">
                    EXAMS COMPLETED
                  </span>

                  <strong>00</strong>

                  <span className="stat-note">
                    Build your confidence
                  </span>

                </div>

              </section>

              {/* FEATURED SUBJECTS */}

              <section className="section-block">

                <div className="section-heading">

                  <div>

                    <span className="eyebrow">
                      THE ACADEMIC CATALOGUE
                    </span>

                    <h2>Your subjects, your future.</h2>

                    <p>
                      Explore your subjects and begin preparing
                      for your examinations.
                    </p>

                  </div>

                  <button
                    className="text-link"
                    onClick={() => goToPage("Subjects")}
                  >
                    View all subjects
                    <ArrowUpRight size={16} />
                  </button>

                </div>

                <div className="featured-grid">

                  {subjects.slice(0, 4).map((subject, index) => (

                    <button
                      className="featured-subject"
                      key={subject.code}
                      onClick={() => openSubject(subject.name)}
                    >

                      <span className="subject-number">
                        0{index + 1}
                      </span>

                      <BookMarked
                        size={23}
                        strokeWidth={1.5}
                      />

                      <span className="subject-category">
                        {subject.category}
                      </span>

                      <h3>{subject.name}</h3>

                      <span className="subject-arrow">
                        Explore subject
                        <ArrowUpRight size={15} />
                      </span>

                    </button>

                  ))}

                </div>

              </section>

              {/* ACADEMIC BANNER */}

              <section className="academic-banner">

                <div className="banner-icon">
                  <Sparkles size={25} />
                </div>

                <div>

                  <span className="eyebrow">
                    A NEW WAY TO LEARN
                  </span>

                  <h2>
                    Your personal academic tutor is coming.
                  </h2>

                  <p>
                    Experience guided lessons, personalised
                    explanations and interactive revision.
                  </p>

                </div>

                <span className="coming-soon">
                  COMING SOON
                </span>

              </section>

            </>

          )}

          {/* ======================================
              2. SUBJECT DIRECTORY
          ====================================== */}

          {activePage === "Subjects" && !activeSubject && (

            <section className="section-block subject-library">

              <div className="section-heading">

                <div>

                  <span className="eyebrow">
                    ACADEMIC DIRECTORY
                  </span>

                  <h1>Explore the curriculum.</h1>

                  <p>
                    Discover the subjects available in your
                    matric revision journey.
                  </p>

                </div>

              </div>

              {/* SUBJECT SEARCH */}

              <div className="search-container">

                <Search size={19} />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for a subject..."
                  aria-label="Search subjects"
                />

              </div>

              {/* CATEGORY FILTERS */}

              <div className="category-filters">

                {categories.map((item) => (

                  <button
                    key={item}
                    className={
                      category === item
                        ? "filter-active"
                        : ""
                    }
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>

                ))}

              </div>

              {/* SUBJECT CARDS */}

              <div className="subject-grid">

                {filteredSubjects.map((subject) => (

                  <button
                    className="library-card"
                    key={subject.code}
                    onClick={() => openSubject(subject.name)}
                  >

                    <div className="library-card-top">
                      <span>{subject.code}</span>
                      <ArrowUpRight size={17} />
                    </div>

                    <span className="subject-category">
                      {subject.category}
                    </span>

                    <h3>{subject.name}</h3>

                    <p>{subject.description}</p>

                    <div className="library-card-bottom">
                      <span>Explore subject</span>
                      <ChevronRight size={16} />
                    </div>

                  </button>

                ))}

              </div>

              {filteredSubjects.length === 0 && (

                <div className="empty-state">
                  No subjects found. Try another search.
                </div>

              )}

            </section>

          )}

          {/* ======================================
              3. MY SUBJECTS
          ====================================== */}

          {activePage === "My Subjects" && !activeSubject && (

            <section className="section-block subject-library">

              <div className="section-heading">

                <div>

                  <span className="eyebrow">
                    YOUR ACADEMIC PROGRAMME
                  </span>

                  <h1>My selected subjects.</h1>

                  <p>
                    Your personal collection of subjects.
                    Continue exploring and building your academic programme.
                  </p>

                </div>

              </div>

              {mySubjects.length === 0 ? (

                <div className="empty-state">

                  <Bookmark
                    size={30}
                    style={{ marginBottom: "15px" }}
                  />

                  <h3>No subjects selected yet.</h3>

                  <p>
                    Browse the academic catalogue and add
                    the subjects you intend to study.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => goToPage("Subjects")}
                  >
                    Browse subjects
                    <ArrowUpRight size={17} />
                  </button>

                </div>

              ) : (

                <div className="subject-grid">

                  {subjects
                    .filter((subject) =>
                      mySubjects.includes(subject.name)
                    )
                    .map((subject) => (

                      <button
                        className="library-card"
                        key={subject.code}
                        onClick={() => openSubject(subject.name)}
                      >

                        <div className="library-card-top">
                          <span>{subject.code}</span>
                          <ArrowUpRight size={17} />
                        </div>

                        <span className="subject-category">
                          {subject.category}
                        </span>

                        <h3>{subject.name}</h3>

                        <p>{subject.description}</p>

                        <div className="library-card-bottom">
                          <span>Open subject</span>
                          <ChevronRight size={16} />
                        </div>

                      </button>

                    ))}

                </div>

              )}

            </section>

          )}

          {/* ======================================
              4. PAST PAPERS LIBRARY
          ====================================== */}

          {activePage === "Past Papers" && (

            <PastPapers
              subjectOptions={subjects.map((subject) => subject.name)}
              initialSubject={activeSubject ?? undefined}
              onBack={() => {
                if (activeSubject) {
                  setActivePage("Subjects");
                } else {
                  goToPage("Subjects");
                }
              }}
            />

          )}

          {/* ======================================
              5. INDIVIDUAL SUBJECT DASHBOARD
          ====================================== */}

          {activeSubject &&
            currentSubject &&
            activePage !== "Subjects" &&
            activePage !== "Past Papers" && (

            <section className="subject-detail">

              <button
                className="back-link"
                onClick={() => setActiveSubject(null)}
              >
                <ChevronLeft size={17} />
                Back to subjects
              </button>

              {/* SUBJECT HERO */}

              <div className="subject-hero">

                <span className="eyebrow">
                  {currentSubject.category.toUpperCase()}
                  {" · "}
                  {currentSubject.code}
                </span>

                <h1>{currentSubject.name}</h1>

                <p>{currentSubject.description}</p>

                <div className="subject-meta">

                  <span>
                    <GraduationCap size={16} />
                    NSC / Grade 12
                  </span>

                  <span>
                    <BookOpen size={16} />
                    Academic resources
                  </span>

                </div>

                {/* ADD OR REMOVE SUBJECT */}

                <button
                  className="primary-button"
                  onClick={() =>
                    toggleMySubject(currentSubject.name)
                  }
                >
                  {mySubjects.includes(currentSubject.name)
                    ? "Remove from My Subjects"
                    : "Add to My Subjects"}

                  <ArrowUpRight size={17} />
                </button>

              </div>

              {/* SUBJECT LEARNING FEATURES */}

              <div className="section-heading">

                <div>

                  <span className="eyebrow">
                    YOUR LEARNING ENVIRONMENT
                  </span>

                  <h2>Everything in one place.</h2>

                  <p>
                    Choose how you would like to study.
                  </p>

                </div>

              </div>

              <div className="feature-grid">

                {features.map((feature) => {

                  const Icon = feature.icon;

                  return (

                    <button
                      className="feature-card"
                      key={feature.title}
                      onClick={() =>
                        setActivePage(feature.title)
                      }
                    >

                      <span className="feature-icon">
                        <Icon size={24} />
                      </span>

                      <span className="eyebrow">
                        {feature.label}
                      </span>

                      <h3>{feature.title}</h3>

                      <p>{feature.description}</p>

                      <span className="feature-link">
                        Enter section
                        <ArrowUpRight size={15} />
                      </span>

                    </button>

                  );

                })}

              </div>

            </section>

          )}

          {/* ======================================
              6. SUBJECT-SPECIFIC SECTIONS
          ====================================== */}

          {activeSubject &&
            currentSubject &&
            activePage !== "Subjects" &&
            activePage !== "Past Papers" && (

            <section className="placeholder-page">

              <button
                className="back-link"
                onClick={() => setActivePage("Subjects")}
              >
                <ChevronLeft size={17} />
                Back to {currentSubject.name}
              </button>

              <span className="eyebrow">
                {currentSubject.name.toUpperCase()}
              </span>

              <h1>{activePage}</h1>

              <p>
                This section is being prepared for{" "}
                {currentSubject.name}.
                Your academic resources will appear here.
              </p>

              <button
                className="primary-button"
                onClick={() => setActivePage("Subjects")}
              >
                Return to subject dashboard
                <BookOpen size={16} />
              </button>

            </section>

          )}

          {/* ======================================
              7. GENERAL NAVIGATION PAGES
          ====================================== */}

          {!activeSubject &&
            activePage !== "Dashboard" &&
            activePage !== "Subjects" &&
            activePage !== "My Subjects" &&
            activePage !== "Past Papers" && (

            <section className="placeholder-page">

              <span className="eyebrow">
                THE MATRIC INSTITUTE
              </span>

              <h1>{activePage}</h1>

              <p>
                This academic section is being prepared.
              </p>

              <button
                className="primary-button"
                onClick={() => goToPage("Dashboard")}
              >
                Return to dashboard
                <House size={16} />
              </button>

            </section>

          )}

          {/* ======================================
              FOOTER
          ====================================== */}

          <footer className="page-footer">

            <span>
              THE MATRIC INSTITUTE © 2026
            </span>

            <span>
              KNOWLEDGE. DISCIPLINE. EXCELLENCE.
            </span>

          </footer>

        </div>

      </main>

    </div>
  );
}

export default App;
