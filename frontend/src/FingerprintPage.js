import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css'; // Reuse App.css for styling

function FingerprintPage() {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formId = location.state?.formId; // Get formId from navigation state

  const handleScan = async () => {
    if (!formId) {
      alert('Form ID not found. Please try again.');
      navigate('/form');
      return;
    }

    setIsScanning(true);
    try {
      const response = await fetch(`https://loginform-okk7.onrender.com/api/form/fingerprint/${formId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        alert('Fingerprint captured successfully!');
        navigate('/success');
      } else {
        alert(data.error || 'Error capturing fingerprint');
      }
    } catch (error) {
      console.error('Error capturing fingerprint:', error);
      alert('Error capturing fingerprint: ' + error.message);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-header">
          <h1>Fingerprint Verification</h1>
          <p>Please place your finger on the scanner</p>
        </div>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              backgroundColor: '#f0f0f0',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              color: '#666',
            }}
          >
            👆
          </div>
          <p style={{ marginTop: '10px', color: '#666' }}>Fingerprint Scanner</p>
        </div>
        <button
          onClick={handleScan}
          className="login-btn"
          disabled={isScanning}
          style={{ width: '100%' }}
        >
          {isScanning ? 'Scanning...' : 'Scan Fingerprint'}
        </button>
      </div>
    </div>
  );
}

export default FingerprintPage;
