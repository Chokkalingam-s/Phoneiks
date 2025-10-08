import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen.jsx";
import NavBar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  // Hide splash when finished
  const handleSplashFinish = () => setLoading(false);

  return (
    <>
      {loading && <SplashScreen onFinish={handleSplashFinish} />}
      {!loading && (
        <>
          <NavBar />
          <Home />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
