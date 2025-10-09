import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MinistryLogin() {
  const [form, setForm] = useState({
    ministryId: "",
    password: "",
    sampleEnabled: false,
  });

  const navigate = useNavigate();

  const dummyData = {
    ministryId: "MIN-DEPWD-2025",
    password: "ministryDemo@123",
  };

  function handleChange(e) {
    const { name, value, checked } = e.target;
    if (name === "sampleEnabled") {
      setForm({
        ministryId: checked ? dummyData.ministryId : "",
        password: checked ? dummyData.password : "",
        sampleEnabled: checked,
      });
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Example: redirect to a Ministry Dashboard
    navigate("/ministry-dashboard");
  }

  return (
    <main className="container my-5" style={{ minHeight: "80vh" }}>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <h2 className="mb-4 text-center" style={{ color: "#FF7A00", fontWeight: 700 }}>
          Ministry Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="ministryId" className="form-label">Ministry ID</label>
            <input
              id="ministryId"
              name="ministryId"
              type="text"
              className="form-control"
              value={form.ministryId}
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
