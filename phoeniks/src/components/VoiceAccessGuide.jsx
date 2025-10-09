import React, { useEffect, useState, useRef } from "react";
import { useVoice } from "./VoiceContext";

const messages = {
  en: {
    combined:
      "Welcome to Phoeniks. For voice Guidance Say 'Enable Voice aid' or click 'Enable button'.",
  },
  hi: {
    combined:
      "फीनिक्स में आपका स्वागत है। वॉइस गाइड के लिए कहें 'आवाज़ सक्षम करें' या 'सक्रिय करें' बटन दबाएं।",
  },
};

function speak(msg, lang = "en-IN", cb) {
  window.speechSynthesis.cancel();
  
  setTimeout(() => {
    const utter = new window.SpeechSynthesisUtterance(msg);
    utter.lang = lang;
    utter.rate = 0.9;
    utter.pitch = 1.0;
    utter.volume = 1.0;
    utter.onend = cb;
    utter.onerror = (e) => {
      console.error("Guide speech error:", e.error);
      if (cb) cb();
    };
    window.speechSynthesis.speak(utter);
  }, 100);
}

function getLangCode(s) {
  s = s.toLowerCase();
  if (/aawaaz|saksham|आवाज़|आवाज|hindi/i.test(s)) return "hi";
  return "en";
}

export default function VoiceAccessGuide() {
  const { voiceEnabled, enableVoice } = useVoice();

  const [permissionAsked, setPermissionAsked] = useState(false);
  const [showLangChoice, setShowLangChoice] = useState(false);
  const [status, setStatus] = useState("ask-guidance");

  const recognitionRef = useRef(null);
  const restartTimeoutRef = useRef(null);

  useEffect(() => {
    if (permissionAsked || voiceEnabled) return;

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
  }, [permissionAsked, voiceEnabled]);

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
    recog.lang = "en-IN";

    recog.onresult = function (event) {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (!event.results[i].isFinal) continue;

        const transcript = event.results[i][0].transcript.trim().toLowerCase();
        console.log("🎤 Initial capture:", transcript);

        const enableCmdRegex = /(enable|voice|aid|guidance|aawaaz|आवाज़|आवाज|saksham|सक्षम|chalu|चालू|karein|करें)/i;

        if (enableCmdRegex.test(transcript)) {
          console.log("🔊 Enabling from guide...");
          window.speechSynthesis.cancel();
          const lang = getLangCode(transcript);
          handleEnableVoice(lang);
          return;
        }
      }
    };

    recog.onerror = function (e) {
      console.log("❌ Guide recognition error:", e.error);

      if (status === "ask-guidance" && !voiceEnabled) {
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
      console.log("⏹️ Guide recognition ended");
      if (status === "ask-guidance" && !voiceEnabled) {
        restartTimeoutRef.current = setTimeout(() => {
          try {
            if (recognitionRef.current) {
              recog.start();
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
      console.log("▶️ Guide recognition started");
    } catch (err) {
      console.log("Start error:", err);
    }
  }

  function handleEnableVoice(lang) {
    setStatus("enabled");

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }

    // Enable through context (this persists across routes)
    enableVoice(lang);
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
    setShowLangChoice(false);
    setStatus("enabled");

    // Enable through context
    enableVoice(lang);
  }

  // Don't show overlay if voice is already enabled
  if (voiceEnabled || status === "enabled") {
    return null;
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
