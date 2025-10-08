import React, { useState } from "react";

export default function OrganisationContentUpload() {
  const [selectedTag, setSelectedTag] = useState("");
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState("");

  const disabilityTags = [
    "Braille System",
    "Sign Language",
    "Audio Narration",
    "Text-to-Speech Material",
    "Simplified Learning Guides"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTag || !files) {
      setMessage("Please select a tag and upload at least one file.");
      return;
    }

    // TODO: send data to backend (Django or Firebase)
    console.log({
      tag: selectedTag,
      uploadedFiles: files
    });

    setMessage("✅ Content uploaded successfully!");
    setSelectedTag("");
    setFiles(null);
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h3 className="text-center mb-4" style={{ color: "#FF7A00" }}>
        Upload Educational Content
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Select Disability Type</label>
          <select
            className="form-select"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">-- Choose a category --</option>
            {disabilityTags.map((tag, i) => (
              <option key={i} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Upload Image/Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            className="form-control"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Upload
        </button>
      </form>

      {message && (
        <div className="alert alert-info text-center mt-4">{message}</div>
      )}
    </div>
  );
}
