import { useState } from "react";
import Cart from "../../components/Cart/Cart";
import OrderForm from "../../components/OrderForm/OrderForm";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const isFormEmpty = formData.name === '' || formData.email === '' || formData.phone === '' || formData.address === '';

  const onSelectHandler = ({ name, value }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="shoppingcart-page-layout">
      <OrderForm onSelectHandler={onSelectHandler} />
      <Cart formData={formData} disableOrderButton={isFormEmpty} />
    </div>
  );
};

export default ShoppingCart;
