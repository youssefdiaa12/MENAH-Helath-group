import React, { useState } from "react";
import axios from "axios";
import "./BabyInfoSearch.css";

const BabyInfoSearch = ({ setLocalData }) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    const proceed = window.confirm(
      "Searching a new record may override unsaved data. Proceed?"
    );
    setShowSearchBox(proceed);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/babies/search`, {
        params: { query },
      });

      const baby = response.data;

      if (baby) {
        localStorage.removeItem("selectedBaby");
        localStorage.removeItem("babyName");
        localStorage.removeItem("babyMRN");

        localStorage.setItem("selectedBaby", JSON.stringify(baby));
        localStorage.setItem("babyName", baby.babyName || "");
        localStorage.setItem("babyMRN", baby.babyMRN || "");

        setLocalData(baby);
        alert("Record found.");
      } else {
        localStorage.removeItem("selectedBaby");
        setLocalData(null);
        alert("No matching record found.");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Search failed. Check console.");
      console.error("Search error:", error.response?.data || error);
    }

    setShowSearchBox(false);
  };

  const handleCloseSearchBox = () => {
    setShowSearchBox(false);
  };

  return (
    <>
      <button onClick={handleSearchClick} className="baby-search-button">
        Search Record
      </button>

      {showSearchBox && (
        <div className="baby-search-popup">
          <input
            className="baby-search-input"
            type="text"
            placeholder="Enter MRN or Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="baby-search-find" onClick={handleSearch}>
            Find
          </button>
          <button className="baby-search-find" onClick={handleCloseSearchBox}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default BabyInfoSearch;
