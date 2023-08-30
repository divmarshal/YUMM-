import React from "react";
import "./style.scss";
import { categories } from "../../utils/constants";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="category">
      <h1 className="heading  max-width">Eat what you like</h1>
      <div
        className="max-width cursor"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {categories.map((category) => (
          <Link to={`/category/${category.title}`} key={category.id}>
            <div className="category-image">
              <img src={category.image} alt="category-image" />
              <span>{category.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
