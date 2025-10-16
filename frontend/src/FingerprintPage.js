import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FingerprintPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // optional formId if you need it elsewhere; not used for verification here
  const formId = location.state?.formId;

  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState("");

  const handleFingerprintLogin = async () => {
    setError("");
    // check support
    if (!window.PublicKeyCredential || !navigator.credentials) {
      setError("Fingerprint login not supported on this browser/device.");
      return;
    }

    setIsScanning(true);
    try {
      // Create a client-side random challenge (for demo only).
      // Production: challenge should come from server.
      const randomChallenge = new Uint8Array(32);
      window.crypto.getRandomValues(randomChallenge);

      const publicKey = {
        challenge: randomChallenge,
        timeout: 60000,
        userVerification: "required",
        // allowCredentials can be left undefined for a simple prompt
      };

      // This will open device biometric prompt (fingerprint/face) if available
      const credential = await navigator.credentials.get({ publicKey });

      // If no exception thrown, assume user completed biometric prompt successfully.
      // We are not verifying signature here — just showing success locally.
      console.log("Credential returned:", credential);

      setScanned(true);
      setIsScanning(false);

      // optional: show success then navigate
      setTimeout(() => {
        // navigate to success page or do next action
        navigate("/success", { state: { formId } });
      }, 900); // short delay so user sees success

    } catch (err) {
      console.error("Fingerprint scan failed:", err);
      setError(err.message || "Fingerprint scan failed or cancelled.");
      setIsScanning(false);
      setScanned(false);
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
            boxShadow: scanned ? "0 6px 18px rgba(76,175,80,0.35)" : "0 6px 18px rgba(0,0,0,0.08)",
            transition: "all 300ms ease",
            fontSize: 64,
            color: scanned ? "#fff" : "#666"
          }}
        >
          {scanned ? "✔️" : isScanning ? "🔒" : "👆"}
        </div>
        <p style={{ marginTop: 12, color: scanned ? "#2e7d32" : "#666" }}>
          {scanned ? "Fingerprint scanned" : isScanning ? "Place finger on sensor..." : "Ready to scan"}
        </p>
      </div>

      <button
        onClick={handleFingerprintLogin}
        disabled={isScanning}
        style={{
          padding: "12px 22px",
          fontSize: 16,
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          background: "#1976d2",
          color: "#fff"
        }}
      >
        {isScanning ? "Waiting..." : scanned ? "Scanned" : "Scan Fingerprint"}
      </button>

      {error && (
        <div style={{ marginTop: 18, color: "#c62828" }}>
          <small>{error}</small>
        </div>
      )}
      <div style={{ marginTop: 18, color: "#999", fontSize: 13 }}>
        <div>Note: Device must support WebAuthn and page served over HTTPS.</div>
        <div>On phones use Chrome/Edge for best support (iOS Safari support is limited).</div>
      </div>
    </div>
  );
}

export default FingerprintPage;
