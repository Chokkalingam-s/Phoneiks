import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrganisationDashboard() {
  const navigate = useNavigate();

  const employee = {
    name: "Priya Sharma",
    id: "ORG-EMP-202501",
    address: "32, Mount Road, Chennai, India",
    experience: "10 years",
    role: "Senior Coordinator",
    department: "Administration",
    qualification: "MBA (HR)",
    email: "priya.sharma@organisation.org",
    phone: "+91-9998887776",
    joiningDate: "21-Feb-2014"
  };

  return (
    <main className="container py-4" style={{ minHeight: "80vh" }}>
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => navigate("/organisation-forum")}
        >
          Forum
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => navigate("/organisation-login")}
        >
          Logout
        </button>
      </div>

      <div className="card shadow mx-auto" style={{ maxWidth: 500, borderRadius: 16 }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-3" style={{ color: "#FF7A00" }}>
            Employee Details
          </h4>
          <table className="table table-borderless mb-0">
            <tbody>
              <tr><td className="fw-bold">Name:</td><td>{employee.name}</td></tr>
              <tr><td className="fw-bold">Employee ID:</td><td>{employee.id}</td></tr>
              <tr><td className="fw-bold">Role:</td><td>{employee.role}</td></tr>
              <tr><td className="fw-bold">Department:</td><td>{employee.department}</td></tr>
              <tr><td className="fw-bold">Qualification:</td><td>{employee.qualification}</td></tr>
              <tr><td className="fw-bold">Experience:</td><td>{employee.experience}</td></tr>
              <tr><td className="fw-bold">Joining Date:</td><td>{employee.joiningDate}</td></tr>
              <tr><td className="fw-bold">Address:</td><td>{employee.address}</td></tr>
              <tr>
                <td className="fw-bold">Email:</td>
                <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
              </tr>
              <tr><td className="fw-bold">Phone:</td><td>{employee.phone}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
