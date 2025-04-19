import React from "react";
import "./WorkPlace.css";

const WorkPlace = ({ activeComponent: ActiveComponent }) => {
  return (
    <div className="workplace">
      {typeof ActiveComponent === "function" ? <ActiveComponent /> : <p>Select a section from the LeftBar.</p>}
    </div>
  );
};

export default WorkPlace;
