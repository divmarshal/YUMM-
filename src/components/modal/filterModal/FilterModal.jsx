import React, { useState } from "react";
import "./style.scss";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const FilterModal = ({ onClose }) => {
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setIsChecked(e.target.checked);
    setValue(e.target.id);
  };
  const handleRadioInputBtn = () => {
    if (!isChecked && !value) return;
    navigate(`/modal/${value}`);
    onClose(false);
  };

  return (
    <div className="filterModal">
      <div className="filterModal-header">
        <h1>Filters</h1>
        <button onClick={() => onClose(false)}>
          <RxCross2 style={{ fontSize: "24px" }} />
        </button>
      </div>
      <div className="filterModal-form">
        <input
          type="radio"
          name="filter"
          id="popular"
          onChange={handleInputChange}
        />
        <label htmlFor="popular">
          <span className="filterModal-radio"></span>
          Popularity
        </label>
      </div>
      <div className="filterModal-form">
        <input
          type="radio"
          name="filter"
          id="higher"
          onChange={handleInputChange}
        />
        <label htmlFor="higher">
          <span className="filterModal-radio"></span>
          Cost: High to Low
        </label>
      </div>
      <div className="filterModal-form">
        <input
          type="radio"
          name="filter"
          id="lower"
          onChange={handleInputChange}
        />
        <label htmlFor="lower">
          <span className="filterModal-radio"></span>
          Cost: Low to High
        </label>
      </div>
      <button className="filterModal-btn" onClick={handleRadioInputBtn}>
        Apply
      </button>
    </div>
  );
};

export default FilterModal;
