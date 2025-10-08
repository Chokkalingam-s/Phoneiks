import React from "react";
import { useNavigate } from "react-router-dom";

export default function ApplyForUdid() {
  const navigate = useNavigate();

  return (
    <main className="container my-4" style={{ minHeight: "80vh" }}>
      <h2 className="mb-4" style={{ color: "#FF7A00", fontWeight: "700" }}>
        Apply For UDID Card/Disability Certificate
      </h2>
      <ul className="mt-3 mb-4" style={{ color: "#333", fontSize: "1.1rem" }}>
        <li>First-time applicants, lost card, or renewal: proceed below.</li>
        <li>
          Required documents: Color Photo, Signature/Thumbprint, Proof of Address, Proof of ID, Income and Caste Certificate, Previous Disability Certificate if available.
        </li>
        <li>
          Ensure files are <b>.jpg</b>, <b>.jpeg</b>, <b>.png</b>, <b>.pdf</b>, and below 2 MB.
        </li>
        <li>
          Application process: Fill details, upload documents, submit request. You’ll receive updates via SMS/email.
        </li>
      </ul>
      <button
        className="btn btn-warning text-white"
        onClick={() => navigate("/apply-udid-form")}
      >
        Proceed To Registration
      </button>
    </main>
  );
}
