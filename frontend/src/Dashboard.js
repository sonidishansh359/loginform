import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">FullStack Dev</div>
        <ul className="nav-links">
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("skills")}>Skills</li>
          <li onClick={() => scrollToSection("projects")}>Projects</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Hello, I'm <span>Dishansh</span></h1>
          <p>Full Stack Developer | React, Node.js, MongoDB | Building modern web applications</p>
          <button onClick={() => scrollToSection("projects")}>View Projects</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Me</h2>
        <div className="about-content">
          <p>
            I am a passionate Full Stack Developer with expertise in building
            modern web applications using React, Node.js, Express, and MongoDB.
            I love transforming ideas into real-world applications and constantly
            learning new technologies.
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
          <div className="skill-card">HTML</div>
          <div className="skill-card">CSS</div>
          <div className="skill-card">JavaScript</div>
          <div className="skill-card">React</div>
          <div className="skill-card">Node.js</div>
          <div className="skill-card">Express</div>
          <div className="skill-card">MongoDB</div>
          <div className="skill-card">Git & GitHub</div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2>Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <img src="https://via.placeholder.com/400x200" alt="Project 1" />
            <h3>Project One</h3>
            <p>Full Stack web application using MERN stack.</p>
            <a href="#" target="_blank">View Project</a>
          </div>
          <div className="project-card">
            <img src="https://via.placeholder.com/400x200" alt="Project 2" />
            <h3>Project Two</h3>
            <p>React frontend with Node.js backend API.</p>
            <a href="#" target="_blank">View Project</a>
          </div>
          <div className="project-card">
            <img src="https://via.placeholder.com/400x200" alt="Project 3" />
            <h3>Project Three</h3>
            <p>Responsive portfolio website with animations.</p>
            <a href="#" target="_blank">View Project</a>
          </div>
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
