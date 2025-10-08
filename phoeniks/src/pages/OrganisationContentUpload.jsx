import React, { useState } from "react";
import { FaPlus, FaPlay, FaTimes } from "react-icons/fa";

const disabilityOptions = [
  "Blindness", "Low Vision", "Leprosy-Cured", "Hearing Impairment", "Locomotor Disability",
  "Dwarfism", "Intellectual Disability", "Mental Illness", "Autism Spectrum Disorder",
  "Cerebral Palsy", "Muscular Dystrophy", "Chronic Neurological Conditions",
  "Specific Learning Disabilities", "Multiple Sclerosis"
];

const demoContents = [
  { id: 1, title: "Braille System Demo", type: "video", tag: "Blindness", url: "https://www.w3schools.com/html/movie.mp4", uploader: "Ms. Latika" },
  { id: 2, title: "Visual Aids for Low Vision", type: "video", tag: "Low Vision", url: "https://samplelib.com/mp4/sample-5s.mp4", uploader: "Rao Sir" },
  { id: 3, title: "Leprosy-Cured Reintegration", type: "video", tag: "Leprosy-Cured", url: "https://www.w3schools.com/html/mov_bbb.mp4", uploader: "Dr. Gauhar" },
  { id: 4, title: "Sign Language Numbers", type: "video", tag: "Hearing Impairment", url: "https://samplelib.com/mp4/sample-10s.mp4", uploader: "Mr. Prakash" },
  { id: 5, title: "Wheelchair Safety", type: "video", tag: "Locomotor Disability", url: "https://samplelib.com/mp4/sample-7s.mp4", uploader: "Rehab Staff" },
  { id: 6, title: "Dwarfism Lecturer", type: "video", tag: "Dwarfism", url: "https://samplelib.com/mp4/sample-3s.mp4", uploader: "NGO Vikram" },
  { id: 7, title: "Learning with Intellectual Disability", type: "video", tag: "Intellectual Disability", url: "https://samplelib.com/mp4/sample-12s.mp4", uploader: "Ms. Saraswati" },
  { id: 8, title: "Mental Wellness Basics", type: "video", tag: "Mental Illness", url: "https://samplelib.com/mp4/sample-9s.mp4", uploader: "Dr. Nanda Kumar" },
  { id: 9, title: "Autism Visual Timetables", type: "video", tag: "Autism Spectrum Disorder", url: "https://samplelib.com/mp4/sample-13s.mp4", uploader: "Therapist Latha" },
  { id: 10, title: "Cerebral Palsy: Exercises", type: "video", tag: "Cerebral Palsy", url: "https://samplelib.com/mp4/sample-15s.mp4", uploader: "Dr. Nivetha" },
  { id: 11, title: "Muscular Dystrophy Activities", type: "video", tag: "Muscular Dystrophy", url: "https://samplelib.com/mp4/sample-14s.mp4", uploader: "Coach Shalini" },
  { id: 12, title: "Accommodations for SLD", type: "video", tag: "Specific Learning Disabilities", url: "https://samplelib.com/mp4/sample-6s.mp4", uploader: "Dr. Akash" }
];

export default function OrganisationForum() {
  const [filter, setFilter] = useState("");
  const [allContent, setAllContent] = useState(demoContents);
  const [showModal, setShowModal] = useState(false);

  // Upload modal state
  const [uploadTag, setUploadTag] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [modalError, setModalError] = useState("");

  // Filter contents
  const filtered = filter ? allContent.filter(c => c.tag === filter) : allContent;

  // Modal open/close
  const openModal = () => { setShowModal(true); setModalError(""); };
  const closeModal = () => {
    setShowModal(false);
    setUploadTag(""); setUploadTitle(""); setUploadFile(null); setModalError("");
  };

  // Handle preview (open in new tab)
  function handlePreviewClick(url) {
    window.open(url, '_blank');
  }

  // Form submit logic: append to the list (simulate upload)
  function handleSubmit(e) {
    e.preventDefault();
    if (!uploadTag || !uploadTitle || !uploadFile) {
      setModalError("Please fill all fields and upload a video or image.");
      return;
    }
    // Simulate: In real use, upload to server/cloud and get a URL.
    const newId = allContent.length + 1;
    const url = URL.createObjectURL(uploadFile); // Demo use only, file won't persist after reload!
    const type = uploadFile.type.startsWith("video") ? "video" : "image";
    setAllContent([
      { id: newId, title: uploadTitle, type, tag: uploadTag, url, uploader: "You" }, ...allContent
    ]);
    closeModal();
  }

  return (
    <div className="container pt-4 pb-4" style={{ maxWidth: 900, position: "relative" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0" style={{ color: "#FF7A00" }}>Educational Content Forum</h4>
        <button className="btn btn-warning text-white d-flex align-items-center"
                onClick={openModal}>
          <FaPlus className="me-2" /> Upload Content
        </button>
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold me-2">Filter by Disability Category:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={filter}
          style={{ maxWidth: "210px", fontSize: "0.96rem" }}
          onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          {disabilityOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      {filtered.length === 0 && (
        <div className="alert alert-secondary text-center">No content available for this category yet.</div>
      )}
      <div className="row g-3">
        {filtered.map(c =>
          <div className="col-12 col-sm-6 col-lg-4" key={c.id}>
            <div className="card h-100 p-1">
              <div className="card-body py-2 px-2 d-flex flex-column align-items-center">
                <h6 className="card-title mb-1 w-100" style={{ color: "#FF7A00", fontWeight: 700, fontSize: '1rem', textAlign: "center" }}>{c.title}</h6>
                <div className="mb-1 w-100 d-flex justify-content-between" style={{ fontSize: "0.85rem" }}>
                  <span className="badge bg-info text-dark">{c.tag}</span>
                  <span>By: {c.uploader}</span>
                </div>
                <div
                  onClick={() => handlePreviewClick(c.url)}
                  className="bg-dark position-relative d-flex align-items-center justify-content-center mt-1 mb-1"
                  style={{
                    cursor: "pointer",
                    borderRadius: 7,
                    width: "100%",
                    height: 110,
                    minHeight: 80,
                    maxWidth: 210
                  }}
                  title="Click to play"
                >
                  <FaPlay size={25} color="#fff" style={{ opacity: 0.8 }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal (simple custom modal, can replace with Bootstrap Modal) */}
      {showModal && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, zIndex: 1050, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.40)", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
          <div
            className="bg-white rounded shadow p-4"
            style={{ minWidth: 320, maxWidth: 400, width: "100%", position: "relative" }}>
            <button
              className="btn btn-sm btn-light border position-absolute"
              style={{ right: 10, top: 8, zIndex: 10 }}
              onClick={closeModal}
              title="Close"
            >
              <FaTimes size={16} />
            </button>
            <h5 className="mb-3" style={{ color: "#FF7A00", fontWeight: 700 }}>Upload Content</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Disability Category</label>
                <select
                  className="form-select"
                  value={uploadTag}
                  onChange={e => setUploadTag(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {disabilityOptions.map(opt =>
                    <option key={opt} value={opt}>{opt}</option>
                  )}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Title</label>
                <input
                  className="form-control"
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Video or Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="video/*,image/*"
                  onChange={e => setUploadFile(e.target.files[0])}
                  required
                />
              </div>
              {modalError && <div className="alert alert-danger">{modalError}</div>}
              <button type="submit" className="btn btn-warning w-100 fw-bold text-white">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
