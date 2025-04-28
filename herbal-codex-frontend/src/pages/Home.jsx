import React from "react";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        🌿 Welcome to Herbal Codex 🌿
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "1.5rem",
          marginBottom: "2rem",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          animation: "fadeIn 3s ease-in-out",
        }}
      >
        Discover the healing world of plants!
      </p>

      {/* Button */}
      <button
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#4caf50",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
        }}
      >
        Start Exploring
      </button>

      {/* Floating Animation */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "150px",
          height: "150px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
        }}
      ></div>

      {/* Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: "1rem",
          fontSize: "0.9rem",
          color: "#fff",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        © 2025 The Herbal Codex
      </footer>

      {/* Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
