import GoodsCard from "../GoodsCard/GoodsCard";
import "./ShopGoods.css";

const ShopGoods = ({ goods }) => {
  return (
    <div className="goods-container">
      {goods.map((good) => (
        <GoodsCard
          id={good.id}
          title={good.title}
          price={good.price}
          shopId={good.shop_id}
        />
      ))}
    </div>
  );
};

export default ShopGoods;
