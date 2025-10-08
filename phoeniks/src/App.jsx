import React from "react";
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
