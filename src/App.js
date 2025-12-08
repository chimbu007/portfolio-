import React, { useEffect, useState } from "react";

export default function App() {
  const [heroScale, setHeroScale] = useState(1);

  useEffect(() => {
    const css = `
:root {
  --bg1: #2a0004;
  --bg2: #3f0a0f;
  --accent: #ff3b3b;
  --card: rgba(255,255,255,0.04);
  --glass: rgba(255,255,255,0.03);
  --text: #f6f6f6;
}

/* ===== RESET ===== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body, html, #root {
  height: 100%;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
body {
  background: linear-gradient(180deg, var(--bg1), var(--bg2));
  color: var(--text);
  overflow-x: hidden;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 28px;
}

/* ===== NAVBAR ===== */
.navbar-wrap {
  width: 100%;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 60px;
  max-width: 1200px;
  margin: 0 auto;
}
.brand {
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}
.nav-links {
  display: flex;
  gap: 18px;
  align-items: center;
}
.nav-links a {
  color: #fff;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.3s;
}
.nav-links a.active,
.nav-links a:hover {
  background: rgba(255,59,59,0.15);
}

/* ===== HERO ===== */
.hero {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 120px 0 40px;
  position: relative;
  overflow: visible;
}
.hero-left {
  flex: 1;
}
.eyebrow {
  font-size: 13px;
  opacity: 0.8;
}
.hero-title {
  font-size: 34px;
  margin: 8px 0;
}
.hero-sub {
  opacity: 0.85;
  max-width: 620px;
  line-height: 1.5;
}
.cta-row {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  align-items: center;
}

/* ===== BUTTON ===== */
.btn {
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid #8b0000;
  background: transparent;
  color: #ff6961;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn:hover {
  background: #8b0000;
  color: #fff;
  border-color: #ff6961;
  box-shadow: 0 0 10px rgba(255,105,97,0.4);
}

/* ===== SOCIAL LINKS ===== */
.social-row {
  margin-top: 10px;
  display: flex;
  gap: 14px;
}
.social-row a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  color: #ff6961;
  font-size: 18px;
  transition: all 0.3s;
}
.social-row a:hover {
  background: #8b0000;
  color: #fff;
  border-color: #ff6961;
}

/* ===== PROFILE ===== */
.hero-right {
  width: 420px;
  min-width: 260px;
  position: relative;
}
.profile-card {
  background: var(--card);
  border-radius: 12px;
  padding: 22px;
  display: flex;
  gap: 18px;
  align-items: center;
  backdrop-filter: blur(6px);
  box-shadow: 0 6px 30px rgba(0,0,0,0.6);
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 3px solid #ff6961;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 20%, #ffe8e8, #ffb6b6);
  box-shadow: 0 0 10px rgba(255, 59, 59, 0.4);
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.skills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

/* ===== CHIPS (SKILLS) ===== */
.chip {
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--glass);
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}
.chip:hover {
  background: rgba(255, 105, 97, 0.15);
  border-color: #ff6961;
  color: #ff6961;
  box-shadow: 0 0 8px rgba(255, 105, 97, 0.3);
  transform: scale(1.08);
}

/* ===== PROJECTS ===== */
.projects {
  margin-top: 24px;
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}
.card {
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding: 18px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.03);
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(255,105,97,0.15);
}
.card-title {
  font-weight: 600;
  margin-bottom: 8px;
}
.card-desc {
  opacity: 0.85;
  font-size: 14px;
}
.card-actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

/* ===== ABOUT / CONTACT ===== */
.section {
  margin-top: 30px;
  padding: 40px 28px;
  border-radius: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(6px);
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
#about {
  margin-top: -20px; /* brings section up neatly */
}
.about-flex {
  display: flex;
  gap: 22px;
  align-items: flex-start;
}
.about-left {
  flex: 1;
}
.about-right {
  width: 360px;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.05);
  background: transparent;
  color: var(--text);
  resize: vertical;
}
.contact-grid {
  display: flex;
  gap: 12px;
}
footer {
  margin: 40px 0 80px;
  color: rgba(255,255,255,0.6);
  text-align: center;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
  .nav {
    padding: 14px 30px;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .hero-right {
    width: 100%;
    margin-top: 20px;
  }
 .hero-left {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Keep social icons spacing consistent */
.social-row {
  margin-top: 14px;
  display: flex;
  justify-content: center;
  gap: 14px;
}

}
@media (max-width: 700px) {
  .nav {
    flex-direction: column;
    gap: 10px;
  }
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  .hero-title {
    font-size: 26px;
  }
  .hero-sub {
    font-size: 15px;
  }
  .profile-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
  }
  .skills {
    justify-content: center;
  }
  .section {
    padding: 20px;
  }
  .about-flex {
    flex-direction: column;
  }
  .about-right {
    width: 100%;
  }
  .contact-form {
    width: 100%;
  }
  .btn {
    width: 100%;
    text-align: center;
  }
  footer {
    font-size: 13px;
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

  useEffect(() => {
    function onScroll() {
      const s = window.scrollY;
      const scale = Math.max(0.86, 1 - s / 1100);
      setHeroScale(scale);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      title: "Dashboard Project Manager",
      desc: "Analytics dashboard & post scheduler",
      demo: "https://dashboard-two-fawn-20.vercel.app/",
    },
    { id: 3, title: "Course Platform", 
      desc: "Course Overview & Learning Path",
      demo: "https://course-page-delta.vercel.app/", 
    },
  ];

  return (
    <div>
      <div className="container">
        {/* NAVBAR */}
        <nav className="nav">
          <div className="brand">chidambaram-dev</div>
          <div className="nav-links">
            <a href="#home" className="active">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        {/* HERO */}
        <header
          id="home"
          className="hero"
          style={{ transform: `scale(${heroScale})`, transformOrigin: "left top" }}
        >
          <div className="hero-left">
            <div className="eyebrow">Hello, I’m Chidambaram 👋</div>
            <h1 className="hero-title">Frontend Developer</h1>
            <p className="hero-sub">
              Expanding skills and discovering new ways to innovate. I build beautiful UI,
              useful tools, and polished web experiences.
            </p>
            <div className="cta-row">
              <a href="/Chidambaram Resume.pdf" download className="btn">
                Download CV
              </a>
            </div>
                {/* === SOCIAL ICONS BELOW DOWNLOAD BUTTON === */}
    <div className="social-row">
      <a href="https://github.com/chimbu007" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github"></i>
      </a>
      <a href="mailto:chidambaramchimbu07@gmail.com">
        <i className="fas fa-envelope"></i>
      </a>
      <a href="https://wa.me/917904210709" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>


            <div className="projects" id="projects">
              <h3 style={{ marginTop: 28 }}>My Projects</h3>
              <div className="projects-grid">
                {projects.map((p) => (
                  <div className="card" key={p.id}>
                    <div className="card-title">{p.title}</div>
                    <div className="card-desc">{p.desc}</div>
                    <div className="card-actions">
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="hero-right">
            <div className="profile-card">
              <div className="avatar">
                <img src="/chimbu.jpeg" alt="Chidambaram" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>Chidambaram — Frontend Dev</div>
                <div style={{ opacity: 0.9, fontSize: 13, marginTop: 6 }}>
                  Building clean UI & practical apps. Focus: React, animations, responsive design.
                </div>
                <div className="skills">
                  <div className="chip">React</div>
                  <div className="chip">JavaScript</div>
                  <div className="chip">CSS</div>
                  <div className="chip">WordPress</div>
                </div>
              </div>
            </div>
          </aside>
        </header>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="about-flex">
            <div className="about-left">
              <h2>About Me</h2>
              <p style={{ opacity: 0.9 }}>
                I love bringing ideas to life through thoughtful design and interactive code.
                I build interfaces that feel alive. For me, great UI is where creativity meets functionality.
              </p>

              <h4 style={{ marginTop: 14 }}>Technical Skills</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                {["HTML5", "CSS3", "JavaScript", "React.js", "WordPress", "Elementor"].map((s) => (
                  <div key={s} className="chip">{s}</div>
                ))}
              </div>

              <h4 style={{ marginTop: 14 }}>Programming Skills</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                {["Java","C"].map((s) => (
                  <div key={s} className="chip">{s}</div>
                ))}
              </div>

              <h4 style={{ marginTop: 14 }}>Other Skills</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                {["Git"].map((s) => (
                  <div key={s} className="chip">{s}</div>
                ))}
              </div>
            </div>

            <div className="about-right">
              <div style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.02), transparent)", padding: 14, borderRadius: 10 }}>
                <pre style={{ margin: 0, fontSize: 13, opacity: 0.9 }}>
{`const developer = {
  name: 'Chidambaram',
  role: 'Frontend',
  focus: ['React','Animations']
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section" style={{ marginTop: 24 }}>
          <h3>Get In Touch</h3>
          <div style={{ display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ opacity: 0.9 }}>
                Let's collaborate! I'm always open to discussing exciting projects and new opportunities.
              </p>

              <div style={{ marginTop: 12 }}>
                <strong>Email</strong>
                <div style={{ opacity: 0.9 }}>chidambaramchimbu07@gmail.com</div>
              </div>
            </div>

            <form
              className="contact-form"
              style={{ width: 360 }}
              action="https://formspree.io/f/xrbopjby"
              method="POST"
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <div style={{ height: 10 }} />
              <input type="email" name="email" placeholder="Your Email" required />
              <div style={{ height: 10 }} />
              <textarea name="message" rows={4} placeholder="Your Message" required />
              <div style={{ height: 12 }} />
              <button className="btn" type="submit">Send Message</button>
            </form>
          </div>
           <div className="social-row">
    <a href="https://github.com/chidambaram" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-github"></i>
    </a>
    <a href="mailto:chidambaramchimbu07@gmail.com">
      <i className="fas fa-envelope"></i>
    </a>
    <a href="https://wa.me/917904210709" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-whatsapp"></i>
    </a>
  </div>
        </section>

        <footer>© {new Date().getFullYear()} Chidambaram • Built with React</footer>
      </div>
    </div>
  );
};