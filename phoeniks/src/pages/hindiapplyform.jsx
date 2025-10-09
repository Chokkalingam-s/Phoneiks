import React, { useState, useEffect, useRef } from "react";
import { useVoice } from "../components/VoiceContext";

export default function ApplyUdidForm() {
  const { voiceEnabled, chosenLang, speak, registerActionCallback, unregisterActionCallback } = useVoice();
  
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    aadhaar: "",
    phone: "",
    email: "",
    address: "",
    disabilityType: "",
    disabilityPercent: "",
    certificateNo: "",
    issuingAuthority: "",
    photo: null,
    signature: null,
    addressProof: null,
    idProof: null,
    incomeCert: null,
    prevDisabilityCert: null,
    agree: false,
  });

  const [currentField, setCurrentField] = useState(null);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [capturedValue, setCapturedValue] = useState("");
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const currentFieldRef = useRef(null);
  const awaitingConfirmationRef = useRef(false);
  const capturedValueRef = useRef("");
  const isVoiceModeRef = useRef(false);

  // Field definitions with labels in both languages
  const fields = [
    { name: "name", type: "text", label: { en: "Name", hi: "नाम" }, prompt: { en: "Please say your full name", hi: "कृपया अपना पूरा नाम बताएं" } },
    { name: "dob", type: "date", label: { en: "Date of Birth", hi: "जन्म तिथि" }, prompt: { en: "Please say your date of birth in day month year format. For example, 15 January 1990", hi: "कृपया अपनी जन्म तिथि दिन महीना साल के क्रम में बताएं। उदाहरण के लिए, 15 जनवरी 1990" } },
    { name: "gender", type: "select", label: { en: "Gender", hi: "लिंग" }, prompt: { en: "Please say your gender. Say Male for male, Female for female, or Other", hi: "कृपया अपना लिंग बताएं। पुरुष के लिए मेल, महिला के लिए फीमेल, या अन्य कहें" }, options: ["male", "female", "other"] },
    { name: "aadhaar", type: "number", label: { en: "Aadhaar Number", hi: "आधार नंबर" }, prompt: { en: "Please say your 12 digit Aadhaar number", hi: "कृपया अपना 12 अंकों का आधार नंबर बताएं" } },
    { name: "phone", type: "tel", label: { en: "Phone Number", hi: "फोन नंबर" }, prompt: { en: "Please say your 10 digit mobile number", hi: "कृपया अपना 10 अंकों का मोबाइल नंबर बताएं" } },
    { name: "email", type: "email", label: { en: "Email", hi: "ईमेल" }, prompt: { en: "Please say your email address", hi: "कृपया अपना ईमेल पता बताएं" } },
    { name: "address", type: "text", label: { en: "Address", hi: "पता" }, prompt: { en: "Please say your full address", hi: "कृपया अपना पूरा पता बताएं" } },
    { name: "disabilityType", type: "text", label: { en: "Disability Type", hi: "विकलांगता का प्रकार" }, prompt: { en: "Please say your disability type", hi: "कृपया अपनी विकलांगता का प्रकार बताएं" } },
    { name: "disabilityPercent", type: "number", label: { en: "Disability Percentage", hi: "विकलांगता प्रतिशत" }, prompt: { en: "Please say your disability percentage", hi: "कृपया अपनी विकलांगता का प्रतिशत बताएं" } },
    { name: "certificateNo", type: "text", label: { en: "Certificate Number", hi: "प्रमाण पत्र संख्या" }, prompt: { en: "Please say your certificate number", hi: "कृपया अपना प्रमाण पत्र संख्या बताएं" } },
    { name: "issuingAuthority", type: "text", label: { en: "Issuing Authority", hi: "जारी करने वाला प्राधिकरण" }, prompt: { en: "Please say the issuing authority name", hi: "कृपया जारी करने वाले प्राधिकरण का नाम बताएं" } },
  ];

  useEffect(() => {
    if (voiceEnabled && !hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        greetUser();
      }, 1500);
    }

    if (voiceEnabled) {
      registerActionCallback(handleVoiceCommand);
    }

    return () => {
      unregisterActionCallback();
    };
  }, [voiceEnabled]);

  useEffect(() => {
    currentFieldRef.current = currentField;
    awaitingConfirmationRef.current = awaitingConfirmation;
    capturedValueRef.current = capturedValue;
    isVoiceModeRef.current = isVoiceMode;
  }, [currentField, awaitingConfirmation, capturedValue, isVoiceMode]);

  async function greetUser() {
    const greeting = chosenLang === "hi"
      ? "यूडीआईडी पंजीकरण फॉर्म में आपका स्वागत है। मैं आपको फॉर्म भरने में मदद करूंगा। वॉइस असिस्टेंस शुरू करने के लिए 'शुरू करो' कहें या मैन्युअल रूप से भरने के लिए नीचे फॉर्म का उपयोग करें।"
      : "Welcome to UDID Registration Form. I will help you fill this form. Say 'Start' to begin voice assistance or use the form below to fill manually.";
    
    await speak(greeting);
  }

  function handleVoiceCommand(transcript) {
    console.log("🎤 Form command:", transcript, "| Voice Mode:", isVoiceModeRef.current, "| Field:", currentFieldRef.current, "| Awaiting:", awaitingConfirmationRef.current);
    const lower = transcript.toLowerCase().trim();

    // Only start voice mode if not already in voice mode AND it's ONLY "start" command
    if (!isVoiceModeRef.current && /^(start|shuru|शुरू|begin|chalu|चालू)$/i.test(lower)) {
      console.log("✅ Starting voice mode");
      startVoiceMode();
      return true;
    }

    // If in voice mode, handle field input
    if (isVoiceModeRef.current) {
      // Confirmation handling MUST come first
      if (awaitingConfirmationRef.current) {
        if (/(yes|ok|okay|correct|sahi|ठीक|हां|theek|han|haan|हाँ)/i.test(lower)) {
          console.log("✅ User confirmed");
          confirmField();
          return true;
        } else if (/(no|wrong|galat|गलत|nahi|नहीं|retry|repeat|nai|नै)/i.test(lower)) {
          console.log("❌ User rejected, retrying");
          retryField();
          return true;
        }
        // If awaiting confirmation but didn't say yes/no, ignore
        console.log("⚠️ Awaiting confirmation, but didn't hear yes/no");
        return false;
      } 
      
      // Only capture if we have a current field AND not awaiting confirmation
      if (currentFieldRef.current !== null && !awaitingConfirmationRef.current) {
        // Capture field value
        console.log("📝 Capturing field value:", transcript);
        handleFieldInput(transcript);
        return true;
      }
    }

    return false;
  }

  async function startVoiceMode() {
    setIsVoiceMode(true);
    const msg = chosenLang === "hi"
      ? "आवाज सहायता शुरू हो गई है। मैं एक-एक करके सभी फ़ील्ड पूछूंगा।"
      : "Voice assistance started. I will ask for each field one by one.";
    
    await speak(msg);
    
    // Small delay before asking first field
    await new Promise(resolve => setTimeout(resolve, 500));
    await askNextField(0);
  }

  async function askNextField(index) {
    if (index >= fields.length) {
      await completeForm();
      return;
    }

    const field = fields[index];
    console.log("📋 Asking for field:", field.name, "at index:", index);
    
    setCurrentField(index);
    setCapturedValue("");
    setAwaitingConfirmation(false);

    const prompt = field.prompt[chosenLang];
    await speak(prompt);
  }

  async function handleFieldInput(transcript) {
    const fieldIndex = currentFieldRef.current;
    if (fieldIndex === null) {
      console.log("⚠️ No current field set!");
      return;
    }
    
    const field = fields[fieldIndex];
    console.log("🔧 Processing input for field:", field.name, "Value:", transcript);
    
    let processedValue = transcript.trim();
    let displayValue = processedValue; // For showing to user

    // Process based on field type
    if (field.type === "number" || field.type === "tel") {
      // Extract numbers from speech
      processedValue = extractNumbers(transcript);
      displayValue = processedValue;
    } else if (field.type === "select") {
      // Match gender - returns object with value and display
      const matched = matchGender(transcript);
      processedValue = matched.value;
      displayValue = matched.display;
      console.log("🔍 Gender matched:", matched);
    } else if (field.type === "date") {
      // Parse date to YYYY-MM-DD format
      const parsed = parseDate(transcript);
      processedValue = parsed.formatted; // YYYY-MM-DD for input field
      displayValue = parsed.display; // Natural language for user
      console.log("📅 Date parsed:", parsed);
    } else if (field.type === "email") {
      // Process email
      processedValue = processEmail(transcript);
      displayValue = processedValue;
    }

    console.log("✅ Processed value:", processedValue, "Display:", displayValue);
    setCapturedValue(displayValue);

    // Update form with the formatted value
    setForm(prev => ({
      ...prev,
      [field.name]: processedValue
    }));

    // Spell out the captured value
    await spellOut(displayValue, field.type, field.name);

    // Ask for confirmation
    const confirmMsg = chosenLang === "hi"
      ? "क्या यह सही है? हां या नहीं कहें।"
      : "Is this correct? Say yes or no.";
    
    await speak(confirmMsg);
    setAwaitingConfirmation(true);
  }

  async function spellOut(value, type, fieldName) {
    if (!value) return;

    const intro = chosenLang === "hi" ? "आपने कहा" : "You said";
    await speak(intro);

    // Small pause
    await new Promise(resolve => setTimeout(resolve, 300));

    // Speak the full value
    await speak(value);

    // Small pause
    await new Promise(resolve => setTimeout(resolve, 500));

    // ✅ FIX 1: Only spell out for text fields (NOT for numbers like aadhaar/phone)
    // ✅ FIX 2: Skip spelling for date and select types
    if (type === "text") {
      const spellingIntro = chosenLang === "hi" ? "अक्षर दर अक्षर" : "Letter by letter";
      
      // ✅ FIX 3: Build spelling as a single string with commas for pauses
      const chars = value.split('');
      const spelledOut = chars.join(', ');
      
      // Speak intro and then the spelled out version in ONE call
      const fullSpelling = `${spellingIntro}. ${spelledOut}`;
      await speak(fullSpelling);
    }
    // For numbers (aadhaar, phone, disability percent), just confirm without spelling
    else if (type === "number" || type === "tel") {
      // No letter-by-letter spelling for numbers
      console.log("✅ Skipping letter-by-letter for number field");
    }
  }

  async function confirmField() {
    const fieldIndex = currentFieldRef.current;
    
    const confirmMsg = chosenLang === "hi" ? "ठीक है, अगला फ़ील्ड" : "Okay, next field";
    await speak(confirmMsg);

    setAwaitingConfirmation(false);
    
    // Move to next field
    await new Promise(resolve => setTimeout(resolve, 800));
    await askNextField(fieldIndex + 1);
  }

  async function retryField() {
    const fieldIndex = currentFieldRef.current;
    const field = fields[fieldIndex];
    
    // Clear the value
    setForm(prev => ({
      ...prev,
      [field.name]: ""
    }));
    
    setCapturedValue("");
    setAwaitingConfirmation(false);

    const retryMsg = chosenLang === "hi" 
      ? "ठीक है, फिर से कोशिश करते हैं।" 
      : "Okay, let's try again.";
    
    await speak(retryMsg);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Ask the same field again
    const prompt = field.prompt[chosenLang];
    await speak(prompt);
  }

  async function completeForm() {
    setIsVoiceMode(false);
    setCurrentField(null);
    
    const msg = chosenLang === "hi"
      ? "सभी फ़ील्ड पूरी हो गई हैं। कृपया दस्तावेज़ अपलोड करें और सबमिट बटन दबाएं।"
      : "All fields completed. Please upload documents and press submit button.";
    
    await speak(msg);
  }

  // Helper functions
  function extractNumbers(text) {
    // Remove spaces and extract digits
    const numbers = text.replace(/\s+/g, "").replace(/[^0-9]/g, "");
    return numbers;
  }

  function matchGender(text) {
    const lower = text.toLowerCase();
    console.log("🔍 Matching gender from:", lower);
    
    // Male patterns
    if (/(^male$|^mail$|^mel$|purush|पुरुष|ladka|लड़का|^man$|^मेल$)/i.test(lower)) {
      return { value: "male", display: chosenLang === "hi" ? "पुरुष" : "Male" };
    } 
    // Female patterns
    else if (/(female|femail|fimale|feemail|mahila|महिला|ladki|लड़की|woman|stri|स्त्री|^फीमेल$)/i.test(lower)) {
      return { value: "female", display: chosenLang === "hi" ? "महिला" : "Female" };
    } 
    // Other patterns
    else if (/(other|anya|अन्य|third)/i.test(lower)) {
      return { value: "other", display: chosenLang === "hi" ? "अन्य" : "Other" };
    }
    
    // Default fallback - try to guess from common misspellings
    if (/m[ae]l/i.test(lower)) {
      return { value: "male", display: chosenLang === "hi" ? "पुरुष" : "Male" };
    } else if (/f[ie]m[ae]l/i.test(lower)) {
      return { value: "female", display: chosenLang === "hi" ? "महिला" : "Female" };
    }
    
    return { value: text, display: text };
  }

  function parseDate(text) {
    // Enhanced date parsing
    const lower = text.toLowerCase();
    console.log("📅 Parsing date from:", lower);
    
    // Month mapping
    const monthMap = {
      'january': '01', 'jan': '01', 'जनवरी': '01',
      'february': '02', 'feb': '02', 'फरवरी': '02',
      'march': '03', 'mar': '03', 'मार्च': '03',
      'april': '04', 'apr': '04', 'अप्रैल': '04',
      'may': '05', 'मई': '05',
      'june': '06', 'jun': '06', 'जून': '06',
      'july': '07', 'jul': '07', 'जुलाई': '07',
      'august': '08', 'aug': '08', 'अगस्त': '08',
      'september': '09', 'sep': '09', 'sept': '09', 'सितंबर': '09',
      'october': '10', 'oct': '10', 'अक्टूबर': '10',
      'november': '11', 'nov': '11', 'नवंबर': '11',
      'december': '12', 'dec': '12', 'दिसंबर': '12'
    };
    
    // Extract numbers (potential day and year)
    const numbers = text.match(/\d+/g);
    
    // Find month
    let month = null;
    let monthName = '';
    for (const [key, value] of Object.entries(monthMap)) {
      if (lower.includes(key)) {
        month = value;
        monthName = key;
        break;
      }
    }
    
    if (numbers && numbers.length >= 2 && month) {
      // Assume first number is day, last is year
      let day = numbers[0].padStart(2, '0');
      let year = numbers[numbers.length - 1];
      
      // Handle 2-digit year
      if (year.length === 2) {
        year = parseInt(year) > 50 ? '19' + year : '20' + year;
      }
      
      const formatted = `${year}-${month}-${day}`;
      const display = `${day} ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
      
      console.log("✅ Date formatted:", formatted, "Display:", display);
      return { formatted, display };
    }
    
    // Fallback: return original text
    return { formatted: text, display: text };
  }

  function processEmail(text) {
    // Replace "at" with "@", "dot" with "."
    let email = text.toLowerCase();
    email = email.replace(/\s+at\s+/g, "@");
    email = email.replace(/\s+dot\s+/g, ".");
    email = email.replace(/\s+/g, "");
    return email;
  }

  function handleChange(e) {
    const { name, type, value, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : files
        ? files[0]
        : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = chosenLang === "hi" 
      ? "आवेदन सफलतापूर्वक जमा किया गया!" 
      : "Application Submitted Successfully!";
    
    alert(msg);
  }

  return (
    <main className="container my-4" style={{ minHeight: "80vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "#FF7A00", fontWeight: "700" }}>
          {chosenLang === "hi" ? "यूडीआईडी कार्ड पंजीकरण फॉर्म" : "UDID Card Registration Form"}
        </h2>
        
        {voiceEnabled && !isVoiceMode && (
          <button
            className="btn btn-warning"
            onClick={startVoiceMode}
            style={{
              borderRadius: 16,
              fontWeight: 600,
              background: "linear-gradient(90deg,#FF9900 0%,#FF7A00 100%)",
              color: "#fff",
              border: "none",
            }}
          >
            🎤 {chosenLang === "hi" ? "आवाज़ सहायता शुरू करें" : "Start Voice Assistance"}
          </button>
        )}
      </div>

      {isVoiceMode && (
        <div className="alert alert-info mb-4" role="alert">
          <strong>🎤 Voice Mode Active</strong>
          <br />
          {currentField !== null && (
            <>
              {chosenLang === "hi" ? "वर्तमान फ़ील्ड: " : "Current Field: "}
              <strong>{fields[currentField].label[chosenLang]}</strong>
              {capturedValue && (
                <>
                  <br />
                  {chosenLang === "hi" ? "कैप्चर किया गया: " : "Captured: "}
                  <span style={{ color: "#0066cc", fontWeight: "600" }}>{capturedValue}</span>
                </>
              )}
            </>
          )}
          {awaitingConfirmation && (
            <>
              <br />
              <span style={{ color: "#856404", fontWeight: "600" }}>
                {chosenLang === "hi" 
                  ? "⏳ पुष्टि की प्रतीक्षा में... 'हां' या 'नहीं' कहें" 
                  : "⏳ Awaiting confirmation... Say 'yes' or 'no'"}
              </span>
            </>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "नाम" : "Name"}
            </label>
            <input
              required
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 0 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 0 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "जन्म तिथि" : "Date of Birth"}
            </label>
            <input
              type="date"
              required
              className="form-control"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 1 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 1 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "लिंग" : "Gender"}
            </label>
            <select
              required
              className="form-select"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 2 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 2 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            >
              <option value="">{chosenLang === "hi" ? "चुनें" : "Select"}</option>
              <option value="male">{chosenLang === "hi" ? "पुरुष" : "Male"}</option>
              <option value="female">{chosenLang === "hi" ? "महिला" : "Female"}</option>
              <option value="other">{chosenLang === "hi" ? "अन्य" : "Other"}</option>
            </select>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "आधार नंबर" : "Aadhaar Number"}
            </label>
            <input
              className="form-control"
              name="aadhaar"
              value={form.aadhaar}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 3 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 3 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "फोन" : "Phone"}
            </label>
            <input
              required
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 4 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 4 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "ईमेल" : "Email"}
            </label>
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 5 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 5 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
        </div>

        {/* Disability Details */}
        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "पता" : "Address"}
            </label>
            <input
              required
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 6 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 6 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "विकलांगता का प्रकार" : "Disability Type"}
            </label>
            <input
              required
              className="form-control"
              name="disabilityType"
              value={form.disabilityType}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 7 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 7 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "% विकलांगता" : "% Disability"}
            </label>
            <input
              required
              className="form-control"
              name="disabilityPercent"
              value={form.disabilityPercent}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 8 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 8 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "प्रमाण पत्र संख्या" : "Certificate No"}
            </label>
            <input
              className="form-control"
              name="certificateNo"
              value={form.certificateNo}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 9 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 9 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "जारी करने वाला प्राधिकरण" : "Issuing Authority"}
            </label>
            <input
              className="form-control"
              name="issuingAuthority"
              value={form.issuingAuthority}
              onChange={handleChange}
              style={{ 
                backgroundColor: currentField === 10 && isVoiceMode ? "#fff3cd" : "white",
                border: currentField === 10 && isVoiceMode ? "2px solid #FF7A00" : "1px solid #ced4da"
              }}
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="row mb-3">
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "फोटो" : "Photo"}
            </label>
            <input
              required
              type="file"
              accept=".jpg,.jpeg,.png"
              name="photo"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "हस्ताक्षर/अंगूठा" : "Signature/Thumbprint"}
            </label>
            <input
              required
              type="file"
              accept=".jpg,.jpeg,.png"
              name="signature"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "पते का प्रमाण" : "Address Proof"}
            </label>
            <input
              required
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              name="addressProof"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "पहचान प्रमाण" : "ID Proof"}
            </label>
            <input
              required
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              name="idProof"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "आय प्रमाण पत्र" : "Income Cert"}
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              name="incomeCert"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">
              {chosenLang === "hi" ? "पिछला विकलांगता प्रमाण" : "Previous Disability Cert"}
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              name="prevDisabilityCert"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Consent and Submit */}
        <div className="mb-4 form-check">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            required
            className="form-check-input"
            id="consentCheck"
          />
          <label htmlFor="consentCheck" className="form-check-label">
            {chosenLang === "hi" 
              ? "मैं पुष्टि करता हूं कि सभी विवरण सही हैं और दस्तावेज़ मान्य हैं।"
              : "I confirm all details are correct and documents are valid."}
          </label>
        </div>

        <button 
          className="btn btn-success" 
          type="submit"
          style={{ fontWeight: 600, padding: "10px 30px" }}
        >
          {chosenLang === "hi" ? "सबमिट करें" : "Submit"}
        </button>
      </form>
    </main>
  );
}
