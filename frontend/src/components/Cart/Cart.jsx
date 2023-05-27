import React, { useContext } from "react";

import "./Cart.css";
import CartItem from "../CartItem/CartItem";
import CartContext from "../../store/cart-context";
import axios from "axios";

const Cart = ({ formData, disableOrderButton }) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const createOrder = (orderData) => {
    axios
      .post("http://localhost:4000/api/orders", orderData)
      .then((response) => {
        const orderId = response.data.orderId;
        console.log("Order created with ID:", orderId);
        createOrderItems(orderId, orderData.items);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  const createOrderItems = (orderId, items) => {
    const orderItems = items.map((item) => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    axios
      .post("http://localhost:4000/api/orderItems", orderItems)
      .then((response) => {
        console.log("Order items created");
      })
      .catch((error) => {
        console.error("Error creating order items:", error);
      });
  };

  const createOrderHandler = (e) => {
    e.preventDefault();

    const orderData = {
      name: formData.name,
      email: formData.email,
      total: cartCtx.totalAmount,
      address: formData.address,
      phone: formData.phone,
      shop_id: cartCtx.items[0].shop_id,
      items: cartCtx.items.map((item) => ({
        product_id: item.id,
        quantity: item.amount,
        price: item.price,
      })),
    };

    const cartDataString = JSON.stringify(orderData.items);
    localStorage.setItem("orderData", cartDataString);

    createOrder(orderData);
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          title={item.title}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <div className="cart-container">
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className="actions">
        {hasItems && (
          <button disabled={disableOrderButton} onClick={createOrderHandler} className="button">
            Order
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
