"use client";

export default function CleanupButton() {
  async function runCleanup() {
    const res = await fetch(
      "http://localhost:3000/api/cleanup",
      {
        method: "POST",
      }
    );

    const data = await res.json();

    alert(data.message);

    window.location.reload();
  }

  return (
    <button
      onClick={runCleanup}
      style={{
        padding: "12px 20px",
        background: "#ff4d4d",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Run Cleanup
    </button>
  );
}