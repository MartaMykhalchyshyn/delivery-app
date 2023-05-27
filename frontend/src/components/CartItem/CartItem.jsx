import "./CartItem.css";

const CartItem = ({ id, price, onRemove, onAdd, amount, title }) => {
  const priceFormatted = `$${price}`;

  return (
    <li className="cart-item">
      <img src={`http://localhost:4000/api/goods/image/${id}`} alt="" />
      <div>
        <h2>{title}</h2>
        <div className="summary">
          <span className="price">{priceFormatted}</span>
          <span className="amount">x {amount}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
