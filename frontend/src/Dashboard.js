import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Make sure to update CSS accordingly

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  // Highlight navbar active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "registration", "process", "contact"];
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
    <div className="dashboard government-portfolio">
      {/* Navbar */}
      <nav className="navbar gov-navbar">
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/2560px-Flag_of_India.svg.png" alt="Government of India" className="gov-logo" />
          Government of India
        </div>
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {["home", "registration", "process", "contact"].map((sec) => (
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

      {/* Hero Section */}
      <section
        id="home"
        className="hero-section gov-hero"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/2560px-Flag_of_India.svg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content gov-hero-content">
            <h1>Welcome to the Government of India Portal</h1>
            <p>Access official government services and information securely.</p>
            <button className="next-btn" onClick={() => scrollToSection("registration")}>
              Start Registration →
            </button>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="registration-section">
        <h2>User Registration</h2>
        <p>Fill in your personal details to proceed.</p>
        <div className="registration-cards">
          <div className="card">
            <h3>Step 1</h3>
            <p>Provide Name, Email, and Phone Number</p>
          </div>
          <div className="card">
            <h3>Step 2</h3>
            <p>Upload Aadhaar or Government ID</p>
          </div>
          <div className="card">
            <h3>Step 3</h3>
            <p>Submit Form for Verification</p>
          </div>
        </div>
        <button
          className="next-btn registration-next-btn"
          onClick={() => navigate("/form")}
        >
          Proceed to Form →
        </button>
      </section>

      {/* Process Section */}
      <section id="process" className="process-section">
        <h2>How It Works</h2>
        <ol className="process-list">
          <li>Fill personal details</li>
          <li>Upload valid government ID</li>
          <li>System verifies identity via OCR & official checks</li>
          <li>Receive confirmation & access official services</li>
        </ol>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section gov-contact">
        <h2>Contact Us</h2>
        <form className="contact-form gov-contact-form">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <textarea placeholder="Message / Query"></textarea>
          <button type="submit" className="next-btn">
            Submit Query
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer gov-footer">
        <p>&copy; {new Date().getFullYear()} Government Registration Portal</p>
        <div className="social-links">
          <a href="https://www.pmindia.gov.in/en/">Official Site</a> |{" "}
          <a href="mailto:support@govportal.in">Email Support</a>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
