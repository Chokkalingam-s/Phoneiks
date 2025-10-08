import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen.jsx";
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import VoiceAccessGuide from "./components/VoiceAccessGuide.jsx";
import Home from "./pages/Home.jsx";
import ApplyForUdid from "./pages/ApplyForUdid.jsx";
import ApplyUdidForm from "./pages/ApplyUdidForm.jsx";
import PwdLogin from "./pages/PwdLogin.jsx";
import PwdDashboard from "./pages/PwdDashboard.jsx";


const App = () => {
  const [loading, setLoading] = useState(true);

  // Hide splash when finished
  const handleSplashFinish = () => setLoading(false);

  return (
    <>
      {loading && <SplashScreen onFinish={handleSplashFinish} />}
      {!loading && (
        <BrowserRouter>
          {/* VoiceAccessGuide renders overlay and runs after splash, before content */}
          <VoiceAccessGuide />
          <NavBar />
          <main style={{ minHeight: "80vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply-for-udid" element={<ApplyForUdid />} />
              <Route path="/apply-udid-form" element={<ApplyUdidForm />} />
              <Route path="/pwd-login" element={<PwdLogin />} />
              <Route path="/pwd-dashboard" element={<PwdDashboard />} />
              {/* Add more routes here if needed */}
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
