import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function PwdLogin() {
  const [form, setForm] = useState({
    udid: "",
    password: "",
      sampleEnabled: false,
  });
    
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    // Add login validation here if needed
    navigate("/pwd-dashboard");
  }
    
  const dummyData = {
    udid: "1234-5678-9012",
    password: "password123"
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === "sampleEnabled") {
      if (checked) {
        setForm({ udid: dummyData.udid, password: dummyData.password, sampleEnabled: true });
      } else {
        setForm({ udid: "", password: "", sampleEnabled: false });
      }
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/pwd-dashboard");
  }

  return (
    <main className="container my-4" style={{ minHeight: "80vh" }}>
      <h2 className="mb-4" style={{ color: "#FF7A00", fontWeight: 700 }}>
        PwD Login
      </h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label htmlFor="udid" className="form-label">UDID</label>
          <input
            id="udid"
            name="udid"
            type="text"
            className="form-control"
            value={form.udid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            id="sampleEnabled"
            name="sampleEnabled"
            type="checkbox"
            className="form-check-input"
            checked={form.sampleEnabled}
            onChange={handleChange}
          />
          <label htmlFor="sampleEnabled" className="form-check-label">
            Enable sample data
          </label>
        </div>
        <button type="submit" className="btn btn-warning text-white">
          Submit
        </button>
      </form>
    </main>
  );
}
