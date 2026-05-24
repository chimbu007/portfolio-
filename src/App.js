import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const css = `
:root {
  --bg: #090a0f;
  --surface: rgba(255, 255, 255, 0.075);
  --surface-strong: rgba(255, 255, 255, 0.12);
  --text: #f8fafc;
  --muted: #a9b4c7;
  --line: rgba(255, 255, 255, 0.12);
  --coral: #ff6b6b;
  --cyan: #2dd4bf;
  --gold: #f5c542;
  --green: #7dd87d;
  --shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body,
html,
#root {
  min-height: 100%;
}

body {
  background:
    radial-gradient(circle at 12% 16%, rgba(45, 212, 191, 0.17), transparent 28%),
    radial-gradient(circle at 78% 8%, rgba(255, 107, 107, 0.16), transparent 26%),
    radial-gradient(circle at 58% 84%, rgba(245, 197, 66, 0.11), transparent 30%),
    var(--bg);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent 72%);
}

a {
  color: inherit;
}

button,
input,
textarea {
  font: inherit;
}

.portfolio-shell {
  position: relative;
  min-height: 100vh;
}

.container {
  width: min(1120px, calc(100% - clamp(28px, 5vw, 56px)));
  margin: 0 auto;
}

.nav {
  position: sticky;
  top: 14px;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: min(1120px, calc(100% - clamp(28px, 5vw, 56px)));
  margin: 14px auto 0;
  padding: 12px 14px 12px 18px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: rgba(9, 10, 15, 0.72);
  backdrop-filter: blur(18px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  animation: slideDown 0.75s ease both;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.2px;
}

.brand span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.brand-mark {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #071014;
  background: linear-gradient(135deg, var(--cyan), var(--gold));
  box-shadow: 0 10px 26px rgba(45, 212, 191, 0.25);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  padding: 9px 12px;
  border-radius: 999px;
  font-size: 14px;
  transition: color 0.25s ease, background 0.25s ease, transform 0.25s ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
  gap: clamp(26px, 5vw, 42px);
  align-items: center;
  min-height: calc(100vh - 74px);
  min-height: calc(100svh - 74px);
  padding: clamp(60px, 8vw, 86px) 0 clamp(48px, 7vw, 72px);
}

.hero-copy {
  animation: fadeUp 0.85s ease both 0.1s;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 18px;
  padding: 8px 12px;
  border: 1px solid rgba(45, 212, 191, 0.28);
  border-radius: 999px;
  background: rgba(45, 212, 191, 0.08);
  color: #cafdf4;
  font-size: 13px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--green);
  box-shadow: 0 0 0 8px rgba(125, 216, 125, 0.11);
}

.hero-title {
  max-width: 760px;
  font-size: clamp(42px, 7.5vw, 92px);
  line-height: 0.96;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

.hero-title span {
  display: block;
  color: transparent;
  background: linear-gradient(100deg, #fff, #bffcf3 42%, #ffd9a1 72%, #ffb1b1);
  -webkit-background-clip: text;
  background-clip: text;
}

.hero-sub {
  max-width: 660px;
  margin-top: 22px;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.75;
}

.cta-row,
.social-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.cta-row {
  margin-top: 28px;
}

.social-row {
  margin-top: 18px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 11px 17px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.btn:hover {
  transform: translateY(-3px);
  border-color: rgba(45, 212, 191, 0.5);
  background: rgba(45, 212, 191, 0.16);
  box-shadow: 0 16px 35px rgba(45, 212, 191, 0.13);
}

.btn.primary {
  border: 0;
  color: #071014;
  background: linear-gradient(135deg, var(--cyan), var(--gold));
  box-shadow: 0 18px 36px rgba(45, 212, 191, 0.2);
}

.btn.primary:hover {
  background: linear-gradient(135deg, #67f5e5, #ffd76d);
}

.icon-link {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 50%;
}

.profile-card {
  position: relative;
  width: 100%;
  padding: 1px;
  border-radius: 30px;
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.55), rgba(255, 107, 107, 0.45), rgba(245, 197, 66, 0.5));
  box-shadow: var(--shadow);
  animation: floatCard 5s ease-in-out infinite, fadeUp 0.85s ease both 0.25s;
}

.profile-inner {
  position: relative;
  overflow: hidden;
  min-height: clamp(430px, 46vw, 490px);
  padding: clamp(20px, 3vw, 26px);
  border-radius: 29px;
  background: linear-gradient(180deg, rgba(17, 20, 30, 0.94), rgba(15, 16, 22, 0.94));
}

.profile-inner::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 72% 18%, rgba(255, 107, 107, 0.25), transparent 30%),
    radial-gradient(circle at 25% 78%, rgba(45, 212, 191, 0.22), transparent 34%);
  opacity: 0.9;
}

.avatar-wrap {
  position: relative;
  z-index: 1;
  width: clamp(172px, 22vw, 218px);
  height: clamp(172px, 22vw, 218px);
  margin: 8px auto 28px;
  border-radius: 44px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(-3deg);
}

.avatar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 38px;
  background: rgba(255, 255, 255, 0.1);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.profile-info {
  position: relative;
  z-index: 1;
}

.profile-name {
  font-size: clamp(20px, 2.4vw, 23px);
  font-weight: 800;
  line-height: 1.2;
}

.profile-desc {
  margin-top: 10px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 18px;
}

.chip {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 7px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  color: #dfe8f8;
  font-size: 13px;
  font-weight: 650;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.chip:hover {
  transform: translateY(-3px);
  border-color: rgba(245, 197, 66, 0.45);
  background: rgba(245, 197, 66, 0.12);
  color: #fff5c7;
}

.section {
  position: relative;
  padding: clamp(58px, 8vw, 86px) 0;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 26px;
}

.section-kicker {
  color: var(--cyan);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.section-title {
  margin-top: 8px;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.08;
}

.section-line {
  flex: 1;
  height: 1px;
  max-width: 360px;
  background: linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.45), rgba(255, 255, 255, 0.08));
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 16px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 255px;
  overflow: hidden;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.045));
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  isolation: isolate;
  animation: fadeUp 0.75s ease both;
  animation-delay: calc(var(--i) * 0.08s);
  transition: transform 0.28s ease, border-color 0.28s ease, background 0.28s ease;
}

.card::before {
  content: "";
  position: absolute;
  inset: -1px;
  z-index: -1;
  opacity: 0;
  background: radial-gradient(circle at 20% 15%, rgba(45, 212, 191, 0.22), transparent 36%),
    radial-gradient(circle at 82% 88%, rgba(255, 107, 107, 0.18), transparent 34%);
  transition: opacity 0.28s ease;
}

.card:hover {
  transform: translateY(-9px);
  border-color: rgba(45, 212, 191, 0.35);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.055));
}

.card:hover::before {
  opacity: 1;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
}

.project-number {
  color: rgba(255, 255, 255, 0.34);
  font-size: 13px;
  font-weight: 800;
}

.project-icon {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: rgba(45, 212, 191, 0.12);
  color: #affff2;
}

.card-title {
  font-size: 19px;
  font-weight: 800;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.card-desc {
  margin-top: 12px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.65;
}

.card-actions {
  margin-top: auto;
  padding-top: 22px;
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
  gap: 20px;
}

.glass-panel {
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px);
}

.about-copy {
  padding: 28px;
}

.about-copy p {
  color: var(--muted);
  line-height: 1.8;
}

.skill-group {
  margin-top: 24px;
}

.skill-group h4 {
  margin-bottom: 12px;
  color: #fff;
  font-size: 15px;
}

.code-card {
  display: flex;
  align-items: center;
  min-height: 100%;
  padding: 24px;
}

.code-card pre {
  width: 100%;
  overflow-x: auto;
  color: #eaf2ff;
  font-size: clamp(12px, 1.5vw, 14px);
  line-height: 1.8;
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 390px);
  gap: 20px;
  align-items: stretch;
}

.contact-copy,
.contact-form {
  padding: 28px;
}

.contact-copy p {
  color: var(--muted);
  line-height: 1.8;
}

.contact-detail {
  margin-top: 24px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.055);
}

.contact-detail strong {
  display: block;
  margin-bottom: 6px;
}

.contact-detail div {
  color: var(--muted);
  overflow-wrap: anywhere;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid var(--line);
  border-radius: 15px;
  outline: none;
  background: rgba(7, 9, 14, 0.48);
  color: var(--text);
  resize: vertical;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: rgba(45, 212, 191, 0.55);
  background: rgba(7, 9, 14, 0.68);
  box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.1);
}

footer {
  padding: 30px 0 44px;
  color: rgba(255, 255, 255, 0.52);
  text-align: center;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatCard {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 1040px) {
  .hero,
  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    padding-top: 70px;
  }

  .profile-card {
    max-width: 520px;
    justify-self: center;
  }
}

@media (max-width: 720px) {
  .container,
  .nav {
    width: min(100% - 24px, 1120px);
  }

  .nav {
    position: relative;
    top: 0;
    flex-direction: column;
    align-items: stretch;
  }

  .brand {
    justify-content: center;
  }

  .nav-links {
    justify-content: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .nav-links a {
    padding: 8px 10px;
    font-size: 13px;
  }

  .hero {
    padding: 54px 0 40px;
  }

  .hero-copy,
  .section-heading {
    text-align: center;
  }

  .eyebrow,
  .cta-row,
  .social-row {
    justify-content: center;
  }

  .hero-sub {
    font-size: 16px;
    line-height: 1.65;
  }

  .profile-inner {
    min-height: auto;
  }

  .section-heading {
    display: block;
  }

  .section-line {
    display: none;
  }

  .about-copy,
  .code-card,
  .contact-copy,
  .contact-form {
    padding: 22px;
  }

  .cta-row .btn,
  .contact-form .btn {
    width: 100%;
  }

  .icon-link {
    width: 44px;
  }
}

@media (max-width: 480px) {
  body {
    background:
      radial-gradient(circle at 20% 10%, rgba(45, 212, 191, 0.14), transparent 32%),
      radial-gradient(circle at 80% 2%, rgba(255, 107, 107, 0.12), transparent 28%),
      var(--bg);
  }

  .nav {
    margin-top: 10px;
    padding: 10px;
    border-radius: 18px;
  }

  .brand-mark {
    width: 30px;
    height: 30px;
    border-radius: 10px;
  }

  .brand span:last-child {
    max-width: 210px;
  }

  .nav-links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
  }

  .nav-links a {
    text-align: center;
  }

  .hero-title {
    font-size: clamp(38px, 14vw, 56px);
  }

  .eyebrow {
    width: 100%;
    justify-content: center;
    font-size: 12px;
  }

  .avatar-wrap {
    margin-bottom: 22px;
    border-radius: 34px;
  }

  .avatar {
    border-radius: 28px;
  }

  .profile-inner,
  .glass-panel,
  .card {
    border-radius: 18px;
  }

  .card {
    min-height: auto;
    padding: 18px;
  }

  .about-copy,
  .code-card,
  .contact-copy,
  .contact-form {
    padding: 18px;
  }

  .code-card pre {
    white-space: pre-wrap;
    word-break: break-word;
  }

  footer {
    padding-bottom: 30px;
    font-size: 14px;
  }
}

@media (max-width: 360px) {
  .container,
  .nav {
    width: min(100% - 18px, 1120px);
  }

  .brand span:last-child {
    max-width: 180px;
  }

  .btn {
    padding-inline: 13px;
    font-size: 14px;
  }

  .chip {
    font-size: 12px;
    padding-inline: 10px;
  }
}
`;

    const style = document.createElement("style");
    style.id = "portfolio-css";
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById("portfolio-css");
      if (existing) existing.remove();
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Patient Monitoring",
      desc: "Smart patient monitoring system designed for precision, efficiency & enhanced clinical support.",
      demo: "https://patient-monitor-seven.vercel.app/",
    },
    {
      id: 2,
      title: "Novel Silks",
      desc: "A refined silk saree shopping website crafted to showcase premium collections with elegant visuals and a smooth browsing experience.",
      demo: "https://novelsilks.com/",
    },
    {
      id: 3,
      title: "Course Platform",
      desc: "Course Overview & Learning Path",
      demo: "https://course-page-delta.vercel.app/",
    },
    {
      id: 4,
      title: "Hospital Data Analytics",
      desc: "A responsive dashboard to monitor live hospital data and generate chart based insights",
      demo: "https://zidio-project-sage.vercel.app/",
    },
    {
      id: 5,
      title: "Sports Valley",
      desc: "A sports equipment ecommerce website built to highlight product categories, offers, and a smooth shopping flow for athletes and players.",
      demo: "https://sportsvalley.shop/",
    },
    {
      id: 6,
      title: "Solo Spares",
      desc: "A mobile spare parts ecommerce website designed to present original replacement parts with a clean, reliable shopping experience.",
      demo: "https://solospares.in/",
    },
  ];

  const technicalSkills = ["HTML5", "CSS3", "JavaScript", "React.js", "WordPress", "Elementor"];
  const programmingSkills = ["Java", "C"];
  const otherSkills = ["Git"];
  const profileSkills = ["React", "JavaScript", "CSS", "WordPress"];

  return (
    <div className="portfolio-shell">
      <nav className="nav">
        <div className="brand">
          <span className="brand-mark">C</span>
          <span>chidambaram-dev</span>
        </div>
        <div className="nav-links">
          <a href="#home" className="active">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main className="container">
        <header id="home" className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              Hello, I’m Chidambaram 👋
            </div>
            <h1 className="hero-title">
              Frontend
              <span>Developer</span>
            </h1>
            <p className="hero-sub">
              Expanding skills and discovering new ways to innovate. I build beautiful UI,
              useful tools, and polished web experiences.
            </p>
            <div className="cta-row">
              <a href="/Chidambaram Resume.pdf" download className="btn primary">
                Download CV
              </a>
              <a href="#projects" className="btn">
                View Projects
              </a>
            </div>
            <div className="social-row">
              <a className="btn icon-link" href="https://github.com/chimbu007" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a className="btn icon-link" href="mailto:chidambaramchimbu07@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
              <a className="btn icon-link" href="https://wa.me/917904210709" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <aside className="profile-card">
            <div className="profile-inner">
              <div className="avatar-wrap">
                <div className="avatar">
                  <img src="/chimbu.jpeg" alt="Chidambaram" />
                </div>
              </div>
              <div className="profile-info">
                <div className="profile-name">Chidambaram — Frontend Dev</div>
                <div className="profile-desc">
                  Building clean UI & practical apps. Focus: React, animations, responsive design.
                </div>
                <div className="skills">
                  {profileSkills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </header>

        <section className="section" id="projects">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Selected Work</div>
              <h2 className="section-title">My Projects</h2>
            </div>
            <div className="section-line" />
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="card" key={project.id} style={{ "--i": index }}>
                <div className="card-top">
                  <span className="project-number">0{project.id}</span>
                  <span className="project-icon">
                    <i className="fas fa-arrow-up-right-from-square"></i>
                  </span>
                </div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.desc}</p>
                <div className="card-actions">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn">
                    Live Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Profile</div>
              <h2 className="section-title">About Me</h2>
            </div>
            <div className="section-line" />
          </div>

          <div className="about-grid">
            <div className="glass-panel about-copy">
              <p>
                I love bringing ideas to life through thoughtful design and interactive code.
                I build interfaces that feel alive. For me, great UI is where creativity meets functionality.
              </p>

              <div className="skill-group">
                <h4>Technical Skills</h4>
                <div className="skills">
                  {technicalSkills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skill-group">
                <h4>Programming Skills</h4>
                <div className="skills">
                  {programmingSkills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skill-group">
                <h4>Other Skills</h4>
                <div className="skills">
                  {otherSkills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel code-card">
              <pre>
{`const developer = {
  name: 'Chidambaram',
  role: 'Frontend',
  focus: ['React','Animations']
}`}
              </pre>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Contact</div>
              <h2 className="section-title">Get In Touch</h2>
            </div>
            <div className="section-line" />
          </div>

          <div className="contact-grid">
            <div className="glass-panel contact-copy">
              <p>
                Let's collaborate! I'm always open to discussing exciting projects and new opportunities.
              </p>
              <div className="contact-detail">
                <strong>Email</strong>
                <div>chidambaramchimbu07@gmail.com</div>
              </div>
              <div className="social-row">
                <a className="btn icon-link" href="https://github.com/chidambaram" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a className="btn icon-link" href="mailto:chidambaramchimbu07@gmail.com" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
                <a className="btn icon-link" href="https://wa.me/917904210709" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <form
              className="glass-panel contact-form"
              action="https://formspree.io/f/xrbopjby"
              method="POST"
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" rows={4} placeholder="Your Message" required />
              <button className="btn primary" type="submit">Send Message</button>
            </form>
          </div>
        </section>

        <footer>© {new Date().getFullYear()} Chidambaram • Built with React</footer>
      </main>
    </div>
  );
}
