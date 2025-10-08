// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} Phoeniks — Inclusive Empowerment Portal</p>
        <p className="small text-secondary">
          Designed with ❤️ for Accessibility and Inclusion - Chokkalingam S & Yogesh Kannan S
        </p>
      </div>
    </footer>
  );
}
