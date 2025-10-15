import React, { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Highlight navbar active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPos = window.scrollY + 100;
      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(sec);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Dishansh</div>
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {["home", "about", "skills", "projects", "contact"].map((sec) => (
            <button
              key={sec}
              className={activeSection === sec ? "active-link" : ""}
              onClick={() => scrollToSection(sec)}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </div>
        <div
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Hello, I'm <span>Dishansh</span></h1>
          <p>Full Stack Developer | React | Node.js | MongoDB</p>
          <button onClick={() => scrollToSection("projects")}>View Projects</button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Passionate Full Stack Developer creating modern web applications with React, Node.js, Express, and MongoDB. I love turning ideas into reality.
            </p>
          </div>
          <div className="about-image">
            <img src="https://images.sympla.com.br/6022943ca97b4-lg.png" alt="Dishansh" />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {[
            { name: "HTML", level: 90 },
            { name: "CSS", level: 85 },
            { name: "JavaScript", level: 90 },
            { name: "React", level: 85 },
            { name: "Node.js", level: 80 },
            { name: "Express", level: 75 },
            { name: "MongoDB", level: 80 },
            { name: "Git & GitHub", level: 85 },
          ].map((skill) => (
            <div key={skill.name} className="skill-card">
              <h4>{skill.name}</h4>
              <div className="skill-bar">
                <div className="skill-level" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects-section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {[1, 2, 3].map((p) => (
            <div key={p} className="project-card">
              <img src="https://images.sympla.com.br/6022943ca97b4-lg.png" alt={`Project ${p}`} />
              <h3>Project {p}</h3>
              <p>A full-stack web application built using MERN stack.</p>
              <a href="#">View Project</a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <h2>Contact Me</h2>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Dishansh. All rights reserved.</p>
        <div className="social-links">
          <a href="#">LinkedIn</a> | <a href="#">GitHub</a> | <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
