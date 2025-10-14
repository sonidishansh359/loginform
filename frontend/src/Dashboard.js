import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // close menu on mobile
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Dishansh</div>
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("skills")}>Skills</li>
          <li onClick={() => scrollToSection("projects")}>Projects</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
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

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Hello, I'm <span>Dishansh</span></h1>
          <p>Full Stack Developer | React, Node.js, MongoDB</p>
          <button onClick={() => scrollToSection("projects")}>View Projects</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Me</h2>
        <div className="about-content">
          <p>
            I am a passionate Full Stack Developer building modern web applications using MERN stack.
          </p>
          <div className="about-image">
            <img src="https://via.placeholder.com/300" alt="Dishansh" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Git"].map(skill => (
            <div key={skill} className="skill-card">{skill}</div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {[1, 2, 3].map((p) => (
            <div key={p} className="project-card">
              <img src="https://via.placeholder.com/400x200" alt={`Project ${p}`} />
              <h3>Project {p}</h3>
              <p>Full Stack project using MERN stack.</p>
              <a href="#">View Project</a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Me</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
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
