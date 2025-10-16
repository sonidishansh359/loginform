import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FingerprintPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formId = location.state?.formId;

  const handleFingerprintLogin = async () => {
    if (!window.PublicKeyCredential) {
      alert("Fingerprint login not supported on this device/browser");
      return;
    }

    try {
      // Step 1: Get challenge from backend
      const challengeRes = await fetch(`https://loginform-okk7.onrender.com/api/form/fingerprint-challenge/${formId}`);
      const challengeData = await challengeRes.json();

      // Step 2: User authenticates with fingerprint sensor
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: Uint8Array.from(atob(challengeData.challenge), c => c.charCodeAt(0)),
          timeout: 60000,
          userVerification: "required"
        }
      });

      // Step 3: Send assertion to backend
      const verifyRes = await fetch(`https://loginform-okk7.onrender.com/api/form/fingerprint-verify/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credential)
      });

      const result = await verifyRes.json();
      if (verifyRes.ok) {
        alert(result.message);
        navigate("/success");
      } else {
        alert(result.error || "Verification failed");
      }

    } catch (err) {
      console.error(err);
      alert("Fingerprint scan failed: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Fingerprint Verification</h1>
      <p>Place your finger on the device sensor and tap the button</p>
      <button onClick={handleFingerprintLogin} style={{ padding: "15px 25px", fontSize: "16px" }}>
        Scan Fingerprint
      </button>
    </div>
  );
}

export default FingerprintPage;
