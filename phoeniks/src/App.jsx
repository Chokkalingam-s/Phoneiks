import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen.jsx";
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import VoiceAccessGuide from "./components/VoiceAccessGuide.jsx";
import Home from "./pages/Home.jsx";
import ApplyForUdid from "./pages/ApplyForUdid.jsx";
import ApplyUdidForm from "./pages/ApplyUdidForm.jsx";
import PwdLogin from "./pages/PwdLogin.jsx";
import PwdDashboard from "./pages/PwdDashboard.jsx";
import OrganisationLogin from "./pages/OrganisationLogin";
import OrganisationDashboard from "./pages/OrganisationDashboard";
import OrganisationContentUpload from "./pages/OrganisationContentUpload";
import MinistryLogin from "./pages/MinistryLogin"; 
import MinistryDashboard from "./pages/MinistryDashboard"; 


import { AppProvider, AppContext } from "./context/AppContext.jsx";
import { VoiceProvider } from "./components/VoiceContext.jsx";

// Wrapper to access location and AppContext
const MainApp = () => {
  const location = useLocation();
  const { zoom } = useContext(AppContext);

  // Render VoiceAccessGuide only on home page "/"
  const showVoiceGuide = location.pathname === "/";

  const zoomStyle = {
    transform: `scale(${zoom})`,
    transformOrigin: "top left",
    width: `${100 / zoom}%`,
  };

  return (
    <VoiceProvider>
      <div style={zoomStyle}>
        {showVoiceGuide && <VoiceAccessGuide />}
        <NavBar />
        <main style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/apply-for-udid" element={<ApplyForUdid />} />
            <Route path="/apply-udid-form" element={<ApplyUdidForm />} />
            <Route path="/pwd-login" element={<PwdLogin />} />
            <Route path="/pwd-dashboard" element={<PwdDashboard />} />
            <Route path="/organisation-login" element={<OrganisationLogin />} />
            <Route path="/org-dashboard" element={<OrganisationDashboard />} />
            <Route path="/organisation-forum" element={<OrganisationContentUpload />} />
            <Route path="/ministry-login" element={<MinistryLogin />} />
          <Route path="/ministry-dashboard" element={<MinistryDashboard />} />

        </Routes>
        </main>
        <Footer />
      </div>
    </VoiceProvider>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  // Hide splash when finished
  const handleSplashFinish = () => setLoading(false);

  return (
    <AppProvider>
      <>
        {loading && <SplashScreen onFinish={handleSplashFinish} />}
        {!loading && (
          <BrowserRouter>
            <MainApp />
          </BrowserRouter>
        )}
      </>
    </AppProvider>
  );
};

export default App;
