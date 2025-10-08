import React, { useEffect, useState, useRef } from "react";

const messages = {
  en: {
    welcome: "Welcome to Phoeniks.",
    guidance: "Do you want voice guidance? Say 'Enable Voice Aid' or click Enable.",
    enabled: "Voice guidance activated. This website is developed for specially abled individuals across India. Apply UDID if not registered yet.",
    selectLang: "Please select your preferred language for voice guidance."
  },
  hi: {
    welcome: "फ़ॉनिक्स में आपका स्वागत है।",
    guidance: "क्या आप वॉइस गाइडेंस चाहते हैं? 'आवाज़ सक्षम करें' बोलें या Enable क्लिक करें।",
    enabled: "वॉइस गाइडेंस सक्रिय कर दी गई है। यह वेबसाइट भारत भर के दिव्यांग व्यक्तियों के लिए विकसित की गई है। यदि अभी तक पंजीकरण नहीं किया है तो यूडीआईडी के लिए आवेदन करें।",
    selectLang: "कृपया अपनी पसंदीदा भाषा चुनें।"
  },
  ta: {
    welcome: "ஃபோனிக்ஸுக்கு வரவேற்கின்றோம்.",
    guidance: "குரல் வழிகாட்டுதலை விரும்புகிறீர்களா? 'குரலை இயக்கவும்' என்று சொல்லவும் அல்லது Enable-ஐ கிளிக் செய்யவும்.",
    enabled: "குரல் வழிகாட்டுதல் செயல்படுத்தப்பட்டது. இந்த இணையதளம் இந்தியாவிலுள்ள சிறப்பு தேவைகள் மற்றும் மாற்றுத் திறனாளிகள் కోసం உருவாக்கப்பட்டுள்ளது. இன்னும் பதிவு செய்யவில்லை என்றால் UDID-க்கு விண்ணப்பியுங்கள்.",
    selectLang: "தயவு செய்து உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்."
  }
};

function speak(msg, lang="en-IN", cb) {
  const utter = new window.SpeechSynthesisUtterance(msg);
  utter.lang = lang;
  utter.rate = 1;
  utter.pitch = 1.1;
  utter.onend = cb;
  window.speechSynthesis.speak(utter);
}

function getLangCode(s) {
  if (/kural|iyakkavum|குரலை/.test(s.toLowerCase())) return "ta";
  if (/aawaaz|saksham|आवाज़/.test(s.toLowerCase())) return "hi";
  return "en";
}

