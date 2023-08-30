import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import FilterModal from "./filterModal/FilterModal";

const Modal = ({ onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={() => onClose(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <FilterModal onClose={onClose} />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
