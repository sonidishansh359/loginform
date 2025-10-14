import React, { useEffect } from 'react';
import './Portfolio.css';

function Portfolio() {
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  return (
    <div className="portfolio">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Dishansh Soni</h1>
          <h2>Full Stack Developer</h2>
          <p>Passionate about creating innovative web solutions and user experiences.</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-secondary">Get In Touch</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>I'm a dedicated full-stack developer with over 5 years of experience in building scalable web applications. I specialize in React, Node.js, and cloud technologies.</p>
              <p>My passion lies in solving complex problems and creating intuitive user interfaces that make a difference.</p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>JavaScript</li>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>REST APIs</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <ul>
                <li>Git</li>
                <li>Docker</li>
                <li>AWS</li>
                <li>Jest</li>
                <li>Figma</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>E-Commerce Platform</h3>
              <p>A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.</p>
              <div className="project-tech">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
              </div>
              <div className="project-links">
                <a href="#" className="btn-small">Live Demo</a>
                <a href="#" className="btn-small">GitHub</a>
              </div>
            </div>
            <div className="project-card">
              <h3>Task Management App</h3>
              <p>A collaborative task management tool with real-time updates and team collaboration features.</p>
              <div className="project-tech">
                <span>Vue.js</span>
                <span>Express</span>
                <span>Socket.io</span>
              </div>
              <div className="project-links">
                <a href="#" className="btn-small">Live Demo</a>
                <a href="#" className="btn-small">GitHub</a>
              </div>
            </div>
            <div className="project-card">
              <h3>Weather Dashboard</h3>
              <p>An interactive weather application with location-based forecasts and beautiful data visualizations.</p>
              <div className="project-tech">
                <span>React</span>
                <span>Chart.js</span>
                <span>OpenWeather API</span>
              </div>
              <div className="project-links">
                <a href="#" className="btn-small">Live Demo</a>
                <a href="#" className="btn-small">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>I'm always interested in new opportunities and exciting projects. Let's connect!</p>
              <div className="contact-details">
                <p><strong>Email:</strong> john.doe@example.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Location:</strong> San Francisco, CA</p>
              </div>
              <div className="social-links">
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
