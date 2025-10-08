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
    console.log("🔊 [SPEAK] Starting speech for:", msg.substring(0, 50));
    
    // Force cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Wait for cancel to complete, then speak
    setTimeout(() => {
      const utter = new window.SpeechSynthesisUtterance(msg);
      utter.lang = lang;
      utter.rate = 0.9;
      utter.pitch = 1.0;
      utter.volume = 1.0;
      
      utter.onstart = () => {
        console.log("🔊 [SPEAK] ✅ Audio STARTED");
      };
      
      utter.onend = () => {
        console.log("🔊 [SPEAK] ✅ Audio ENDED");
        setTimeout(resolve, 100);
      };
      
      utter.onerror = (e) => {
        console.error("🔊 [SPEAK] ❌ ERROR:", e.error);
        setTimeout(resolve, 100);
      };
      
      console.log("🔊 [SPEAK] Calling speechSynthesis.speak()");
      window.speechSynthesis.speak(utter);
      
      // Verify it's queued
      setTimeout(() => {
        console.log("🔊 [SPEAK] Speaking:", window.speechSynthesis.speaking);
        console.log("🔊 [SPEAK] Pending:", window.speechSynthesis.pending);
      }, 100);
    }, 200);
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
  const isStoppingRef = useRef(false);

  useEffect(() => {
    if (voiceEnabled && !recognitionRef.current && !isSpeakingRef.current) {
      console.log("🎙️ [CONTEXT] Starting recognition from context");
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
      console.log("📍 [ROUTE] Changed to:", location.pathname);
    }
  }, [location.pathname, voiceEnabled]);

  async function stopRecognitionForSpeech() {
    if (isStoppingRef.current) {
      console.log("⚠️ [STOP] Already stopping, waiting...");
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }
    
    isStoppingRef.current = true;
    console.log("🛑 [STOP] Stopping recognition for speech");
    
    // Clear any restart timeouts
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    
    // Stop recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
        recognitionRef.current.stop();
        console.log("🛑 [STOP] Recognition stopped");
      } catch (e) {
        console.error("🛑 [STOP] Error:", e);
      }
      recognitionRef.current = null;
    }
    
    // Wait for recognition to fully stop
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("🛑 [STOP] Complete");
    isStoppingRef.current = false;
  }

  function startRecognition() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.log("❌ [START] Speech recognition not supported");
      return;
    }

    if (recognitionRef.current) {
      console.log("⚠️ [START] Recognition already running");
      return;
    }

    if (isSpeakingRef.current) {
      console.log("⚠️ [START] Currently speaking, delaying start");
      return;
    }

    console.log("▶️ [START] Starting new recognition");
    
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();

    recog.continuous = true;
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    recog.lang = chosenLangRef.current === "hi" ? "hi-IN" : "en-IN";

    recog.onstart = () => {
      console.log("▶️ [START] Recognition ACTIVE");
    };

    recog.onresult = function (event) {
      if (isSpeakingRef.current) {
        console.log("⏸️ [RESULT] Speaking in progress, ignoring");
        return;
      }

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (!event.results[i].isFinal) continue;

        const transcript = event.results[i][0].transcript.trim().toLowerCase();
        console.log("🎤 [RESULT] Captured:", transcript);

        // Enable voice aid command
        if (!voiceEnabledRef.current) {
          const enableCmdRegex = /(enable|voice|aid|guidance|aawaaz|आवाज़|आवाज|saksham|सक्षम|chalu|चालू|karein|करें)/i;

          if (enableCmdRegex.test(transcript)) {
            console.log("🔊 [RESULT] Triggering enableVoice");
            enableVoice(getLangCode(transcript));
            return;
          }
        }

        // Navigation commands
        if (voiceEnabledRef.current) {
          // Home navigation
          if (/home|होम|go home|go to home/i.test(transcript)) {
            console.log("🏠 [RESULT] Triggering HOME navigation");
            handleNavigation("/home", "home");
            return;
          }

          // Login navigation
          if (/login|लॉगिन|log in|go to login/i.test(transcript)) {
            console.log("🔐 [RESULT] Triggering LOGIN navigation");
            handleNavigation("/pwd-login", "login");
            return;
          }

          // Apply UDID navigation
          if (/apply|यूडीआईडी|udid|apply udid|apply for udid/i.test(transcript)) {
            console.log("📝 [RESULT] Triggering APPLY navigation");
            handleNavigation("/apply-for-udid", "apply");
            return;
          }
        }
      }
    };

    recog.onerror = function (e) {
      console.log("❌ [ERROR] Recognition error:", e.error);

      if (e.error === "aborted" || e.error === "no-speech") {
        return;
      }

      if (voiceEnabledRef.current && !isSpeakingRef.current) {
        restartTimeoutRef.current = setTimeout(() => {
          if (!recognitionRef.current && !isSpeakingRef.current) {
            console.log("🔄 [ERROR] Restarting after error");
            startRecognition();
          }
        }, 1000);
      }
    };

    recog.onend = function () {
      console.log("⏹️ [END] Recognition ended");
      recognitionRef.current = null;

      if (voiceEnabledRef.current && !isSpeakingRef.current && !isStoppingRef.current) {
        restartTimeoutRef.current = setTimeout(() => {
          if (!recognitionRef.current && !isSpeakingRef.current) {
            console.log("🔄 [END] Auto-restarting");
            startRecognition();
          }
        }, 500);
      }
    };

    try {
      recog.start();
      recognitionRef.current = recog;
      console.log("▶️ [START] Recognition object created and started");
    } catch (err) {
      console.log("❌ [START] Error:", err);
    }
  }

  async function handleNavigation(path, pageName) {
    console.log(`\n🚀 [NAV] ===== NAVIGATION TO ${pageName.toUpperCase()} STARTED =====`);
    
    // Set speaking flag FIRST
    isSpeakingRef.current = true;
    
    // Stop recognition and wait
    await stopRecognitionForSpeech();
    
    console.log(`🔊 [NAV] Preparing speech for ${pageName}`);

    const msg =
      chosenLangRef.current === "hi"
        ? `${pageName === "home" ? "होम" : pageName === "login" ? "लॉगिन" : "अप्लाई"} पेज पर जा रहे हैं`
        : `Navigating to ${pageName} page`;

    console.log(`🔊 [NAV] Message: "${msg}"`);
    
    // Speak and wait for completion
    await speak(msg, chosenLangRef.current === "hi" ? "hi-IN" : "en-IN");
    
    console.log(`✅ [NAV] Speech completed for ${pageName}`);
    console.log(`🔀 [NAV] Navigating to ${path}`);
    
    navigate(path);
    
    // Clear speaking flag
    isSpeakingRef.current = false;
    
    // Resume recognition with delay
    console.log(`▶️ [NAV] Scheduling recognition restart in 1.5s`);
    setTimeout(() => {
      if (voiceEnabledRef.current && !isSpeakingRef.current) {
        console.log("▶️ [NAV] Resuming recognition after navigation");
        startRecognition();
      }
    }, 1500);
    
    console.log(`🚀 [NAV] ===== NAVIGATION TO ${pageName.toUpperCase()} COMPLETE =====\n`);
  }

  async function enableVoice(lang = "en") {
    if (voiceEnabledRef.current) return;

    console.log("\n✅ [ENABLE] ===== ENABLING VOICE =====");
    console.log("✅ [ENABLE] Language:", lang);

    // Set speaking flag FIRST
    isSpeakingRef.current = true;
    
    // Stop recognition and wait
    await stopRecognitionForSpeech();

    setVoiceEnabled(true);
    voiceEnabledRef.current = true;

    setChosenLang(lang);
    chosenLangRef.current = lang;

    console.log("🔊 [ENABLE] Preparing enabled message");
    
    // Speak the enabled message
    await speak(messages[lang].enabled, lang + "-IN");
    
    console.log("✅ [ENABLE] Speech completed");
    
    // Clear speaking flag
    isSpeakingRef.current = false;

    // Start recognition with delay
    console.log("▶️ [ENABLE] Scheduling recognition start in 1.5s");
    setTimeout(() => {
      if (voiceEnabledRef.current && !isSpeakingRef.current) {
        console.log("🔄 [ENABLE] Starting recognition");
        startRecognition();
      }
    }, 1500);
    
    console.log("✅ [ENABLE] ===== VOICE ENABLED =====\n");
  }

  function disableVoice() {
    console.log("🔇 [DISABLE] Disabling voice");

    setVoiceEnabled(false);
    voiceEnabledRef.current = false;

    stopRecognitionForSpeech();
    window.speechSynthesis.cancel();
  }

  const value = {
    voiceEnabled,
    chosenLang,
    enableVoice,
    disableVoice,
    speak: async (msg) => {
      isSpeakingRef.current = true;
      await stopRecognitionForSpeech();
      await speak(msg, chosenLangRef.current === "hi" ? "hi-IN" : "en-IN");
      isSpeakingRef.current = false;
      
      setTimeout(() => {
        if (voiceEnabledRef.current && !isSpeakingRef.current) {
          startRecognition();
        }
      }, 1500);
    },
  };

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>;
}
