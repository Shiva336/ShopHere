import React from "react";
import { useEffect, useState } from "react";
import CartLayout from "./CartLayout";
import { api } from "../api";
import "../styles/Cart.css";

let index=0;
function Cart() {
  const [products, setProducts] = useState([{}]);
  const [loading, setLoading] = useState(true);
  async function getData() {
    try {
      setLoading(true);
      let curr_user = localStorage.getItem("loggedUser");
      const data = {
        username: curr_user,
      };
      const response = await api.put(`order/show`, data);
      setProducts(response.data.items);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  }
  useEffect(() => {
    (async () => {

      await getData();
    })();
    return () => {};
  }, []);
  return (
    <div>
      {loading && <div className="loader"></div>}
      {!loading && products && 
        products.map((product) => {

          return(<CartLayout text={product} key={product.id}/>)
        })}
    </div>
  );
}

export default Cart;
