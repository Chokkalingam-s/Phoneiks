import React from "react";
import HomeCarousel from "../components/Carousel.jsx";

export default function Home() {
  return (
    <div>
      <HomeCarousel />

      {/* Landing Page Feature Sections */}
      <section className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2>About Phoeniks</h2>
            <p>
              Phoeniks is a comprehensive digital card service platform tailored for
              inclusivity, security, and accessibility. Seamlessly apply, renew,
              and access digital identification cards with ease.
            </p>
            <ul>
              <li>One-stop online registration</li>
              <li>Secure digital documentation</li>
              <li>User-friendly interface and assistance</li>
            </ul>
          </div>
          <div className="col-md-6">
            <img
              src="/src/assets/slide1.png"
              alt="Phoeniks About"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>
      <section className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">Quick Registration</h5>
                <p className="card-text">
                  Apply for your digital card instantly with an easy application workflow and real-time updates.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">Status Tracking</h5>
                <p className="card-text">
                  Track your application status, receive notifications, and access help anytime.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">Accessibility</h5>
                <p className="card-text">
                  Designed to be accessible for all users, including persons with disabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
