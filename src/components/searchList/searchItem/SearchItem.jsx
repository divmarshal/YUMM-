import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const SearchItem = ({ data }) => {
  const { title, image } = data;

  return (
    <div className="searchItem">
      <Link
        to={`/searchFeed/${title.toLowerCase()}`}
        className="searchItem-link"
      >
        <img src={image} alt="food-image" />
        <p>{title.toLowerCase()}</p>
      </Link>
    </div>
  );
};

export default SearchItem;
