import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css'; // Reuse App.css for styling

function FingerprintPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const formId = location.state?.formId; // Get formId from navigation state

  useEffect(() => {
    if (!formId) {
      alert('Form ID not found. Please try again.');
      navigate('/form');
      return;
    }

    // Simulate automatic detection after 2 seconds
    const detectionTimer = setTimeout(() => {
      setIsScanning(true);
      // Simulate scanning progress
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            handleScan();
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }, 2000);

    return () => clearTimeout(detectionTimer);
  }, [formId, navigate]);

  const handleScan = async () => {
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
        setIsScanning(false);
        setScanProgress(0);
      }
    } catch (error) {
      console.error('Error capturing fingerprint:', error);
      alert('Error capturing fingerprint: ' + error.message);
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-header">
          <h1>Fingerprint Verification</h1>
          <p>{isScanning ? 'Scanning your fingerprint...' : 'Please place your finger on the scanner'}</p>
        </div>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              backgroundColor: isScanning ? '#4CAF50' : '#f0f0f0',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              color: isScanning ? 'white' : '#666',
              transition: 'background-color 0.3s',
            }}
          >
            {isScanning ? '🔍' : '👆'}
          </div>
          <p style={{ marginTop: '10px', color: '#666' }}>Fingerprint Scanner</p>
          {isScanning && (
            <div style={{ marginTop: '20px' }}>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '5px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${scanProgress}%`,
                    height: '100%',
                    backgroundColor: '#4CAF50',
                    transition: 'width 0.2s',
                  }}
                />
              </div>
              <p style={{ marginTop: '5px', fontSize: '14px' }}>{scanProgress}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FingerprintPage;
