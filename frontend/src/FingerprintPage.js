import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FingerprintPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formId = location.state?.formId;

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!formId) {
      alert("Form ID not found");
      navigate("/form");
    }
  }, [formId, navigate]);

  const handleFingerprintLogin = async () => {
    setError("");
    setIsScanning(true);

    try {
      // Step 1: Get challenge from backend
      const challengeRes = await fetch(`https://loginform-okk7.onrender.com/api/form/fingerprint-challenge/${formId}`);
      if (!challengeRes.ok) throw new Error(`Failed to get challenge: ${challengeRes.status} ${challengeRes.statusText}`);
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
      if (!verifyRes.ok) throw new Error(`Verification failed: ${verifyRes.status} ${verifyRes.statusText}`);
      const result = await verifyRes.json();
      alert(result.message);
      navigate("/success");

    } catch (err) {
      console.error(err);
      setError(err.message || "Fingerprint scan failed");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: 80 }}>
      <h1>Fingerprint Verification</h1>
      <p style={{ color: "#666" }}>
        Place your finger on the device sensor and tap the button below.
      </p>

      {/* Fingerprint circle */}
      <div style={{ margin: "30px auto", width: 180 }}>
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: isScanning ? "#ffd54f" : "#f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "all 300ms ease",
            fontSize: 64,
            color: "#666",
          }}
        >
          {isScanning ? "🔒" : "👆"}
        </div>
        <p style={{ marginTop: 12, color: "#666" }}>
          {isScanning ? "Scanning..." : "Ready to scan"}
        </p>
      </div>

      {/* Scan button */}
      <button
        onClick={handleFingerprintLogin}
        disabled={isScanning}
        style={{
          padding: "12px 25px",
          fontSize: 16,
          borderRadius: 8,
          border: "none",
          cursor: isScanning ? "not-allowed" : "pointer",
          background: "#1976d2",
          color: "#fff",
          marginTop: 20,
        }}
      >
        {isScanning ? "Scanning..." : "Scan Fingerprint"}
      </button>

      {/* Error message */}
      {error && (
        <div style={{ marginTop: 18, color: "#c62828" }}>
          <small>{error}</small>
        </div>
      )}

      <div style={{ marginTop: 18, color: "#999", fontSize: 13 }}>
        <div>Note: Make sure this device has a registered WebAuthn credential.</div>
        <div>Works only on browsers supporting WebAuthn over HTTPS.</div>
      </div>
    </div>
  );
}

export default FingerprintPage;
