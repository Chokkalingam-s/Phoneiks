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
          const enableCmdRegex = /(enable|voice|aid|guidance|aawaaz|aavaaz|awaz|आवाज|saksham|सक्षम|chalu|चालू|shuru|शुरू|karein|करें|karo|करो)/i;

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

        // Navigation commands with IMMEDIATE speech to preserve user gesture
        if (voiceEnabledRef.current) {
          let navPath = null;
          let navMsg = null;
          
          // Home navigation
          if (/(home|होम|ghar|घर|jaao|jao|जाओ)/i.test(transcript)) {
            console.log("🏠 HOME command detected");
            navPath = "/home";
            navMsg = chosenLangRef.current === "hi" ? "होम पेज पर जा रहे हैं" : "Navigating to home page";
          }
          // Login navigation
          else if (/(login|लॉगिन|log\s*in|signin|sign\s*in|dakhil|दाखिल)/i.test(transcript)) {
            console.log("🔐 LOGIN command detected");
            navPath = "/pwd-login";
            navMsg = chosenLangRef.current === "hi" ? "लॉगिन पेज पर जा रहे हैं" : "Navigating to login page";
          }
          // Apply UDID navigation
          else if (/(apply|अप्लाई|udid|u\.?d\.?i\.?d|यूडी|यूडीआईडी|aavedan|aawadan|आवेदन)/i.test(transcript)) {
            console.log("📝 APPLY UDID command detected");
            navPath = "/apply-for-udid";
            navMsg = chosenLangRef.current === "hi" ? "अप्लाई पेज पर जा रहे हैं" : "Navigating to apply page";
          }
          
          // ✅ CRITICAL FIX: Speak IMMEDIATELY in the event handler to preserve user gesture
          if (navPath && navMsg) {
            const lang = chosenLangRef.current === "hi" ? "hi-IN" : "en-IN";
            
            // Cancel any existing speech
            window.speechSynthesis.cancel();
            
            // Create utterance
            const utter = new window.SpeechSynthesisUtterance(navMsg);
            utter.lang = lang;
            utter.rate = 0.9;
            utter.pitch = 1.0;
            utter.volume = 1.0;
            
            console.log(`🔊 Speaking IMMEDIATELY: "${navMsg}"`);
            
            // Speak NOW (while user gesture is active)
            window.speechSynthesis.speak(utter);
            
            // Handle post-speech navigation
            utter.onend = () => {
              console.log("✅ Speech complete, navigating to", navPath);
              navigate(navPath);
              
              // Restart recognition after navigation
              setTimeout(() => {
                isSpeakingRef.current = false;
                if (voiceEnabledRef.current && !recognitionRef.current) {
                  console.log("▶️ Resuming recognition");
                  startRecognition();
                }
              }, 1500);
            };
            
            utter.onerror = (e) => {
              console.error("❌ Speech error:", e.error);
              // Navigate anyway
              navigate(navPath);
              isSpeakingRef.current = false;
              
              setTimeout(() => {
                if (voiceEnabledRef.current && !recognitionRef.current) {
                  startRecognition();
                }
              }, 1500);
            };
            
            // Stop recognition AFTER speech has started
            isSpeakingRef.current = true;
            stopRecognitionCompletely();
            
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
    
    // Speak enabled message immediately
    window.speechSynthesis.cancel();
    
    const utter = new window.SpeechSynthesisUtterance(messages[lang].enabled);
    utter.lang = lang + "-IN";
    utter.rate = 0.9;
    utter.pitch = 1.0;
    utter.volume = 1.0;
    
    const speechPromise = new Promise((resolve) => {
      utter.onend = () => {
        console.log("✅ Enable speech complete");
        resolve();
      };
      utter.onerror = (e) => {
        console.error("❌ Enable speech error:", e.error);
        resolve();
      };
      setTimeout(resolve, 8000); // Safety timeout
    });
    
    window.speechSynthesis.speak(utter);
    await speechPromise;
    
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
    
    // Speak immediately
    window.speechSynthesis.cancel();
    
    const utter = new window.SpeechSynthesisUtterance(msg);
    utter.lang = chosenLangRef.current === "hi" ? "hi-IN" : "en-IN";
    utter.rate = 0.9;
    utter.pitch = 1.0;
    utter.volume = 1.0;
    
    const speechPromise = new Promise((resolve) => {
      utter.onend = () => {
        console.log("✅ Text speech complete");
        resolve();
      };
      utter.onerror = (e) => {
        console.error("❌ Text speech error:", e.error);
        resolve();
      };
      setTimeout(resolve, 10000); // Safety timeout
    });
    
    console.log("🔊 Speaking text:", msg.substring(0, 40));
    window.speechSynthesis.speak(utter);
    
    await speechPromise;
    
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

function getLangCode(s) {
  s = s.toLowerCase();
  if (/aawaaz|aavaaz|awaz|आवाज|saksham|सक्षम|hindi/i.test(s)) return "hi";
  return "en";
}
