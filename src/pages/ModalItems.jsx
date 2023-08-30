import React, { useEffect, useState } from "react";
import "../styles/style.pages.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DishCard from "../components/dishCard/DishCard";

const ModalItems = () => {
  const { foodItems } = useSelector((state) => state.foods);
  const [isPopular, setIsPopular] = useState(false);
  const [isHigher, setIsHigher] = useState(false);
  const [isLower, setIsLower] = useState(false);
  const { modalItems: value } = useParams();
  useEffect(() => {
    if (value === "popular") {
      setIsPopular(true);
      setIsHigher(false);
      setIsLower(false);
    } else if (value === "higher") {
      setIsHigher(true);
      setIsPopular(false);
      setIsLower(false);
    } else if (value === "lower") {
      setIsLower(true);
      setIsPopular(false);
      setIsHigher(false);
    }
  }, [value]);

  return (
    <div className="modalItems max-width">
      {isPopular && (
        <>
          <div>
            <h1 className="heading">Popular Dishes</h1>
            <div className="modalItems-card">
              {foodItems
                ?.slice()
                .sort((a, b) => b.count - a.count)
                .map((item) => (
                  <DishCard data={item} key={item.id} />
                ))}
            </div>
          </div>
        </>
      )}

      {isHigher && (
        <>
          <div>
            <h1 className="heading">Cost: High to Low</h1>
            <div className="modalItems-card">
              {foodItems
                ?.slice()
                .sort((a, b) => b.price - a.price)
                .map((item) => (
                  <DishCard data={item} key={item.id} />
                ))}
            </div>
          </div>
        </>
      )}

      {isLower && (
        <>
          <div>
            <h1 className="heading">Cost: Low to High</h1>
            <div className="modalItems-card">
              {foodItems
                ?.slice()
                .sort((a, b) => a.price - b.price)
                .map((item) => (
                  <DishCard data={item} key={item.id} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalItems;
