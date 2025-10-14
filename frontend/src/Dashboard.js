import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <div className="dashboard">
      {/* Header with Menu */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Creative Dashboard</h1>
          <div className="menu-container">
            <button className="menu-toggle" onClick={toggleMenu}>
              <span className="menu-icon">☰</span>
              Menu
            </button>
            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                <li>
                  <button
                    className={activeSection === 'home' ? 'active' : ''}
                    onClick={() => handleMenuClick('home')}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    className={activeSection === 'about' ? 'active' : ''}
                    onClick={() => handleMenuClick('about')}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    className={activeSection === 'contact' ? 'active' : ''}
                    onClick={() => handleMenuClick('contact')}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeSection === 'home' && (
          <section className="section home-section">
            <div className="section-content">
              <h2>Welcome to Your Dashboard</h2>
              <p>Explore the creative sections using the menu above.</p>
              <div className="home-cards">
                <div className="card">
                  <h3>Analytics</h3>
                  <p>View your data insights</p>
                </div>
                <div className="card">
                  <h3>Projects</h3>
                  <p>Manage your ongoing projects</p>
                </div>
                <div className="card">
                  <h3>Settings</h3>
                  <p>Customize your experience</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="section about-section">
            <div className="section-content">
              <h2>About This Dashboard</h2>
              <p>This is a creative and modern dashboard built with React.</p>
              <div className="about-features">
                <div className="feature">
                  <div className="feature-icon">🚀</div>
                  <h4>Fast & Responsive</h4>
                  <p>Built for speed and mobile-first design</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">🎨</div>
                  <h4>Creative Design</h4>
                  <p>Modern UI with smooth animations</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">⚡</div>
                  <h4>Interactive</h4>
                  <p>Engaging user interactions</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="section contact-section">
            <div className="section-content">
              <h2>Get In Touch</h2>
              <p>Have questions? We'd love to hear from you!</p>
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
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
