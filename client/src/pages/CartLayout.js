import { useState, useEffect } from "react";
import { api } from "../api";

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
  return <div className="cart-layout">
    {!cartLoading&&
        <div className="cart-product-container">
          <img src={cartItems.img}></img>
          <div>{cartItems.name}</div>
          <div>{cartItems.price}</div>
        </div>
    }
  </div>;
}

export default CartLayout;
