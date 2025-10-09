import React, { useState } from "react";

const STATES = [
  "Tamil Nadu", "Andaman And Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu And Kashmir", "Jharkhand",
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Telangana",
  "The Dadra And Nagar Haveli And Daman And Diu", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const DISTRICTS = [
  "Chennai", "Ariyalur", "Chengalpattu", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode",
  "Kallakurichi", "Kancheepuram", "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam",
  "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur",
  "The Nilgiris", "Theni", "Thiruvallur", "Thiruvarur", "Thoothukkudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
  "Tiruppur", "Tiruvannamalai", "Vellore", "Viluppuram", "Virudhunagar"
];

const HOSPITALS = [
  "Government Hospital, Sathiyamangalam",
  "Government Kilpauk Medical College & Hospital, Kilpauk",
  "Government Medical College & Hospital, Omandurar",
  "Government Rehabilitation Home, Vellaiyur",
  "Government Royapettah Hospital, Royapettah",
  "Military Hospital, Chennai",
  "Rajiv Gandhi Government General Hospital, Chennai",
  "Stanley Medical College & Hospital"
];

const DISABILITIES = [
  "Blindness", "Low Vision", "Leprosy-Cured", "Hearing Impairment",
  "Locomotor Disability", "Dwarfism", "Intellectual Disability",
  "Mental Illness", "Autism Spectrum Disorder", "Cerebral Palsy",
  "Muscular Dystrophy", "Chronic Neurological Conditions",
  "Specific Learning Disabilities", "Multiple Sclerosis"
];

const POPDATA = {
  "Tamil Nadu": {
    projectedPopulation: 77500000,
    populationPwD: 1451354,
    numUDIDGenerated: 47234
  },
  "Kerala": {
    projectedPopulation: 35000000,
    populationPwD: 650000,
    numUDIDGenerated: 55000
  }
};

export default function PlainMinistryDashboard() {
  const [state, setState] = useState("Tamil Nadu");
  const [district, setDistrict] = useState("Chennai");
  const [hospital, setHospital] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fundDisability, setFundDisability] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [fundScope, setFundScope] = useState("state-wise");
  const [modalSuccess, setModalSuccess] = useState(false);

  const { projectedPopulation, populationPwD, numUDIDGenerated } =
    POPDATA[state] || POPDATA["Tamil Nadu"];
  const percentUDIDIssued = populationPwD
    ? ((numUDIDGenerated / populationPwD) * 100).toFixed(2)
    : "N/A";

  function handleReset() {
    setState("");
    setDistrict("");
    setHospital("");
  }

  function handleFundSubmit(e) {
    e.preventDefault();
    setModalSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setModalSuccess(false);
      setFundAmount("");
      setFundDisability("");
      setFundScope("state-wise");
    }, 1400);
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 900 }}>
      <div style={{
        background: "#fff",
        borderRadius: 10,
        padding: "2rem",
        boxShadow: "0 2px 12px #eee"
      }}>
        <div className="d-flex flex-wrap mb-4">
          <div>
            <label className="fw-bold d-block mb-1">State / UTs<span style={{ color: "red" }}>*</span></label>
            <select className="form-select" value={state} onChange={e => setState(e.target.value)}
              style={{ minWidth: 200, fontSize: "1.07rem" }}>
              <option value="">Choose State / UT</option>
              {STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="fw-bold d-block mb-1">District<span style={{ color: "red" }}>*</span></label>
            <select className="form-select" value={district} onChange={e => setDistrict(e.target.value)}
              style={{ minWidth: 200, fontSize: "1.07rem" }}>
              <option value="">Choose District</option>
              {DISTRICTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="fw-bold d-block mb-1">Hospital Name<span style={{ color: "red" }}>*</span></label>
            <select className="form-select" value={hospital} onChange={e => setHospital(e.target.value)}
              style={{ minWidth: 200, fontSize: "1.07rem" }}>
              <option value="">Choose Hospital</option>
              {HOSPITALS.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
          <div className="d-flex align-items-end ms-auto">
            <button
              className="btn btn-outline-dark fw-bold px-4 me-2"
              onClick={handleReset}
            >RESET</button>
            <button className="btn btn-dark fw-bold px-4">Generate CSV</button>
          </div>
        </div>
        <div style={{
          fontSize: "1.17rem",
          background: "#f8f8f9",
          borderRadius: 8,
          padding: "2rem 2.2rem 1.6rem 2.2rem",
          marginTop: "0.8rem"
        }}>
          <div className="mb-2">A. Projected Population in State: <b>{projectedPopulation.toLocaleString()}</b></div>
          <div className="mb-2">B. Estimated Population of PwD in State: <b>{populationPwD.toLocaleString()}</b></div>
          <div className="mb-2">C. No of UDID generated in State: <b>{numUDIDGenerated.toLocaleString()}</b></div>
          <div className="mb-2">D. Percentage of Registered PwD issued UDID Card: <b>{percentUDIDIssued}%</b></div>
        </div>
        <div className="text-center mt-4 mb-2">
          <button className="btn btn-outline-primary fw-bold px-5"
            onClick={() => {
              setShowModal(true);
              setModalSuccess(false);
            }}>
            Upload New Scheme / Allocate Fund
          </button>
        </div>
        {showModal && (
          <div style={{
            position: "fixed", top: 0, left: 0, zIndex: 1050, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div className="bg-white rounded shadow p-4"
              style={{ minWidth: 310, maxWidth: 370, width: "92%", position: "relative" }}>
              <button
                className="btn btn-sm btn-light border position-absolute"
                style={{ right: 10, top: 12, zIndex: 10 }}
                onClick={() => setShowModal(false)}
              >×</button>
              <h5 className="mb-2 fw-bold">Allocate Fund / Upload Scheme</h5>
              {!modalSuccess ? (
                <form onSubmit={handleFundSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Disability</label>
                    <select className="form-select" value={fundDisability}
                      onChange={e => setFundDisability(e.target.value)} required>
                      <option value="">Select</option>
                      {DISABILITIES.map(dis => (
                        <option key={dis} value={dis}>{dis}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Fund (Crores)</label>
                    <input type="number" min="0" placeholder="eg: 15"
                      value={fundAmount}
                      onChange={e => setFundAmount(e.target.value)}
                      className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Location</label>
                    <div>
                      <label className="me-3">
                        <input type="radio" name="fndsco" value="state-wise"
                          checked={fundScope === "state-wise"}
                          onChange={e => setFundScope(e.target.value)} /> State-wise
                      </label>
                      <label className="ms-2">
                        <input type="radio" name="fndsco" value="all-india"
                          checked={fundScope === "all-india"}
                          onChange={e => setFundScope(e.target.value)} /> All over India
                      </label>
                    </div>
                    {fundScope === "state-wise" && (
                      <div className="mt-2">
                        <select className="form-select"
                          value={state} onChange={e => setState(e.target.value)} required>
                          <option value="">Select State / UT</option>
                          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-dark w-100 fw-bold">Submit</button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div style={{ fontSize: 44, color: "#19ba57" }}>✔️</div>
                  <div
                    className="fw-bold mt-2"
                    style={{ fontSize: 20, color: "#19ba57" }}
                  >Successful!</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
