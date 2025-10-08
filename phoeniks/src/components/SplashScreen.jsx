import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const SplashScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fade in immediately, stay for 2 seconds, then fade out
    const fadeTimeout = setTimeout(() => setVisible(false), 1800);
    // tell parent to unmount splash after transition
    const doneTimeout = setTimeout(() => onFinish(), 2300);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(doneTimeout);
    };
  }, [onFinish]);

  return (
    <div
      className={`splash-screen ${visible ? "splash-fade-in" : "splash-fade-out"}`}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        zIndex: 2000,
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      {/* Orange accent circle icon */}
      <div
        style={{
          width: 80,
          height: 80,
          background:
            "linear-gradient(135deg, #FF9900 0%, #FF7A00 100%)",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
          boxShadow: "0 4px 16px 0 #FF7A0022",
        }}
      >
        {/* Your logo or accessibility icon */}
        <img
          src={logo}
          alt="Phoeniks logo"
          style={{
            width: 48,
            height: 48,
            objectFit: "contain",
            filter: "drop-shadow(0px 2px 8px #FF7A0030)",
          }}
        />
      </div>
            <h1
        style={{
          color: "#FF7A00",
          fontWeight: 700,
          fontFamily: "'cambria', 'Inter', 'Nunito', Arial, sans-serif",
          fontSize: "3.5rem",
          marginBottom: 12,
          textAlign: "center",
          letterSpacing: "0.75px",
        }}
      >
        Phoeniks
      </h1>
      <h2
        style={{
          color: "#FF7A00",
          fontWeight: 700,
          fontFamily: "'Poppins', 'Inter', 'Nunito', Arial, sans-serif",
          fontSize: "1.5rem",
          marginBottom: 12,
          textAlign: "center",
          letterSpacing: "0.5px",
        }}
      >
        Empowering Every Ability
      </h2>
    </div>
  );
};

export default SplashScreen;
