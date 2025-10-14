import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Dishansh</div>
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {["home","about","skills","projects","contact"].map((sec) => (
            <button key={sec} onClick={() => scrollToSection(sec)}>
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </div>
        <div className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={()=>setIsMenuOpen(!isMenuOpen)}>
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
          <p>
            Passionate Full Stack Developer. I build web apps using React, Node.js, and MongoDB.
          </p>
          <img src="https://via.placeholder.com/250" alt="Dishansh" />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {["HTML","CSS","JS","React","Node.js","Express","MongoDB","Git"].map(skill => (
            <div key={skill} className="skill-card">{skill}</div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects-section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {[1,2,3].map(p => (
            <div key={p} className="project-card">
              <img src="https://via.placeholder.com/300x150" alt={`Project ${p}`} />
              <h3>Project {p}</h3>
              <p>Full Stack project using MERN stack.</p>
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
      </footer>
    </div>
  );
}

export default Dashboard;
