// src/pages/Home.jsx
import React from "react";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <div>
      <Carousel />

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="text-warning fw-bold mb-3">Welcome to Phoeniks</h2>
          <p className="text-secondary fs-5">
            Phoeniks is a National Empowerment Portal providing comprehensive
            access to services, schemes, and opportunities for specially-abled
            citizens through a unified digital ecosystem.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h3 className="text-center text-warning fw-bold mb-4">Key Features</h3>
          <div className="row g-4">
            {[
              { title: "UDID Registration", desc: "Unified ID for persons with disabilities." },
              { title: "Schemes & Benefits", desc: "Access government and NGO welfare schemes." },
              { title: "Institution Portal", desc: "Enable inclusivity across institutions." },
              { title: "Employment & Skill Hub", desc: "Connect with training and job opportunities." },
            ].map((f, i) => (
              <div key={i} className="col-md-3">
                <div className="card h-100 shadow-sm border-0 text-center p-4">
                  <div className="card-body">
                    <h5 className="fw-bold text-warning">{f.title}</h5>
                    <p className="text-secondary">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h3 className="fw-bold text-warning mb-4">Impact So Far</h3>
          <div className="row">
            <div className="col-md-4">
              <h1 className="fw-bold text-orange">5+</h1>
              <p className="text-secondary">Beneficiaries Registered</p>
            </div>
            <div className="col-md-4">
              <h1 className="fw-bold text-orange">0+</h1>
              <p className="text-secondary">Institutions Linked</p>
            </div>
            <div className="col-md-4">
              <h1 className="fw-bold text-orange">225+</h1>
              <p className="text-secondary">Government Schemes Integrated</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
