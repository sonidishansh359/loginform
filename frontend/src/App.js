import React, { useState } from 'react';
import Portfolio from './Portfolio';
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
    return <Portfolio />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{isSignup ? 'Signup' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
        </form>
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : 'Need an account? Signup'}
        </button>
      </header>
    </div>
  );
}

export default App;
