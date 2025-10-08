import React, { useState } from "react";

export default function PwdDashboard() {
  const [activeTab, setActiveTab] = useState("schemes");

  const schemesData = [
    {
      id: 1,
      title: "National Scholarship for Persons with Disabilities",
      description: "Financial help for higher education.",
      details:
        "Provides scholarships for PwD students. Valid UDID required. Apply by Oct 31, 2025 for pre/post-matric benefits and DBT transfers.",
      amount: "₹50,000/year",
      eligibility: "10th pass, income under ₹2.5L, valid UDID",
      deadline: "2025-10-31",
      badge: "recommended",
      match: "95% match",
      applyUrl: "https://scholarships.gov.in/",
    },
    {
      id: 2,
      title: "Assistive Devices Scheme (ADIP)",
      description: "Subsidized/free aids and appliances.",
      details:
        "Assistive devices including wheelchairs and hearing aids under government scheme. Apply via official portal by Dec 15, 2025.",
      amount: "Up to ₹25,000 per beneficiary",
      eligibility: "Valid UDID, BPL/APL status",
      deadline: "2025-12-15",
      badge: "eligible",
      match: "89% match",
      applyUrl: "https://adip.depwd.gov.in/getEquipmentInfo",
    },
    {
      id: 3,
      title: "Skill Development & Digital Literacy",
      description: "Free training in digital skills and certificates.",
      details:
        "Free courses on digital literacy and IT skills. Enroll by Nov 30, 2025 through Skill India portal. Certificates awarded on completion.",
      amount: "Free + Certificate",
      eligibility: "14-60 years, basic education, UDID mandatory",
      deadline: "2025-11-30",
      badge: "eligible",
      match: "88% match",
      applyUrl: "https://www.skillindiadigital.gov.in/",
    },
  ];

  const jobsData = [
    {
      id: 1,
      title: "Data Entry Operator",
      company: "TCS - Bangalore",
      type: "Full-time",
      salary: "₹18,000 - ₹25,000/month",
      eligibility: "12th pass, basic computer skills",
      posted: "Posted 3 days ago",
      match: "90% match",
      applyUrl: "https://careers.tcs.com/careers-home",
      details:
        "Entry level position for data processing. Good computer skills and accuracy required. Responsive employer for PwDs.",
    },
    {
      id: 2,
      title: "Customer Support Executive",
      company: "Amazon - Remote",
      type: "Work from Home",
      salary: "₹20,000 - ₹30,000/month",
      eligibility: "Graduate, good communication skills",
      posted: "Posted 1 week ago",
      match: "85% match",
      applyUrl: "https://www.amazon.jobs/en/",
      details:
        "Remote customer support job with flexible hours. Excellent communication and problem-solving skills are needed.",
    },
    {
      id: 3,
      title: "Junior Accountant",
      company: "Govt Office - Chennai",
      type: "Full-time",
      salary: "₹25,000 - ₹35,000/month",
      eligibility: "B.Com, Tally knowledge",
      posted: "Posted 2 days ago",
      match: "78% match",
      applyUrl: "https://www.tn.gov.in/government_jobs",
      details:
        "Responsible for bookkeeping and financial records. Knowledge of accounting software (Tally) a must. Government job offering stability.",
    },
  ];

  const learningData = [
   {
  id: 1,
  title: "Web Development Bootcamp",
  provider: "NPTEL - IIT Madras",
  duration: "12 weeks",
  level: "Beginner to Intermediate",
  certification: "Yes - Free certificate",
  startDate: "Starts: 2025-11-01",
  match: "92% match",
  details:
    "Learn HTML, CSS, JS, and backend basics from IIT Madras experts. Practical projects and certification upon successful completion.",
  link: "https://onlinecourses.nptel.ac.in",
},
    {
      id: 2,
      title: "Spoken English & Communication Skills",
      provider: "British Council India",
      duration: "8 weeks",
      level: "All levels",
      certification: "Yes - Paid certificate",
      startDate: "Starts: 2025-10-25",
      match: "88% match",
      details:
        "Improve your English speaking and confidence with British Council online classes. Suitable for all proficiency levels.",
      link: "https://www.youtube.com/user/BritishCouncilIndia",
    },
    {
      id: 3,
      title: "Financial Literacy & Banking",
      provider: "NCFE India",
      duration: "6 weeks",
      level: "Beginner",
      certification: "Yes - Free certificate",
      startDate: "Starts: 2025-11-15",
      match: "80% match",
      details:
        "Understand basics of personal finance, banking, loans and investments. Ideal for students and new learners.",
      link: "https://ncfeindia.org/financial-literacy-course/",
    },
  ];

  return (
    <main style={{ minHeight: "80vh", background: "#f4f6fa" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #FF7A00 0%, #FF9E40 100%)",
          color: "#fff",
          padding: "2rem 1.5rem",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 4px 12px rgba(255,122,0,0.2)",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: 700,
                marginRight: 16,
              }}
            >
              A
            </div>
            <div>
              <h2 style={{ margin: 0, fontWeight: 700 }}>
                Welcome back, Arjun Kumar!
              </h2>
              <p style={{ margin: 0, fontSize: "0.95rem", opacity: 0.95 }}>
                UDID: 1234567890123456 • Visual Impairment • Grade 12th
              </p>
            </div>
          </div>
          <div className="text-end d-none d-md-block">
            <small style={{ opacity: 0.9 }}>Profile Completion</small>
            <h3 style={{ margin: 0, fontWeight: 700 }}>85%</h3>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="container mt-4">
        <div className="d-flex gap-2 mb-4">
          <button
            className={`btn ${
              activeTab === "schemes"
                ? "btn-warning text-white"
                : "btn-outline-secondary"
            }`}
            style={{ borderRadius: 20, fontWeight: 500, minWidth: 120 }}
            onClick={() => setActiveTab("schemes")}
          >
            🎓 Schemes
          </button>
          <button
            className={`btn ${
              activeTab === "jobs"
                ? "btn-warning text-white"
                : "btn-outline-secondary"
            }`}
            style={{ borderRadius: 20, fontWeight: 500, minWidth: 120 }}
            onClick={() => setActiveTab("jobs")}
          >
            💼 Jobs
          </button>
          <button
            className={`btn ${
              activeTab === "learning"
                ? "btn-warning text-white"
                : "btn-outline-secondary"
            }`}
            style={{ borderRadius: 20, fontWeight: 500, minWidth: 120 }}
            onClick={() => setActiveTab("learning")}
          >
            📚 Learning
          </button>
        </div>

        {/* Schemes Tab */}
        {activeTab === "schemes" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Recommended Schemes & Scholarships</h4>
              <span className="badge bg-warning text-dark">
                {schemesData.length} Available
              </span>
            </div>
            {schemesData.map((scheme) => (
              <div
                key={scheme.id}
                className="card mb-3"
                style={{ borderLeft: "4px solid #FF7A00" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h5 className="card-title">{scheme.title}</h5>
                      <p className="text-muted mb-2">{scheme.description}</p>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#444",
                          maxHeight: "3rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {scheme.details}
                      </p>
                      <div className="row">
                        <div className="col-md-4 mb-2">
                          <small className="text-muted">💰 Amount:</small>
                          <br />
                          <strong>{scheme.amount}</strong>
                        </div>
                        <div className="col-md-4 mb-2">
                          <small className="text-muted">✅ Eligibility:</small>
                          <br />
                          <span>{scheme.eligibility}</span>
                        </div>
                        <div className="col-md-4 mb-2">
                          <small className="text-muted">⏰ Deadline:</small>
                          <br />
                          <span>{scheme.deadline}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <a
                          href={scheme.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-warning btn-sm text-white me-2"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                    <div className="text-end ms-3">
                      <span
                        className={`badge ${
                          scheme.badge === "recommended"
                            ? "bg-success"
                            : "bg-info"
                        }`}
                      >
                        {scheme.badge}
                      </span>
                      <br />
                      <small className="text-muted">{scheme.match}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Recommended Job Opportunities</h4>
              <span className="badge bg-warning text-dark">
                {jobsData.length} Available
              </span>
            </div>
            {jobsData.map((job) => (
              <div
                key={job.id}
                className="card mb-3"
                style={{ borderLeft: "4px solid #FF7A00" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start flex-column flex-md-row">
                    <div className="flex-grow-1">
                      <h5 className="card-title">{job.title}</h5>
                      <p className="text-muted mb-1">
                        {job.company} • {job.type}
                      </p>
                      <p style={{ fontSize: 14, color: "#444" }}>
                        <strong>Eligibility: </strong>
                        {job.eligibility}
                      </p>
                      <p style={{ fontSize: 14, color: "#444", marginTop: 8 }}>
                        {job.details}
                      </p>
                      <div className="row">
                        <div className="col-md-4 mb-2">
                          <small className="text-muted">💰 Salary:</small>
                          <br />
                          <strong>{job.salary}</strong>
                        </div>
                        <div className="col-md-3 mb-2">
                          <small className="text-muted">{job.posted}</small>
                        </div>
                      </div>
                      <div className="mt-2">
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-warning btn-sm text-white me-2"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                    <div className="text-end ms-md-3 mt-3 mt-md-0">
                      <small className="text-muted">{job.match}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Learning Tab */}
        {activeTab === "learning" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Recommended Learning Courses</h4>
              <span className="badge bg-warning text-dark">
                {learningData.length} Available
              </span>
            </div>
            {learningData.map((course) => (
              <div
                key={course.id}
                className="card mb-3"
                style={{ borderLeft: "4px solid #FF7A00" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="text-muted mb-2">{course.provider}</p>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#444",
                          maxHeight: "3rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {course.details}
                      </p>
                      <div className="row">
                        <div className="col-md-3 mb-2">
                          <small className="text-muted">⏱️ Duration:</small>
                          <br />
                          <strong>{course.duration}</strong>
                        </div>
                        <div className="col-md-3 mb-2">
                          <small className="text-muted">📊 Level:</small>
                          <br />
                          <span>{course.level}</span>
                        </div>
                        <div className="col-md-3 mb-2">
                          <small className="text-muted">🎓 Certificate:</small>
                          <br />
                          <span>{course.certification}</span>
                        </div>
                        <div className="col-md-3 mb-2">
                          <small className="text-muted">{course.startDate}</small>
                        </div>
                      </div>
                      <div className="mt-2">
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-warning btn-sm text-white me-2"
                        >
                          Enroll Now
                        </a>
                      </div>
                    </div>
                    <div className="text-end ms-3">
                      <small className="text-muted">{course.match}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
