import { useContext } from "react";
import CartContext from "../../store/cart-context";
import "./ShopsList.css";

const ShopsList = ({ shops, onSelectHandler }) => {
  const cartCtx = useContext(CartContext);
  return (
    <div className="shops-list">
      <h3>Shops:</h3>
      <ul>
        {shops.map((shop) => (
          <li>
            <button
              disabled={
                cartCtx.items.length > 0 &&
                cartCtx.items[0]?.shop_id !== shop.id
              }
              onClick={() => onSelectHandler(shop.id)}
            >
              {shop.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopsList;
