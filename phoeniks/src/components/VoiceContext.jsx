import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VoiceContext = createContext();

export const useVoice = () => useContext(VoiceContext);

const messages = {
  en: {
    combined:
      "Welcome to Phoeniks. For voice Guidance Say 'Enable Voice aid' or click 'Enable button'.",
    enabled:
      "Voice guidance activated. This website is developed for specially abled individuals across India. Apply UDID if not registered yet.",
  },
  hi: {
    combined:
      "फीनिक्स में आपका स्वागत है। वॉइस गाइड के लिए कहें 'आवाज़ सक्षम करें' या 'सक्रिय करें' बटन दबाएं।",
    enabled:
      "वॉइस गाइडेंस सक्रिय कर दी गई है। यह वेबसाइट भारत भर के दिव्यांग व्यक्तियों के लिए विकसित की गई है। यदि अभी तक पंजीकरण नहीं किया है तो यूडीआईडी के लिए आवेदन करें।",
  },
};

function speak(msg, lang = "en-IN") {
  return new Promise((resolve) => {
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const utter = new window.SpeechSynthesisUtterance(msg);
      utter.lang = lang;
      utter.rate = 0.9;
      utter.pitch = 1.0;
      utter.volume = 1.0;
      
      utter.onstart = () => {
        console.log("🔊 Audio STARTED:", msg.substring(0, 40));
      };
      
      utter.onend = () => {
        console.log("🔊 Audio ENDED");
        setTimeout(resolve, 200);
      };
      
      utter.onerror = (e) => {
        console.error("🔊 Audio ERROR:", e.error);
        resolve();
      };
      
      window.speechSynthesis.speak(utter);
    }, 100);
  });
}

function getLangCode(s) {
  s = s.toLowerCase();
  if (/aawaaz|saksham|आवाज़|आवाज|hindi/i.test(s)) return "hi";
  return "en";
}

