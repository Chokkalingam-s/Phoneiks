import React, { useState } from "react";

export default function ApplyUdidForm() {
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
    alert("Application Submitted!");
  }

  return (
    <main className="container my-4" style={{ minHeight: "80vh" }}>
      <h2 className="mb-4" style={{ color: "#FF7A00", fontWeight: "700" }}>
        UDID Card Registration Form
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label className="form-label fw-semibold">Name</label>
            <input
              required
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label fw-semibold">Date of Birth</label>
            <input
              type="date"
              required
              className="form-control"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label fw-semibold">Gender</label>
            <select
              required
              className="form-select"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-semibold">Aadhaar Number</label>
            <input
              className="form-control"
              name="aadhaar"
              value={form.aadhaar}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label fw-semibold">Phone</label>
            <input
              required
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label fw-semibold">Email</label>
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Disability Details */}
        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label className="form-label fw-semibold">Address</label>
            <input
              required
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label fw-semibold">Disability Type</label>
            <input
              required
              className="form-control"
              name="disabilityType"
              value={form.disabilityType}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">% Disability</label>
            <input
              required
              className="form-control"
              name="disabilityPercent"
              value={form.disabilityPercent}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label fw-semibold">Certificate No</label>
            <input
              className="form-control"
              name="certificateNo"
              value={form.certificateNo}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label fw-semibold">Issuing Authority</label>
            <input
              className="form-control"
              name="issuingAuthority"
              value={form.issuingAuthority}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="row mb-3">
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">Photo</label>
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
            <label className="form-label fw-semibold">Signature/Thumbprint</label>
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
            <label className="form-label fw-semibold">Address Proof</label>
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
            <label className="form-label fw-semibold">ID Proof</label>
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
            <label className="form-label fw-semibold">Income Cert</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              name="incomeCert"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-2">
            <label className="form-label fw-semibold">Previous Disability Cert</label>
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
            I confirm all details are correct and documents are valid.
          </label>
        </div>

        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
