import React from "react";
import "../styles/style.pages.scss";
import { FaShoppingBag, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItemToCart } from "../store/cart-slice";

const DishDetails = () => {
  const { foodItems } = useSelector((state) => state.foods);
  const dispatch = useDispatch();
  const { dishId: id } = useParams();
  const navigate = useNavigate();

  const handleCart = (item) => {
    navigate("/cart");
    dispatch(addItemToCart(item));
  };

  return (
    <>
      {foodItems
        ?.filter((item) => item.id === id)
        .map((item) => (
          <div className="dishDetail max-width" key={item.id}>
            <img src={item.image} alt="dish-image" />
            <div className="dishDetail-brand">
              <h1>{item.brand}</h1>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    padding: "2px 4px",
                    backgroundColor: "green",
                    borderRadius: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    {item.rate}
                  </span>
                  <FaStar style={{ fontSize: "8px", color: "#fff" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {item.count}
                  </span>
                  <p style={{ fontSize: "12px", color: "#838383" }}>
                    Dining Reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="dishDetail-title">
              <span style={{ textTransform: "capitalize" }}>{item.title}</span>
              <span
                style={{ fontSize: "16px", fontWeight: "600", color: "#000" }}
              >
                ₹{item.price}
              </span>
            </div>
            <button className="dishDetail-btn" onClick={() => handleCart(item)}>
              <FaShoppingBag style={{ color: "#ff7e8b" }} />
              Add item to cart
            </button>
          </div>
        ))}
    </>
  );
};

export default DishDetails;
