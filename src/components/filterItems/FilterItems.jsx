import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import DishCard from "../dishCard/DishCard";

const FilterItems = () => {
  const { foodItems } = useSelector((state) => state.foods);

  return (
    <div className="filterItems max-width">
      <div className="filterItems-card">
        {foodItems
          ?.filter((item) => item.rate > 4.0)
          .map((item) => (
            <DishCard key={item.id} data={item} />
          ))}
      </div>
    </div>
  );
};

export default FilterItems;
