import React from "react";
import "./TitleSub.css";

const TitleSub = ({ sectionTitle }) => {
  const baby = JSON.parse(localStorage.getItem("selectedBaby")) || {};
  const user = localStorage.getItem("loggedInUser") || "Unknown User";

  return (
    <div className="title-sub-bar">
      <div className="title-sub-user">{user}</div>
      <div className="title-sub-section">{sectionTitle}</div>
      <div className="title-sub-baby">
        {baby.babyName || "No Name"} - {baby.babyMRN || "No MRN"}
      </div>
    </div>
  );
};

export default TitleSub;
