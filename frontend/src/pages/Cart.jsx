import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

  return (
    <div>
      {cart.map(item => (
        <div key={item.productId._id}>
          <span>{item.productId.name}</span>
          <span>{item.quantity}</span>
          <span>{item.productId.price}</span>
          <button onClick={() => removeFromCart(item.productId._id)}>Remove</button>
        </div>
      ))}
      <h2>Total: {total}</h2>
      <button>Checkout</button>
    </div>
  );
}