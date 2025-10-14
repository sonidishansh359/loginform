import React, { useState } from 'react';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    try {
      const response = await fetch(`https://loginform-okk7.onrender.com${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        if (isSignup) {
          alert('Signup successful! Please login.');
          setIsSignup(false);
        } else {
          setIsLoggedIn(true);
        }
        setFormData({ username: '', password: '' });
      } else {
        alert(data.error || 'Error');
      }
    } catch (error) {
      alert('Error');
    }
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-header">
          <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
          <p>{isSignup ? 'Sign up to get started' : 'Sign in to your account'}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Username</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" className="login-btn">
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        <button className="toggle-btn" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default App;
