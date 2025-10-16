import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FingerprintPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formId = location.state?.formId; // optional, for passing to next page

  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState("");

  const handleFingerprintLogin = () => {
    setError("");
    setIsScanning(true);
    setScanned(false);

    // simulate fingerprint scanning (2 sec)
    setTimeout(() => {
      setIsScanning(false);
      setScanned(true);

      // auto navigate after short delay
      setTimeout(() => {
        navigate("/success", { state: { formId } });
      }, 800);
    }, 2000);
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

      {/* Scan button */}
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

      {/* Error message */}
      {error && (
        <div style={{ marginTop: 18, color: "#c62828" }}>
          <small>{error}</small>
        </div>
      )}

      {/* Note */}
      <div style={{ marginTop: 18, color: "#999", fontSize: 13 }}>
        <div>Note: This is a simulated fingerprint scan for demo purposes.</div>
        <div>No backend verification or passkey is required.</div>
      </div>
    </div>
  );
}

export default FingerprintPage;
