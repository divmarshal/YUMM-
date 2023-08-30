import React from "react";
import "../styles/style.pages.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DishCard from "../components/dishCard/DishCard";

const CategoryDish = () => {
  const { foodItems } = useSelector((state) => state.foods);
  const { categoryDish: category } = useParams();

  return (
    <div className="dishCategory max-width">
      <h1 className="heading">{category}</h1>
      <div className="dishCategory-card">
        {foodItems
          ?.filter((item) => category.toLowerCase() === item.category)
          .map((item) => (
            <DishCard key={item.id} data={item} />
          ))}
      </div>
    </div>
  );
};

export default CategoryDish;