export function VoiceProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [chosenLang, setChosenLang] = useState("en");

  const voiceEnabledRef = useRef(false);
  const chosenLangRef = useRef("en");
  const recognitionRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const actionCallbackRef = useRef(null);

  useEffect(() => {
    if (voiceEnabled && !recognitionRef.current) {
      console.log("🎙️ Starting recognition from context");
      startRecognition();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      window.speechSynthesis.cancel();
    };
  }, [voiceEnabled]);

  useEffect(() => {
    if (voiceEnabled) {
      console.log("📍 Route changed to:", location.pathname);
    }
  }, [location.pathname, voiceEnabled]);

  function stopRecognitionCompletely() {
    console.log("🛑 Stopping recognition");
    
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Stop error:", e);
      }
      recognitionRef.current = null;
    }
    
    return new Promise(resolve => setTimeout(resolve, 300));
  }

  function startRecognition() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.log("❌ Speech recognition not supported");
      return;
    }

    if (recognitionRef.current) {
      console.log("⚠️ Recognition already running");
      return;
    }

    if (isSpeakingRef.current) {
      console.log("⚠️ Currently speaking");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();

    recog.continuous = true;
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    recog.lang = chosenLangRef.current === "hi" ? "hi-IN" : "en-IN";

    recog.onresult = function (event) {
      if (isSpeakingRef.current) {
        console.log("⏸️ Speaking, ignoring input");
        return;
      }

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (!event.results[i].isFinal) continue;

        const transcript = event.results[i][0].transcript.trim().toLowerCase();
        console.log("🎤 Captured:", transcript);

        // Enable voice aid command
        if (!voiceEnabledRef.current) {
          const enableCmdRegex = /(enable|voice|aid|guidance|aawaaz|आवाज़|आवाज|saksham|सक्षम|chalu|चालू|karein|करें)/i;

          if (enableCmdRegex.test(transcript)) {
            console.log("🔊 Enabling voice aid...");
            enableVoice(getLangCode(transcript));
            return;
          }
        }

        // Check for page-specific action callbacks first
        if (voiceEnabledRef.current && actionCallbackRef.current) {
          const handled = actionCallbackRef.current(transcript);
          if (handled) {
            console.log("✅ Action handled by page callback");
            return;
          }
        }

        // Navigation commands
        if (voiceEnabledRef.current) {
          // Home navigation
          if (/home|होम|go home|go to home/i.test(transcript)) {
            console.log("🏠 HOME command");
            handleNavigation("/home", "home");
            return;
          }

          // Login navigation
          if (/login|लॉगिन|log in|go to login/i.test(transcript)) {
            console.log("🔐 LOGIN command");
            handleNavigation("/pwd-login", "login");
            return;
          }

          // Apply UDID navigation
          if (/apply|यूडीआईडी|udid|apply udid|apply for udid/i.test(transcript)) {
            console.log("📝 APPLY command");
            handleNavigation("/apply-for-udid", "apply");
            return;
          }
        }
      }
    };

    recog.onerror = function (e) {
      console.log("❌ Recognition error:", e.error);

      if (e.error === "aborted" || e.error === "no-speech") {
        return;
      }

      if (voiceEnabledRef.current && !isSpeakingRef.current) {
        restartTimeoutRef.current = setTimeout(() => {
          if (!recognitionRef.current && !isSpeakingRef.current) {
            startRecognition();
          }
        }, 1000);
      }
    };

    recog.onend = function () {
      console.log("⏹️ Recognition ended");
      recognitionRef.current = null;

      if (voiceEnabledRef.current && !isSpeakingRef.current) {
        restartTimeoutRef.current = setTimeout(() => {
          if (!recognitionRef.current && !isSpeakingRef.current) {
            startRecognition();
          }
        }, 500);
      }
    };

    try {
      recog.start();
      recognitionRef.current = recog;
      console.log("▶️ Recognition started");
    } catch (err) {
      console.log("❌ Start error:", err);
    }
  }

  async function handleNavigation(path, pageName) {
    console.log(`\n🚀 Navigation to ${pageName.toUpperCase()}`);
    
    // STOP recognition first
    isSpeakingRef.current = true;
    await stopRecognitionCompletely();
    
    // Build message
    const navMessages = {
      home: { en: "Navigating to home page", hi: "होम पेज पर जा रहे हैं" },
      login: { en: "Navigating to login page", hi: "लॉगिन पेज पर जा रहे हैं" },
      apply: { en: "Navigating to apply page", hi: "अप्लाई पेज पर जा रहे हैं" }
    };
    
    const msg = navMessages[pageName][chosenLangRef.current];
    const lang = chosenLangRef.current === "hi" ? "hi-IN" : "en-IN";
    
    console.log(`🔊 Speaking: "${msg}"`);
    
    // Speak and wait for it to finish
    await speak(msg, lang);
    
    console.log("✅ Speech done");
    
    // Wait a bit more before navigation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Now navigate
    console.log(`🔀 Navigating to ${path}`);
    navigate(path);
    
    isSpeakingRef.current = false;
    
    // Restart recognition after navigation
    setTimeout(() => {
      if (voiceEnabledRef.current && !isSpeakingRef.current) {
        console.log("▶️ Resuming recognition");
        startRecognition();
      }
    }, 1000);
  }

  async function enableVoice(lang = "en") {
    if (voiceEnabledRef.current) return;

    console.log("✅ ENABLING VOICE:", lang);

    // Stop recognition
    isSpeakingRef.current = true;
    await stopRecognitionCompletely();

    setVoiceEnabled(true);
    voiceEnabledRef.current = true;

    setChosenLang(lang);
    chosenLangRef.current = lang;

    console.log("🔊 Speaking enabled message");
    
    // Speak enabled message
    await speak(messages[lang].enabled, lang + "-IN");
    
    console.log("✅ Enable speech complete");
    isSpeakingRef.current = false;

    // Start recognition
    setTimeout(() => {
      if (voiceEnabledRef.current && !isSpeakingRef.current) {
        console.log("▶️ Starting recognition");
        startRecognition();
      }
    }, 1000);
  }

  function disableVoice() {
    console.log("🔇 Disabling voice");

    setVoiceEnabled(false);
    voiceEnabledRef.current = false;

    stopRecognitionCompletely();
    window.speechSynthesis.cancel();
  }

  async function speakText(msg) {
    isSpeakingRef.current = true;
    await stopRecognitionCompletely();
    await speak(msg, chosenLangRef.current === "hi" ? "hi-IN" : "en-IN");
    isSpeakingRef.current = false;
    
    setTimeout(() => {
      if (voiceEnabledRef.current && !isSpeakingRef.current) {
        startRecognition();
      }
    }, 1000);
  }

  function registerActionCallback(callback) {
    actionCallbackRef.current = callback;
    console.log("✅ Action callback registered");
  }

  function unregisterActionCallback() {
    actionCallbackRef.current = null;
    console.log("❌ Action callback unregistered");
  }

  const value = {
    voiceEnabled,
    chosenLang,
    enableVoice,
    disableVoice,
    speak: speakText,
    registerActionCallback,
    unregisterActionCallback,
  };

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>;
}
