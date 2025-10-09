import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVoice } from "../components/VoiceContext";

export default function ApplyForUdid() {
  const navigate = useNavigate();
  const { voiceEnabled, chosenLang, speak, registerActionCallback, unregisterActionCallback } = useVoice();
  const hasReadContent = useRef(false);
  const proceedButtonRef = useRef(null);

  const pageContent = {
    en: {
      text: "Welcome to UDID application page. UDID stands for Unique Disability Identity Card. It is a document issued to Persons with Disabilities in India. The UDID card serves as a single document for identification and verification of disabilities across the country. Benefits include access to various government schemes, reservations in education and employment, and easy portability of disability certificate across India. Say proceed to continue to the registration form.",
    },
    hi: {
      text: "यूडीआईडी आवेदन पृष्ठ पर आपका स्वागत है। यूडीआईडी का मतलब यूनिक डिसेबिलिटी आइडेंटिटी कार्ड है। यह भारत में दिव्यांग व्यक्तियों को जारी किया जाने वाला दस्तावेज है। यूडीआईडी कार्ड पूरे देश में विकलांगता की पहचान और सत्यापन के लिए एकल दस्तावेज के रूप में कार्य करता है। लाभों में विभिन्न सरकारी योजनाओं तक पहुंच, शिक्षा और रोजगार में आरक्षण, और भारत भर में विकलांगता प्रमाणपत्र की आसान पोर्टेबिलिटी शामिल है। पंजीकरण फॉर्म पर जाने के लिए आगे बढ़ें कहें।",
    },
  };

  useEffect(() => {
    // Register voice command callback for "proceed"
    if (voiceEnabled) {
      registerActionCallback(handleVoiceCommand);
      
      // Read page content after a delay to ensure navigation audio is complete
      if (!hasReadContent.current) {
        hasReadContent.current = true;
        const delay = setTimeout(() => {
          readPageContent();
        }, 1500); // Wait 1.5 seconds after page load
        
        return () => clearTimeout(delay);
      }
    }

    // Cleanup
    return () => {
      unregisterActionCallback();
    };
  }, [voiceEnabled]);

  async function readPageContent() {
    if (!voiceEnabled) return;
    
    console.log("📖 Reading page content aloud");
    const content = pageContent[chosenLang];
    
    await speak(content.text);
    console.log("✅ Page content reading complete");
  }

  function handleVoiceCommand(transcript) {
    console.log("🎤 Checking for proceed command:", transcript);
    
    // Check for "proceed" in English or Hindi
    if (/proceed|आगे बढ़ें|aage badhe|aage badhein|aage/i.test(transcript)) {
      console.log("✅ PROCEED command detected!");
      handleProceed();
      return true; // Command handled
    }
    
    return false; // Command not handled
  }

  async function handleProceed() {
    console.log("🚀 Proceeding to registration");
    
    const msg = chosenLang === "hi" 
      ? "पंजीकरण फॉर्म पर जा रहे हैं" 
      : "Proceeding to registration form";
    
    await speak(msg);
    
    // Navigate to form
    setTimeout(() => {
      navigate("/apply-udid-form");
    }, 500);
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h1 className="text-center mb-4" style={{ color: "#FF7A00" }}>
                {chosenLang === "hi" ? "यूडीआईडी के लिए आवेदन करें" : "Apply for UDID"}
              </h1>
              
              <div className="main-content mb-4">
                <h3 className="mb-3">
                  {chosenLang === "hi" ? "यूडीआईडी क्या है?" : "What is UDID?"}
                </h3>
                <p className="lead">
                  {chosenLang === "hi" 
                    ? "यूडीआईडी का मतलब यूनिक डिसेबिलिटी आइडेंटिटी कार्ड है। यह भारत में दिव्यांग व्यक्तियों को जारी किया जाने वाला दस्तावेज है। यूडीआईडी कार्ड पूरे देश में विकलांगता की पहचान और सत्यापन के लिए एकल दस्तावेज के रूप में कार्य करता है।"
                    : "UDID stands for Unique Disability Identity Card. It is a document issued to Persons with Disabilities in India. The UDID card serves as a single document for identification and verification of disabilities across the country."
                  }
                </p>
                
                <h3 className="mb-3 mt-4">
                  {chosenLang === "hi" ? "लाभ" : "Benefits"}
                </h3>
                <p className="lead">
                  {chosenLang === "hi"
                    ? "लाभों में विभिन्न सरकारी योजनाओं तक पहुंच, शिक्षा और रोजगार में आरक्षण, और भारत भर में विकलांगता प्रमाणपत्र की आसान पोर्टेबिलिटी शामिल है।"
                    : "Benefits include access to various government schemes, reservations in education and employment, and easy portability of disability certificate across India."
                  }
                </p>
              </div>

              <div className="alert alert-info" role="alert">
                <i className="bi bi-info-circle me-2"></i>
                {chosenLang === "hi" 
                  ? "जारी रखने के लिए 'आगे बढ़ें' कहें या नीचे दिए गए बटन पर क्लिक करें।"
                  : "Say 'proceed' or click the button below to continue."
                }
              </div>

              <div className="text-center mt-4">
                <button
                  ref={proceedButtonRef}
                  onClick={handleProceed}
                  className="btn btn-lg btn-warning"
                  style={{
                    borderRadius: 16,
                    minWidth: 200,
                    color: "#fff",
                    background: "linear-gradient(90deg,#FF9900 0%,#FF7A00 100%)",
                    fontWeight: 600,
                    fontSize: "1.2rem",
                  }}
                >
                  {chosenLang === "hi" ? "पंजीकरण के लिए आगे बढ़ें" : "Proceed to Registration"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
