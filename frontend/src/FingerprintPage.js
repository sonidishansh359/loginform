import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FingerprintPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formId = location.state?.formId;

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!formId) {
      alert("Form ID not found");
      navigate("/form");
    }
  }, [formId, navigate]);

  const handleFingerprintLogin = () => {
    if (isScanning || scanned) return;

    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanned(true);

          // Auto navigate after short delay
          setTimeout(() => {
            navigate("/success", { state: { formId } });
          }, 800);
        }
        return prev + 10;
      });
    }, 200); // progress update every 200ms
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

        {/* Progress bar */}
        {isScanning && (
          <div style={{ marginTop: 20, width: "100%", maxWidth: 200, margin: "20px auto" }}>
            <div
              style={{
                width: "100%",
                height: 10,
                backgroundColor: "#e0e0e0",
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${scanProgress}%`,
                  height: "100%",
                  backgroundColor: "#4caf50",
                  transition: "width 0.2s",
                }}
              />
            </div>
            <p style={{ marginTop: 5, fontSize: 14, color: "#666" }}>{scanProgress}%</p>
          </div>
        )}
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

      {/* Note */}
      <div style={{ marginTop: 18, color: "#999", fontSize: 13 }}>
        <div>Note: This is a simulated fingerprint scan for demo purposes.</div>
        <div>No backend verification or passkey is required.</div>
      </div>
    </div>
  );
}

export default FingerprintPage;
