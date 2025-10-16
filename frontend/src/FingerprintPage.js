import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FingerprintPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "demoUser"; // user identifier

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  const handleFingerprintLogin = async () => {
    setError("");
    setIsScanning(true);

    try {
      // Step 1: Get login challenge from backend
      const challengeRes = await fetch(`https://your-backend-url.com/api/login/${username}`);
      if (!challengeRes.ok) throw new Error("Failed to get login challenge");
      const options = await challengeRes.json();

      // Convert challenge to Uint8Array (required by WebAuthn)
      const publicKey = {
        ...options,
        challenge: Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0)),
        allowCredentials: options.allowCredentials?.map(cred => ({
          ...cred,
          id: Uint8Array.from(atob(cred.id), c => c.charCodeAt(0))
        }))
      };

      // Step 2: Prompt fingerprint scan on device
      const assertion = await navigator.credentials.get({ publicKey });

      // Step 3: Send assertion to backend for verification
      const verifyRes = await fetch(`https://your-backend-url.com/api/verify-login/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assertion)
      });

      const result = await verifyRes.json();
      if (verifyRes.ok) {
        alert(result.message || "Login successful");
        navigate("/success");
      } else {
        throw new Error(result.error || "Fingerprint verification failed");
      }
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
