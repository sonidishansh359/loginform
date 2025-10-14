import React, { useEffect, useState } from 'react';
import './Portfolio.css';

function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    const handleSmoothScroll = (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          setIsMenuOpen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleSmoothScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <div className="nav-container">
          <div className="logo">Dishansh Soni</div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Home</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
            <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-greeting">Hi, I'm</span>
              <span className="hero-name">Dishansh Soni</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Developer</h2>
            <p className="hero-description">
              Passionate about creating innovative web solutions and exceptional user experiences.
              I specialize in modern web technologies and love bringing ideas to life.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-avatar">
              <div className="avatar-placeholder">
                <span>DS</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll Down</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <div className="section-divider"></div>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a dedicated full-stack developer with over 5 years of experience in building
                scalable web applications. I specialize in React, Node.js, and cloud technologies,
                with a passion for creating intuitive and performant user interfaces.
              </p>
              <p>
                My journey in web development started with a curiosity about how websites work,
                and it has evolved into a career where I get to solve complex problems and
                create meaningful digital experiences every day.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Skills & Technologies</h2>
            <div className="section-divider"></div>
          </div>
          <div className="skills-grid">
            <div className="skill-category">
              <div className="category-icon">💻</div>
              <h3>Frontend</h3>
              <div className="skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Next.js</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="category-icon">⚙️</div>
              <h3>Backend</h3>
              <div className="skill-tags">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">GraphQL</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="category-icon">🛠️</div>
              <h3>Tools & Others</h3>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Jest</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Webpack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider"></div>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <span>E-Commerce</span>
                </div>
              </div>
              <div className="project-content">
                <h3>E-Commerce Platform</h3>
                <p>
                  A full-stack e-commerce solution with payment integration, user authentication,
                  and admin dashboard. Built with React, Node.js, and MongoDB.
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>Stripe</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn btn-small">Live Demo</a>
                  <a href="#" className="btn btn-small btn-outline">GitHub</a>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <span>Task Manager</span>
                </div>
              </div>
              <div className="project-content">
                <h3>Task Management App</h3>
                <p>
                  A collaborative task management tool with real-time updates and team
                  collaboration features. Features drag-and-drop functionality and notifications.
                </p>
                <div className="project-tech">
                  <span>Vue.js</span>
                  <span>Express</span>
                  <span>Socket.io</span>
                  <span>PostgreSQL</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn btn-small">Live Demo</a>
                  <a href="#" className="btn btn-small btn-outline">GitHub</a>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <span>Weather App</span>
                </div>
              </div>
              <div className="project-content">
                <h3>Weather Dashboard</h3>
                <p>
                  An interactive weather application with location-based forecasts and beautiful
                  data visualizations. Includes weather maps and historical data.
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Chart.js</span>
                  <span>OpenWeather API</span>
                  <span>Mapbox</span>
                </div>
                <div className="project-links">
                  <a href="#" className="btn btn-small">Live Demo</a>
                  <a href="#" className="btn btn-small btn-outline">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-divider"></div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Work Together</h3>
              <p>
                I'm always interested in new opportunities and exciting projects.
                Whether you have a project in mind or just want to chat about technology,
                feel free to reach out!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">dishansh@example.com</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">+91 98765 43210</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <div className="contact-label">Location</div>
                    <div className="contact-value">Ahmedabad, Gujarat</div>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Instagram</a>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="6" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">Dishansh Soni</div>
            <div className="footer-links">
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-social">
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Dishansh Soni. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
