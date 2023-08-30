import React from "react";
import "./style.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  decreaseItemQuantity,
  removeItemFromCart,
} from "../../store/cart-slice";

const CartItem = () => {
  const { items: products } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <>
      {products?.map((product) => (
        <div className="cartItem" key={product?.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <img
              src={product?.image}
              alt="cart-item"
              className="cartItem__img"
            />
            <button
              onClick={() => dispatch(removeItemFromCart({ ...product }))}
            >
              {" "}
              <RxCross2 />
            </button>
          </div>
          <h3 className="cartItem__title">{product?.title}</h3>
          <div className="cartItem__quantity">
            <button onClick={() => dispatch(decreaseItemQuantity(product?.id))}>
              <AiOutlineMinus />
            </button>
            <div>
              <input type="text" value={product?.quantity}></input>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addItemToCart({
                    ...product,
                    quantity: 1,
                    totalPrice: product?.price,
                  })
                )
              }
            >
              <AiOutlinePlus />
            </button>
          </div>

          <div className="cartItem__price">
            <h3 className="product__price" style={{ fontSize: "16px" }}>
              ₹{product?.totalPrice}
            </h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
