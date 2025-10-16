import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Reuse App.css for styling

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-header">
          <h1>Success!</h1>
          <p>Your form has been submitted successfully.</p>
        </div>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              color: 'white',
            }}
          >
            ✓
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="login-btn"
          style={{ width: '100%' }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
