import { useState, useEffect } from "react";
import { api } from "../api";
import "../styles/Cart.css";

function CartLayout(props) {
  const { text } = props;
  const [cartItems, setCartItems] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  async function getCartData() {
    try {
      setCartLoading(true);
      let { data } = await api.get(`/product/${text.id}`);
      setCartItems(data);
      setCartLoading(false);
    } catch (e) {
      console.log(e);
      setCartLoading(true);
    }
  }
  useEffect(() => {
    (async () => {
      await getCartData();
    })();
    return () => {};
  }, []);

  const handleRemoveFromCart = cartItems;

  const handleDecreaseCart = cartItems;

  const handleIncreaseCart = cartItems;

  return (
    <div className="cart-layout">
      {!cartLoading && (
        <div className="cart-container">

          <div className="cart-items">
            <div className="Cart-product">
              <img src={cartItems.img} className="cart-product-image"></img>
              <div>
                <h3>{cartItems.name}</h3>
                <button onClick={() => handleRemoveFromCart(cartItems)}>
                  Remove
                </button>
              </div>
            </div>
            <div className="car-product-price">{cartItems.price}</div>
            <div className="cart-product-quantity">
              <button onClick={() => handleDecreaseCart(cartItems)}>-</button>
              <div className="count">{text.quantity}</div>
              <button onClick={() => handleIncreaseCart(cartItems)}>+</button>
            </div>
            <div className="cart-product-total-price">
                ₹{cartItems.price * text.quantity}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartLayout;
