import React, { useEffect, useState, useRef } from "react";

const messages = {
  en: {
    combined:
      "Welcome to Phoeniks. For voice Guidance Say 'Enable Voice aid' or click 'Enable button'.",
    enabled:
      "Voice guidance activated. This website is developed for specially abled individuals across India. Apply UDID if not registered yet.",
    selectLang: "Please select your preferred language for voice guidance.",
  },
  hi: {
    combined:
      "फीनिक्स में आपका स्वागत है। वॉइस गाइड के लिए कहें 'आवाज़ सक्षम करें' या 'सक्रिय करें' बटन दबाएं।",
    enabled:
      "वॉइस गाइडेंस सक्रिय कर दी गई है। यह वेबसाइट भारत भर के दिव्यांग व्यक्तियों के लिए विकसित की गई है। यदि अभी तक पंजीकरण नहीं किया है तो यूडीआईडी के लिए आवेदन करें।",
    selectLang: "कृपया अपनी पसंदीदा भाषा चुनें।",
  },
};

function speak(msg, lang = "en-IN", cb) {
  window.speechSynthesis.cancel();
  const utter = new window.SpeechSynthesisUtterance(msg);
  utter.lang = lang;
  utter.rate = 0.9; // Slightly slower for clarity
  utter.pitch = 1.0;
  utter.volume = 1.0;
  utter.onend = cb;
  window.speechSynthesis.speak(utter);
}

function getLangCode(s) {
  s = s.toLowerCase();
  if (/aawaaz|saksham|आवाज़|आवाज|hindi/.test(s)) return "hi";
  return "en";
}

export default function VoiceAccessGuide() {
  const [permissionAsked, setPermissionAsked] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showLangChoice, setShowLangChoice] = useState(false);
  const [chosenLang, setChosenLang] = useState("en");
  const [status, setStatus] = useState("ask-guidance");
  const recognitionRef = useRef(null);
  const restartTimeoutRef = useRef(null);

  useEffect(() => {
    if (permissionAsked) return;
    
    if (navigator.mediaDevices && window.SpeechSynthesis) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          setPermissionAsked(true);
          sequenceWelcome();
        })
        .catch(() => {
          setPermissionAsked(true);
          sequenceWelcome();
        });
    } else {
      setPermissionAsked(true);
      sequenceWelcome();
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line
  }, []);

  function sequenceWelcome() {
    // Speak welcome messages while showing "Enable Voice Guidance?" overlay
    speak(messages.en.combined, "en-IN", () => {
      speak(messages.hi.combined, "hi-IN", () => {
        startRecognition();
      });
    });
  }

  function startRecognition() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window))
      return;
      
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    
    // Improved recognition settings
    recog.continuous = true;
    recog.interimResults = true; // Changed to true for better capture
    recog.maxAlternatives = 3; // Get multiple alternatives
    recog.lang = "en-IN";

    recog.onresult = function (event) {
      // Process all results including interim
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.trim().toLowerCase();
        
        console.log("Captured:", transcript); // Debug log
        
        // Expanded command detection with more variations
        const enableCmdRegex = /(enable|aawaaz|आवाज़|आवाज|saksham|सक्षम|voice|aid|guidance|chalu|चालू|karein|करें)/i;
        
        if (enableCmdRegex.test(transcript)) {
          const lang = getLangCode(transcript);
          onEnableVoice(lang);
          break;
        }
      }
    };

    recog.onaudiostart = function() {
      console.log("Audio capturing started");
    };

    recog.onsoundstart = function() {
      console.log("Sound detected");
    };

    recog.onspeechstart = function() {
      console.log("Speech detected");
    };

    recog.onerror = function (e) {
      console.log("Recognition error:", e.error);
      
      // Handle different error types
      if (e.error === "no-speech") {
        console.log("No speech detected, restarting...");
      }
      
      if (!voiceEnabled && status === "ask-guidance") {
        restartTimeoutRef.current = setTimeout(() => {
          try {
            recog.start();
          } catch (err) {
            console.log("Restart error:", err);
          }
        }, 1000);
      }
    };

    recog.onend = function () {
      console.log("Recognition ended");
      if (!voiceEnabled && status === "ask-guidance") {
        restartTimeoutRef.current = setTimeout(() => {
          try {
            recog.start();
          } catch (err) {
            console.log("Restart error:", err);
          }
        }, 500);
      }
    };

    try {
      recog.start();
      recognitionRef.current = recog;
      console.log("Recognition started");
    } catch (err) {
      console.log("Start error:", err);
    }
  }

  function onEnableVoice(lang = "en") {
    if (voiceEnabled) return;
    
    setVoiceEnabled(true);
    setChosenLang(lang);
    setStatus("enabled-announce");

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    window.speechSynthesis.cancel();
    
    // Speak enabled message WITHOUT showing overlay
    speak(messages[lang].enabled, lang + "-IN", () => {
      setStatus("enabled");
    });
  }

  function enableByClick() {
    setShowLangChoice(true);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  }

  function handleLangPick(lang) {
    setChosenLang(lang);
    setVoiceEnabled(true);
    setShowLangChoice(false);
    setStatus("enabled-announce");
    
    window.speechSynthesis.cancel();
    
    // Speak enabled message WITHOUT showing overlay
    speak(messages[lang].enabled, lang + "-IN", () => {
      setStatus("enabled");
    });
  }

  return (
    <div className="voice-guide">
      {/* Show overlay for ask-guidance and language choice, but NOT for enabled-announce */}
      {status === "ask-guidance" && !showLangChoice && (
        <div className="guide-overlay">
          <div className="guide-box text-center">
            <h2 style={{ color: "#FF7A00" }}>Enable Voice Guidance?</h2>
            <p>
              Allow a guided browsing experience for accessibility support.
              <br />
              <small style={{ color: "#333" }}>
                Say <b>'Enable Voice Aid'</b> or tap Enable below.
              </small>
            </p>
            <button
              onClick={enableByClick}
              className="btn btn-warning mt-2"
              style={{
                borderRadius: 16,
                minWidth: 120,
                color: "#fff",
                background: "linear-gradient(90deg,#FF9900 0%,#FF7A00 100%)",
                fontWeight: 600,
              }}
            >
              Enable
            </button>
            <button
              onClick={() => setStatus("no-guide")}
              className="btn btn-outline-secondary mt-2 ms-2"
              style={{ borderRadius: 16, minWidth: 110 }}
            >
              Not Now
            </button>
          </div>
        </div>
      )}

      {showLangChoice && (
        <div className="guide-overlay">
          <div className="guide-box">
            <h3 style={{ color: "#FF7A00" }}>Choose Language</h3>
            <p>Select a language for voice aid:</p>
            <div className="d-flex justify-content-center gap-2">
              <button
                className="btn btn-warning"
                style={{
                  borderRadius: 16,
                  minWidth: 100,
                  color: "#fff",
                  background: "linear-gradient(90deg,#FF9900 0%,#FF7A00 100%)",
                  fontWeight: 600,
                }}
                onClick={() => handleLangPick("en")}
              >
                English
              </button>
              <button
                className="btn btn-warning"
                style={{
                  borderRadius: 16,
                  minWidth: 100,
                  color: "#fff",
                  background: "linear-gradient(90deg,#FF9900 0%,#FF7A00 100%)",
                  fontWeight: 600,
                }}
                onClick={() => handleLangPick("hi")}
              >
                Hindi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NO overlay for enabled-announce - voice speaks in background */}
    </div>
  );
}
