import React from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DishCard from "../dishCard/DishCard";

const SearchFeed = () => {
  const { foodItems } = useSelector((state) => state.foods);
  const { searchTerm } = useParams();

  return (
    <div className="searchfeed max-width">
      <div className="searchfeed-card">
        {foodItems
          ?.filter((item) => item.category.toLowerCase() === searchTerm)
          .map((item) => (
            <DishCard data={item} key={item.id} />
          ))}
      </div>
    </div>
  );
};

export default SearchFeed;
