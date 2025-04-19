import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Management = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const [profileType, setProfileType] = useState(""); // ⬅ NEW
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [newProfileError, setNewProfileError] = useState("");

  const handleLogin = () => {
    if (!email || !password || !role) {
      setError("All fields are required.");
      return;
    }

    if (email === "admin@example.com" && password === "adminpass" && role === "admin") {
      localStorage.setItem("currentUserRole", "admin");
      localStorage.setItem("currentUserName", "Admin User");
      setShowLoginModal(false);
      navigate("/home");
    } else if (email === "nurse@example.com" && password === "nursepass" && role === "nurse") {
      localStorage.setItem("currentUserRole", "nurse");
      localStorage.setItem("currentUserName", "Nurse User");
      setShowLoginModal(false);
      navigate("/home");
    } else if (email === "parent@example.com" && password === "parentpass" && role === "parent") {
      localStorage.setItem("currentUserRole", "parent");
      localStorage.setItem("currentUserName", "Parent User");
      setShowLoginModal(false);
      navigate("/home");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleCreateProfile = () => {
    if (!profileType || !newFirstName || !newLastName || !newUsername || !newMobile || !password || !newConfirmPassword) {
      setNewProfileError("All fields are required.");
      return;
    }
    if (password !== newConfirmPassword) {
      setNewProfileError("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setNewProfileError("Password must be strong.");
      return;
    }

    const newProfile = {
      firstName: newFirstName,
      lastName: newLastName,
      username: newUsername,
      mobile: newMobile,
      email: email,
      role: profileType, // ⬅ UPDATED
      profilePicture: newProfilePicture,
      password: password,
    };

    let pendingProfiles = JSON.parse(localStorage.getItem("pendingProfiles")) || [];
    pendingProfiles.push(newProfile);
    localStorage.setItem("pendingProfiles", JSON.stringify(pendingProfiles));

    setShowCreateProfileModal(false);
    alert("Profile created successfully and pending approval!");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", border: "3px solid black", margin: "20px", backgroundColor: "#DDE6F0" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>
        Halebi, Trusted EBM Verification System
      </h1>

      <button onClick={() => setShowLoginModal(true)} style={{ padding: "10px 20px", fontSize: "16px", margin: "10px" }}>
        Log In
      </button>

      <button onClick={() => setShowCreateProfileModal(true)} style={{ padding: "10px 20px", fontSize: "16px", margin: "10px" }}>
        Create Profile
      </button>

      {showLoginModal && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", border: "2px solid #ccc", borderRadius: "10px", zIndex: 1000 }}>
          <h3>Login</h3>
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }} />
          <br />
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }} />
          <br />
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="nurse">Nurse</option>
            <option value="parent">Parent</option>
          </select>
          <br />
          <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px" }}>
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={() => setShowLoginModal(false)} style={{ padding: "8px 16px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}>
            Close
          </button>
        </div>
      )}

      {showCreateProfileModal && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", border: "2px solid #ccc", borderRadius: "10px", zIndex: 1000 }}>
          <h3>Create Profile</h3>

          {/* ⬇ INSERTED DROPDOWN FOR PROFILE TYPE */}
          <select value={profileType} onChange={(e) => setProfileType(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }}>
            <option value="">Select Profile Type</option>
            <option value="admin">Admin</option>
            <option value="nurse">Nurse</option>
            <option value="parent">Parent</option>
          </select>
          <br />

          <input type="text" placeholder="First Name" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }} />
          <br />
          <input type="text" placeholder="Last Name" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }} />
          <br />
          <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }} />
          <br />
          <input type="text" placeholder="Mobile" value={newMobile} onChange={(e) => setNewMobile(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }} />
          <br />
          <input type="file" onChange={(e) => setNewProfilePicture(e.target.files[0])} style={{ padding: "10px", margin: "10px", width: "250px" }} />
          <br />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }} />
          <br />
          <input type="password" placeholder="Confirm Password" value={newConfirmPassword} onChange={(e) => setNewConfirmPassword(e.target.value)} style={{ padding: "10px", margin: "10px", width: "250px" }} />
          <br />
          <button onClick={handleCreateProfile} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px" }}>
            Create Profile
          </button>
          {newProfileError && <p style={{ color: "red" }}>{newProfileError}</p>}
          <button onClick={() => setShowCreateProfileModal(false)} style={{ padding: "8px 16px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Management;