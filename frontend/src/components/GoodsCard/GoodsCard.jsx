import { useContext } from "react";
import CartContext from "../../store/cart-context";
import "./GoodsCard.css";

const GoodsCard = ({ id, title, price, shopId }) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: id,
      title: title,
      amount: 1,
      price: price,
      shop_id: shopId,
    });
  };

  return (
    <div className="goods-card__container">
      <img
        className="goods-card__image"
        src={`http://localhost:4000/api/goods/image/${id}`}
        alt=""
      />
      <div className="goods-card__description">
        <p className="goods-card__title">{title}</p>
        <p className="goods-card__price">${price}</p>
      </div>
      <button className="goods-card__button" onClick={addToCartHandler}>
        Add To Cart
      </button>
    </div>
  );
};
export default GoodsCard;
