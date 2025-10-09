import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  utter.rate = 0.9;
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
  const navigate = useNavigate();

  const [permissionAsked, setPermissionAsked] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showLangChoice, setShowLangChoice] = useState(false);
  const [chosenLang, setChosenLang] = useState("en");
  const [status, setStatus] = useState("ask-guidance");
  
  // USE REFS TO AVOID STALE CLOSURE ISSUE
  const voiceEnabledRef = useRef(false);
  const chosenLangRef = useRef("en");
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

    recog.continuous = true;
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    recog.lang = chosenLangRef.current === "hi" ? "hi-IN" : "en-IN";

    recog.onresult = function (event) {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (!event.results[i].isFinal) continue;

        const transcript = event.results[i][0].transcript.trim().toLowerCase();
        console.log("🎤 Captured:", transcript);
        console.log("✅ Voice Enabled (ref):", voiceEnabledRef.current);

        // Enable voice aid command (only when not enabled yet)
        if (!voiceEnabledRef.current) {
          const enableCmdRegex = /(enable|voice|aid|guidance|aawaaz|आवाज़|आवाज|saksham|सक्षम|chalu|चालू|karein|करें)/i;
          
          if (enableCmdRegex.test(transcript)) {
            console.log("🔊 Enabling voice aid...");
            window.speechSynthesis.cancel();
            const lang = getLangCode(transcript);
            onEnableVoice(lang);
            return;
          }
        }

        // Navigation commands (ONLY when voice is enabled)
        if (voiceEnabledRef.current) {
          console.log("🚀 Checking navigation commands...");

          // Home navigation
          if (/home|होम|go home|go to home/.test(transcript)) {
            console.log("🏠 Navigating to HOME");
            window.speechSynthesis.cancel();
            speak(
              chosenLangRef.current === "hi"
                ? "आपको होम पेज पर ले जाया जा रहा है"
                : "Navigating to home page",
              chosenLangRef.current === "hi" ? "hi-IN" : "en-IN",
              () => {
                navigate("/home");
              }
            );
            return;
          }

          // Login navigation
          if (/login|लॉगिन|log in|go to login/.test(transcript)) {
            console.log("🔐 Navigating to LOGIN");
            window.speechSynthesis.cancel();
            speak(
              chosenLangRef.current === "hi"
                ? "आपको लॉगिन पेज पर ले जाया जा रहा है"
                : "Navigating to login page",
              chosenLangRef.current === "hi" ? "hi-IN" : "en-IN",
              () => {
                navigate("/pwd-login");
              }
            );
            return;
          }

          // Apply UDID navigation
          if (/apply|यूडीआईडी|udid|apply udid|apply for udid/.test(transcript)) {
            console.log("📝 Navigating to APPLY");
            window.speechSynthesis.cancel();
            speak(
              chosenLangRef.current === "hi"
                ? "आपको अप्लाई पेज पर ले जाया जा रहा है"
                : "Navigating to apply page",
              chosenLangRef.current === "hi" ? "hi-IN" : "en-IN",
              () => {
                navigate("/apply-for-udid");
              }
            );
            return;
          }
        } else {
          console.log("⚠️ Voice not enabled yet, ignoring navigation commands");
        }
      }
    };

    recog.onaudiostart = function () {
      console.log("🎙️ Audio capturing started");
    };

    recog.onsoundstart = function () {
      console.log("🔊 Sound detected");
    };

    recog.onspeechstart = function () {
      console.log("💬 Speech detected");
    };

    recog.onerror = function (e) {
      console.log("❌ Recognition error:", e.error);

      if (e.error === "no-speech") {
        console.log("🔄 No speech detected, will restart...");
      }

      if (status !== "no-guide") {
        restartTimeoutRef.current = setTimeout(() => {
          try {
            if (recognitionRef.current) {
              recog.start();
            }
          } catch (err) {
            console.log("Restart error:", err);
          }
        }, 1000);
      }
    };

    recog.onend = function () {
      console.log("⏹️ Recognition ended");
      if (status !== "no-guide") {
        restartTimeoutRef.current = setTimeout(() => {
          try {
            if (recognitionRef.current) {
              recog.start();
              console.log("🔄 Recognition restarted");
            }
          } catch (err) {
            console.log("Restart error:", err);
          }
        }, 500);
      }
    };

    try {
      recog.start();
      recognitionRef.current = recog;
      console.log("▶️ Recognition started, language:", recog.lang);
    } catch (err) {
      console.log("Start error:", err);
    }
  }

  function onEnableVoice(lang = "en") {
    if (voiceEnabledRef.current) return;

    console.log("✅ ENABLING VOICE with language:", lang);

    // Update both state and ref
    setVoiceEnabled(true);
    voiceEnabledRef.current = true;
    
    setChosenLang(lang);
    chosenLangRef.current = lang;
    
    setStatus("enabled-announce");

    // Stop current recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }

    window.speechSynthesis.cancel();

    // Speak enabled message then restart recognition
    speak(messages[lang].enabled, lang + "-IN", () => {
      setStatus("enabled");
      setTimeout(() => {
        console.log("🔄 Restarting recognition after voice enable");
        startRecognition();
      }, 300);
    });
  }

  function enableByClick() {
    setShowLangChoice(true);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
  }

  function handleLangPick(lang) {
    console.log("🌐 Language picked:", lang);

    // Update both state and ref
    setChosenLang(lang);
    chosenLangRef.current = lang;
    
    setVoiceEnabled(true);
    voiceEnabledRef.current = true;
    
    setShowLangChoice(false);
    setStatus("enabled-announce");

    window.speechSynthesis.cancel();

    speak(messages[lang].enabled, lang + "-IN", () => {
      setStatus("enabled");
      setTimeout(() => {
        console.log("🔄 Restarting recognition after language pick");
        startRecognition();
      }, 300);
    });
  }

  return (
    <div className="voice-guide">
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
              onClick={() => {
                window.speechSynthesis.cancel();
                if (recognitionRef.current) {
                  recognitionRef.current.stop();
                  recognitionRef.current = null;
                }
                setStatus("no-guide");
              }}
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
    </div>
  );
}
