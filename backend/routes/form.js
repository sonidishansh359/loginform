import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FingerprintPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formId = location.state?.formId;

  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
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
    setScanned(false);

    try {
      // Step 1: Get challenge from backend
      const challengeRes = await fetch(`https://your-backend-url.com/api/form/fingerprint-challenge/${formId}`);
      if (!challengeRes.ok) throw new Error("Failed to get challenge");
      const { challenge } = await challengeRes.json();

      // Step 2: Prompt WebAuthn (simulated)
      if (!window.PublicKeyCredential) {
        alert("Device does not support fingerprint login. Simulating scan...");
        // simulate scan
        await new Promise(res => setTimeout(res, 2000));
      } else {
        // Real device supported
        const assertion = await navigator.credentials.get({
          publicKey: {
            challenge: Uint8Array.from(atob(challenge), c => c.charCodeAt(0)),
            timeout: 60000,
            userVerification: "required"
          }
        });
        // You can send `assertion` to backend if desired
      }

      // Step 3: Verify fingerprint with backend
      const verifyRes = await fetch(`https://your-backend-url.com/api/form/fingerprint-verify/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scanned: true })
      });
      const result = await verifyRes.json();
      if (verifyRes.ok) {
        setScanned(true);
        setIsScanning(false);
        alert(result.message || "Fingerprint verified!");
        navigate("/success");
      } else {
        throw new Error(result.error || "Verification failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Fingerprint scan failed");
      setIsScanning(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: 80 }}>
      <h1>Fingerprint Verification</h1>
      <p style={{ color: "#666" }}>
        Place your finger on the device sensor and tap the button below.
      </p>

      <div style={{ margin: "30px auto", width: 180 }}>
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: scanned ? "#4caf50" : isScanning ? "#ffd54f" : "#f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            boxShadow: scanned
              ? "0 6px 18px rgba(76,175,80,0.35)"
              : "0 6px 18px rgba(0,0,0,0.08)",
            transition: "all 300ms ease",
            fontSize: 64,
            color: scanned ? "#fff" : "#666",
          }}
        >
          {scanned ? "✔️" : isScanning ? "🔒" : "👆"}
        </div>
        <p style={{ marginTop: 12, color: scanned ? "#2e7d32" : "#666" }}>
          {scanned ? "Fingerprint scanned" : isScanning ? "Scanning..." : "Ready to scan"}
        </p>
      </div>

      <button
        onClick={handleFingerprintLogin}
        disabled={isScanning || scanned}
        style={{
          padding: "12px 25px",
          fontSize: 16,
          borderRadius: 8,
          border: "none",
          cursor: isScanning || scanned ? "not-allowed" : "pointer",
          background: "#1976d2",
          color: "#fff",
          marginTop: 20,
        }}
      >
        {isScanning ? "Scanning..." : scanned ? "Scanned" : "Scan Fingerprint"}
      </button>

      {error && (
        <div style={{ marginTop: 18, color: "#c62828" }}>
          <small>{error}</small>
        </div>
      )}
    </div>
  );
}

export default FingerprintPage;