export default function VoiceAccessGuide() {
  const [permissionAsked, setPermissionAsked] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showLangChoice, setShowLangChoice] = useState(false);
  const [chosenLang, setChosenLang] = useState("en");
  const [status, setStatus] = useState("init");
  const recognitionRef = useRef(null);

  // Ask for microphone access on mount
  useEffect(() => {
    if (permissionAsked) return;
    if (navigator.mediaDevices && window.SpeechSynthesis) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
        setPermissionAsked(true);
        sequenceWelcome();
      }).catch(() => {
        setPermissionAsked(true);
        sequenceWelcome();
      });
    } else {
      setPermissionAsked(true);
      sequenceWelcome();
    }
    // eslint-disable-next-line
  }, []);
  
  // Welcome in all three languages, then ask guidance
  function sequenceWelcome() {
    setStatus("welcoming");
    speak(messages.en.welcome, "en-IN", ()=>{
      speak(messages.hi.welcome, "hi-IN", ()=>{
        speak(messages.ta.welcome, "ta-IN", ()=>{
          askVoiceGuidance();
        });
      });
    });
  }
  // Prompt for guide via voice and show buttons
  function askVoiceGuidance() {
    setStatus("ask-guidance");
    speak(messages.en.guidance, "en-IN");
    startRecognition();
  }

  // Start SpeechRecognition API
  function startRecognition() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = "en-IN";
    recog.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      if (/(enable voice aid|आवाज़ सक्षम करें|aawaaz saksham karein|குரலை இயக்கவும்|kuralai iyakkavum)/i.test(transcript)) {
        // Determine lang from voice
        const lang = getLangCode(transcript);
        onEnableVoice(lang);
      }
    };
    recog.onend = () => { if (!voiceEnabled && status==="ask-guidance") recog.start(); }
    recog.onerror = () => {};
    recog.start();
    recognitionRef.current = recog;
  }

  // User enables guidance
  function onEnableVoice(lang="en") {
    setVoiceEnabled(true);
    setChosenLang(lang);
    if (recognitionRef.current) recognitionRef.current.stop();
    setStatus("enabled-announce");
    setTimeout(() => {
      speak(messages[lang].enabled, lang+"-IN");
      setStatus("enabled");
    }, 400);
  }

  // If enabled by click, show language choice
  function enableByClick() {
    setShowLangChoice(true);
    if (recognitionRef.current) recognitionRef.current.stop();
  }

  function handleLangPick(lang) {
    setChosenLang(lang);
    setVoiceEnabled(true);
    setShowLangChoice(false);
    setTimeout(() => {
      speak(messages[lang].enabled, lang+"-IN");
      setStatus("enabled");
    }, 400);
  }

  return (
    <div className="voice-guide">
      {/* Overlay */}
      {(status==="init" || status==="welcoming") && (
        <div className="guide-overlay">
          <div className="guide-box">
            <div className="loader"></div>
            <h2 style={{color:"#FF7A00"}}>Loading voice experience…</h2>
            <p>Setting up voice and speaker access.</p>
          </div>
        </div>
      )}

      {status==="ask-guidance" && (
        <div className="guide-overlay">
          <div className="guide-box text-center">
            <h2 style={{color:"#FF7A00"}}>Enable Voice Guidance?</h2>
            <p>Allow a guided browsing experience for accessibility support.<br /><small style={{color:"#333"}}>Say <b>'Enable Voice Aid'</b> or tap Enable below.</small></p>
            <button onClick={enableByClick} className="btn btn-warning mt-2" style={{borderRadius:16, minWidth:120, color:"#fff", background:"linear-gradient(90deg,#FF9900 0%,#FF7A00 100%)", fontWeight:600}}>Enable</button>
            <button onClick={()=>setStatus("no-guide")} className="btn btn-outline-secondary mt-2 ms-2" style={{borderRadius:16, minWidth:110}}>Not Now</button>
          </div>
        </div>
      )}

      {showLangChoice && (
        <div className="guide-overlay">
          <div className="guide-box">
            <h3 style={{color:"#FF7A00"}}>Choose Language</h3>
            <p>Select a language for voice aid:</p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-warning" style={{borderRadius:16, minWidth:100, color:"#fff", background:"linear-gradient(90deg,#FF9900 0%,#FF7A00 100%)", fontWeight:600}} onClick={()=>handleLangPick("en")}>English</button>
              <button className="btn btn-warning" style={{borderRadius:16, minWidth:100, color:"#fff", background:"linear-gradient(90deg,#FF9900 0%,#FF7A00 100%)", fontWeight:600}} onClick={()=>handleLangPick("hi")}>Hindi</button>
              <button className="btn btn-warning" style={{borderRadius:16, minWidth:100, color:"#fff", background:"linear-gradient(90deg,#FF9900 0%,#FF7A00 100%)", fontWeight:600}} onClick={()=>handleLangPick("ta")}>Tamil</button>
            </div>
          </div>
        </div>
      )}

      {status==="enabled-announce" && (
        <div className="guide-overlay">
          <div className="guide-box">
            <h2 style={{color:"#FF7A00"}}>Voice Guidance Enabled!</h2>
            <p>Personalized guidance will be delivered in your language.</p>
          </div>
        </div>
      )}
    </div>
  );
}
