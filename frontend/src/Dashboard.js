import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard({ username, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

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
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="menu-container">
            <button className="menu-toggle" onClick={toggleMenu}>
              <span className="menu-icon">☰</span>
              Menu
            </button>
            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                <li>
                  <button
                    className={activeSection === 'dashboard' ? 'active' : ''}
                    onClick={() => handleMenuClick('dashboard')}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className={activeSection === 'profile' ? 'active' : ''}
                    onClick={() => handleMenuClick('profile')}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className={activeSection === 'home' ? 'active' : ''}
                    onClick={() => handleMenuClick('home')}
                  >
                    Home
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeSection === 'dashboard' && (
          <section className="section dashboard-section">
            <div className="section-content">
              <div className="welcome-message">
                <h2>Welcome back, {username} 👋</h2>
                <p>Here's what's happening with your account today.</p>
              </div>
              <div className="dashboard-cards">
                <div className="card">
                  <div className="card-icon">📊</div>
                  <h3>Analytics</h3>
                  <p>View your data insights</p>
                  <button className="card-btn">View Data</button>
                </div>
                <div className="card">
                  <div className="card-icon">📝</div>
                  <h3>Forms</h3>
                  <p>Manage your submitted forms</p>
                  <button className="card-btn">View Forms</button>
                </div>
                <div className="card">
                  <div className="card-icon">⚙️</div>
                  <h3>Settings</h3>
                  <p>Customize your experience</p>
                  <button className="card-btn">Update Profile</button>
                </div>
              </div>
              <div className="activity-summary">
                <h3>Recent Activity</h3>
                <ul>
                  <li>Last login: Today at 10:30 AM</li>
                  <li>Form submitted: 2 days ago</li>
                  <li>Profile updated: 1 week ago</li>
                </ul>
              </div>
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
          </section>
        )}

        {activeSection === 'profile' && (
          <section className="section profile-section">
            <div className="section-content">
              <h2>User Profile</h2>
              <div className="profile-info">
                <div className="profile-avatar">
                  <span>{username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="profile-details">
                  <h3>{username}</h3>
                  <p>Full Stack Developer</p>
                  <p>Email: {username}@example.com</p>
                </div>
              </div>
              <div className="profile-actions">
                <button className="action-btn">Edit Profile</button>
                <button className="action-btn">Change Password</button>
                <button className="action-btn">Change Theme</button>
              </div>
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
          </section>
        )}

        {activeSection === 'home' && (
          <section className="section home-section">
            <div className="section-content">
              <h2>Hello, {username}!</h2>
              <p>Welcome to your personal space. Here you can fill forms and view your data.</p>
              <div className="home-actions">
                <button className="action-btn">Fill New Form</button>
                <button className="action-btn">View Submitted Data</button>
              </div>
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
