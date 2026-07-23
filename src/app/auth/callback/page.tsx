"use client";

import { useEffect, useState } from "react";

const FALLBACK = "zuva://auth-callback?error=missing_fragment";

export default function AuthCallbackPage() {
  const [target, setTarget] = useState(FALLBACK);

  useEffect(() => {
    const qs = window.location.hash.slice(1);
    const t = qs ? `zuva://auth-callback?${qs}` : FALLBACK;
    setTarget(t);
    window.location.replace(t);
  }, []);

  return (
    <main
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", padding: 32, maxWidth: 340 }}>
        <h1 style={{ fontSize: 22, margin: "0 0 8px" }}>Almost there&hellip;</h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 15,
            lineHeight: 1.5,
          }}
        >
          Returning you to the Zuva Network app.
        </p>
        <a
          href={target}
          style={{
            display: "inline-block",
            margin: "20px 0 14px",
            padding: "14px 28px",
            background: "#ffc107",
            color: "#000",
            borderRadius: 12,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Open Zuva Network
        </a>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          If nothing happens, tap the button above. Still stuck? Make sure the
          Zuva Network app is installed, then try signing in again.
        </p>
      </div>
    </main>
  );
}