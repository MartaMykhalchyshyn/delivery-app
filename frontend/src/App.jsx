import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shops from "./pages/Shops/Shops";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Layout from "./pages/Layout/Layout";
import CartProvider from "./store/CartProvider";
import axios from "axios";

function App() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/shops").then((response) => {
      setShops(response.data);
    });
  }, []);
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Shops shops={shops} />} />
            <Route path="shoppingcart" element={<ShoppingCart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
