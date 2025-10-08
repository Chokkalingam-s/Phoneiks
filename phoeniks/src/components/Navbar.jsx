import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand href="/">
          <img
            src={logo}
            height="36"
            className="d-inline-block align-top me-2"
            alt="Phoeniks Logo"
          />
          Phoeniks
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
            <Nav.Link href="#">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
