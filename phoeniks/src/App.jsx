import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen.jsx";
import NavBar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import VoiceAccessGuide from "./components/VoiceAccessGuide.jsx"; // <-- Import the new component

const App = () => {
  const [loading, setLoading] = useState(true);

  // Hide splash when finished
  const handleSplashFinish = () => setLoading(false);

  return (
    <>
      {loading && <SplashScreen onFinish={handleSplashFinish} />}
      {!loading && (
        <>
          {/* VoiceAccessGuide renders overlay and runs after splash, before content */}
          <VoiceAccessGuide />
          <NavBar />
          <Home />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
