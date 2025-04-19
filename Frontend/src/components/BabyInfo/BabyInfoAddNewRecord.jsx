import React from "react";
import "./BabyInfoSearch.css";

const BabyInfoAddNewRecord = ({ setLocalData }) => {
  const handleAddNew = () => {
    const proceed = window.confirm("This will clear the current data. Proceed?");
    if (proceed) {
      const defaultData = {
        babyName: "",
        babyNameArabic: "",
        babyMRN: "",
        visitNumber: "",
        gender: "",
        birthWeight: "",
        dob: "",
        gaWeeks: 0,
        gaDays: 0,
        passportId: "",
        personalId: "",
        birthCertificateId: "",
      };

      localStorage.removeItem("selectedBaby");
      localStorage.removeItem("babyName");
      localStorage.removeItem("babyMRN");

      setLocalData(defaultData);
    }
  };

  return (
    <button onClick={handleAddNew} className="baby-search-button">
      Add New Record
    </button>
  );
};

export default BabyInfoAddNewRecord;
