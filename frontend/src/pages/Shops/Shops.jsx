import { useState, useEffect } from "react";
import ShopsList from "../../components/ShopsList/ShopsList";
import ShopGoods from "../../components/ShopGoods/ShopGoods";
import axios from "axios";

import "./Shops.css";

const Shops = ({ shops }) => {
  const [selectedShopId, setSelectedShopId] = useState("");
  const [goodsData, setGoodsData] = useState([]);

  const onSelectHandler = (shopId) => {
    setSelectedShopId(shopId);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/goods/${selectedShopId}`
        );
        setGoodsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    selectedShopId && fetchProduct();
  }, [selectedShopId]);

  return (
    <div className="shops-page-layout">
      <ShopsList shops={shops} onSelectHandler={onSelectHandler} />
      {selectedShopId && <ShopGoods goods={goodsData} />}
    </div>
  );
};

export default Shops;
