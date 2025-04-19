import React, { useState } from "react";

const NurseProfileCreate = () => {
  const [nurseProfile, setNurseProfile] = useState({
    firstName: "",
    lastName: "",
    department: "",
    yearsOfExperience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNurseProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!nurseProfile.firstName || !nurseProfile.lastName) {
      alert("Please fill all required fields.");
      return;
    }

    const pendingProfiles = JSON.parse(localStorage.getItem("pendingProfiles")) || [];
    pendingProfiles.push({
      type: "nurse",
      data: nurseProfile,
    });
    localStorage.setItem("pendingProfiles", JSON.stringify(pendingProfiles));

    alert("Nurse profile submitted for approval.");
    setNurseProfile({
      firstName: "",
      lastName: "",
      department: "",
      yearsOfExperience: "",
    });
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}>
      <h3>Nurse Profile</h3>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={nurseProfile.firstName}
        onChange={handleChange}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={nurseProfile.lastName}
        onChange={handleChange}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={nurseProfile.department}
        onChange={handleChange}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="number"
        name="yearsOfExperience"
        placeholder="Years of Experience"
        value={nurseProfile.yearsOfExperience}
        onChange={handleChange}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <button onClick={handleSave} style={{ padding: "10px 20px", fontWeight: "bold" }}>
        Submit for Approval
      </button>
    </div>
  );
};

export default NurseProfileCreate;
