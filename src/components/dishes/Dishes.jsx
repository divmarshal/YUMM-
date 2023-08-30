import React from "react";
import "./style.scss";
import DishCard from "../dishCard/DishCard";
import { useSelector } from "react-redux";

const Dishes = () => {
  const { foodItems } = useSelector((state) => state.foods);

  return (
    <div className="dishes max-width">
      <h1 className="heading">Top picks for you</h1>
      <div className="dishes-card">
        {foodItems?.map((item) => (
          <DishCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Dishes;
