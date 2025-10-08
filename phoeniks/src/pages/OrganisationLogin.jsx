import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrganisationLogin() {
  const [form, setForm] = useState({
    orgId: "",
    password: "",
    sampleEnabled: false
  });

  const dummy = {
    orgId: "ORG2025DEMO",
    password: "orgDemoPass123"
  };

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === "sampleEnabled") {
      setForm({
        orgId: checked ? dummy.orgId : "",
        password: checked ? dummy.password : "",
        sampleEnabled: checked
      });
      return;
    }
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Add authentication if required
    navigate("/org-dashboard"); // redirects after submit
  }

  return (
    <main className="container my-5" style={{ minHeight: "80vh" }}>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <h2 className="text-center mb-4" style={{ color:"#FF7A00", fontWeight:700 }}>Organisation Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="orgId" className="form-label">Organisation ID</label>
            <input
              id="orgId"
              name="orgId"
              type="text"
              className="form-control"
              value={form.orgId}
              onChange={handleChange}
              required
              autoFocus
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
          <button type="submit" className="btn btn-warning w-100 text-white fw-bold">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
