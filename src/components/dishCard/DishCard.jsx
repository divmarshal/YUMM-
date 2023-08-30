import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const DishCard = ({ data }) => {
  const { brand, id, image, price, rate, title } = data;

  return (
    <div className="dishcard">
      <Link to={`/dish/${id}`} className="dishcard-link">
        <img src={image} alt="dish-image" />
        <div className="dishcard-brand">
          <h1>{brand}</h1>
          <div
            style={{
              padding: "2px 4px",
              backgroundColor: "green",
              borderRadius: "4px",
            }}
          >
            <span
              style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}
            >
              {rate}
            </span>
            <FaStar style={{ fontSize: "8px", color: "#fff" }} />
          </div>
        </div>
        <div className="dishcard-title">
          <span style={{ textTransform: "capitalize" }}>{title}</span>
          <span>₹{price}</span>
        </div>
        <div className="dishcard-border"></div>
      </Link>
    </div>
  );
};

export default DishCard;
