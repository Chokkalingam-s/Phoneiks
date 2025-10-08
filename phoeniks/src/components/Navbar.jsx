import React, { useContext } from "react";
import logo from "../assets/logo.png";
import {
  FaHome,
  FaUserCircle,
  FaBuilding,
  FaSchool,
  FaPeace,
  FaSearch,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext.jsx";
import translations from "../NavbarContentTranslations";

export default function Navbar() {
  const { language, setLanguage, zoomIn, zoomOut } = useContext(AppContext);
  const t = translations[language] || translations.en;

  // Create links array with icons mapped to translations.links texts
  // Since mainLinks array text is replaced by translations, recreate with icons and translated texts
  const mainLinks = [
    { text: t.links[0], icon: <FaHome />, href: "/apply-for-udid" },
    { text: t.links[1], href: "#" },
    { text: t.links[2], href: "/pwd-login" },
    { text: t.links[3], href: "#" },
    { text: t.links[4], href: "#" },
    { text: t.links[5], href: "#" },
    { text: t.links[6], href: "#" },
    { text: t.links[7], href: "#" },
    { text: t.links[8], href: "#" },
  ];

  return (
    <header className="phoeniks-navbar">
      {/* Top utility bar (desktop only) */}
      <div className="utility-bar d-none d-md-flex justify-content-between align-items-center px-3 py-1">
        <span>{t.screenReaderAccess}</span>
        <span>
          <button
            aria-label="Zoom In"
            onClick={zoomIn}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
          >
            T+
          </button>{" "}
          <button
            aria-label="Zoom Out"
            onClick={zoomOut}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
          >
            T-
          </button>{" "}
          ● ○{" "}
<select
  aria-label="Select Language"
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  style={{
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    color: "#333",
    cursor: "pointer",
    fontWeight: "bold",
    padding: "6px 12px",
    fontSize: "1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "border-color 0.3s ease",
  }}
  onFocus={(e) => (e.target.style.borderColor = "#FF7A00")}
  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
>
{["en", "hi", "ta", "ml", "te", "bn", "mr", "gu", "ur"].map((code) => (
  <option key={code} value={code}>
    {code === "en"
      ? "English"
      : code === "hi"
      ? "Hindi"
      : code === "ta"
      ? "Tamil"
      : code === "ml"
      ? "Malayalam"
      : code === "te"
      ? "Telugu"
      : code === "bn"
      ? "Bengali"
      : code === "mr"
      ? "Marathi"
      : code === "gu"
      ? "Gujarati"
      : "Urdu"}
  </option>
))}

</select>

        </span>
      </div>

      {/* Branding bar */}
      <div
        className="mainbar py-2 px-2 px-md-4 d-flex align-items-center justify-content-between"
        style={{ background: "#fff" }}
      >
        <a
          href="/home"
          style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
        >
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="Phoeniks Logo"
              style={{ height: 56, width: 56, marginRight: 12 }}
            />
            <div>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "2rem",
                  fontFamily: "Poppins, Inter, Nunito, Arial, sans-serif",
                  color: "#FF7A00",
                }}
              >
                Phoeniks
              </span>
              <br />
              <span style={{ fontSize: 15, color: "#333" }}>
                Empowering Every Ability
              </span>
            </div>
          </div>
        </a>
        <div className="d-flex align-items-center">
          <a
            href="/pwd-login"
            className="btn btn-link text-decoration-none text-orange d-flex align-items-center me-2"
          >
            <FaUserCircle />
            <span className="ms-1">{t.pwdLogin}</span>
          </a>
          <a
            href="/ministry-login"
            className="btn btn-link text-decoration-none text-orange d-flex align-items-center me-2"
          >
            <FaBuilding />
            <span className="ms-1">{t.ministryLogin}</span>
          </a>
          <a
            href="/organisation-login"
            className="btn btn-link text-decoration-none text-orange d-flex align-items-center"
          >
            <FaSchool />
            <span className="ms-1">{t.organisationLogin}</span>
          </a>
          <a
            href="/ngo-login"
            className="btn btn-link text-decoration-none text-orange d-flex align-items-center"
          >
            <FaPeace />
            <span className="ms-1">{t.ngoLogin}</span>
          </a>
          <span className="d-none d-md-flex align-items-center ms-3">
            <FaSearch size={24} color="#333" />
          </span>
        </div>
      </div>

      {/* Section links bar */}
      <nav className="sectionnav">
        <div className="container-fluid d-flex flex-wrap align-items-center px-2 py-2">
          {mainLinks.map((nav, idx) => (
            <a
              key={idx}
              href={nav.href}
              className="nav-link px-3 py-1 d-flex align-items-center text-white"
              style={{
                fontSize: "1.05rem",
                fontWeight: 500,
                minWidth: idx === 0 ? 155 : 115,
                borderRight: idx < mainLinks.length - 1 ? "1px solid rgba(255,255,255,0.18)" : "none",
                textDecoration: "none",
              }}
            >
              {nav.icon && <span className="me-2">{nav.icon}</span>}
              {nav.text}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
