import React from "react";
import logo from "../assets/logo.png";
import { FaHome, FaUserCircle, FaUsers, FaSearch } from "react-icons/fa";

const mainLinks = [
  { text: "Apply For UDID", icon: <FaHome />, href: "/apply-for-udid" },
  { text: "Track Your Application", href: "#" },
  { text: "PwD login", href: "/pwd-login"},
  { text: "Aggregated-Data", href: "#" },
  { text: "Pendency-Report", href: "#" },
  { text: "Statewise-Report", href: "#" },
  { text: "Media", href: "#" },
  { text: "FAQs", href: "#" },
  { text: "Contact Us", href: "#" },
];

export default function Navbar() {
  return (
    <header className="phoeniks-navbar">
      {/* Top utility bar (desktop only) */}
      <div className="utility-bar d-none d-md-flex justify-content-between align-items-center px-3 py-1">
        <span>Home | Sitemap</span>
        <span>Skip to Main Content | Screen Reader Access | T+ T- ● ○ English ▼</span>
      </div>

      {/* Branding bar */}
      <div className="mainbar py-2 px-2 px-md-4 d-flex align-items-center justify-content-between" style={{background:'#fff'}}>
        <div className="d-flex align-items-center">
          <img src={logo} alt="Phoeniks Logo" style={{height:56, width:56, marginRight:12}} />
          <div>
            <span style={{
              fontWeight:'bold',
              fontSize:'2rem',
              fontFamily:'Poppins, Inter, Nunito, Arial, sans-serif',
              color:'#FF7A00'
            }}>Phoeniks</span>
            <br />
            <span style={{
              fontSize:15,
              color:'#333'
            }}>Empowering Every Ability</span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <a href="/pwd-login" className="btn btn-link text-decoration-none text-orange d-flex align-items-center me-2">
            <FaUserCircle /><span className="ms-1">PwD login</span>
          </a>
          <a href="#" className="btn btn-link text-decoration-none text-orange d-flex align-items-center">
            <FaUsers /><span className="ms-1">Department User Login</span>
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
                fontSize:'1.05rem',
                fontWeight: 500,
                minWidth: idx === 0 ? 155 : 115,
                borderRight: idx < mainLinks.length-1 ? "1px solid rgba(255,255,255,0.18)" : "none",
                textDecoration:'none'
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
