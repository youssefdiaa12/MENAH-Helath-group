import React from "react";
import "./LeftBar.css";

const LeftBar = ({ onSelectComponent }) => {
  const items = [
    "Baby Information",
    "Baby Face Photo",
    "Baby Foot Print",
    "Baby Retina Print",
    "Mother Information",
    "Mother ID",
    "Mother Finger Print",
    "EBM Information",
    "QR Code", // Kept QR Code
    "EBM Calculation",
    "EBM Tables",
    "EBM Use",
    "EBM Verification"
  ];

  const handleProfile = () => {
    const role = localStorage.getItem("currentUserRole");

    if (!role) {
      alert("No user is currently logged in.");
      return;
    }

    switch (role) {
      case 'admin':
        onSelectComponent("AdminProfile");
        break;
      case 'nurse':
        onSelectComponent("NurseProfile");
        break;
      case 'parent':
        onSelectComponent("ParentProfile");
        break;
      default:
        alert("Role not recognized");
        break;
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("currentUserRole");
      window.location.href = "/";
    }
  };

  return (
    <div className="left-bar">
      {items.map((item) => (
        <div
          key={item}
          className="left-bar-item"
          onClick={() => onSelectComponent(item)}
        >
          {item}
        </div>
      ))}

      <div className="left-bar-bottom">
        <div className="left-bar-item" onClick={handleProfile}>
          Profile
        </div>
        <div className="left-bar-item" onClick={() => onSelectComponent("Messaging")}>
          Messaging
        </div>
        <div className="left-bar-item" onClick={handleLogout}>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default LeftBar;