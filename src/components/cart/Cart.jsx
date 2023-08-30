import React from "react";
import "./style.scss";
import emptyCart from "../../assets/emptyCart.avif";
import CartItem from "../cartItem/CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const { totalItems, items, totalAmount } = useSelector((state) => state.cart);

  return (
    <>
      (
      <div className="cart max-width">
        <div className="cart__total">
          <span>Total price : ₹{totalAmount}</span>
          <span> Total items : {totalItems}</span>
        </div>

        {items.length === 0 && (
          <div className="cart__img">
            <img src={emptyCart} alt="empty-cart" />
            <h1>Your cart is empty</h1>
          </div>
        )}

        <CartItem />
      </div>
      )
    </>
  );
};

export default Cart;
