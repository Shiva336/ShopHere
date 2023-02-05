import React from "react";
import { useEffect, useState } from "react";
import CartLayout from "./CartLayout";
import { api } from "../api";
import "../styles/Cart.css";

import {Link} from "react-router-dom";

function Cart() {
  const [products, setProducts] = useState([{}]);
  const [total,setTotal]=useState(0);
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
      setTotal(response.data.total);  
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

  let stotal=total.toString();
  var lastThree = stotal.substring(stotal.length-3);
    var otherNumbers = stotal.substring(0,stotal.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
//https://stackoverflow.com/questions/16037165/displaying-a-number-in-indian-format-using-javascript
  return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {products.length === 0 ?(
          <div className="cart-empty">
            <p>Your Cart is Currently Empty</p>
            <div className="start-shopping">
                    <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                        <span>Start Shopping</span>
                    </Link>

                </div>
          </div>   
        ) : (
          
      <div>
        <div className="titles">
            <h3 className="product-tittle">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
      {loading && <div className="loader"></div>}
      {!loading &&
        
        products.map((product) => {
          return(<CartLayout text={product} key={product.id}/>)
        })}
        </div>

        )}

    

          <div className="cart-summary">
                <button className="clear-cart" >
                    Clear Cart
                    </button>
                <div className="cart-checkout">
                <div className="subtotal">
                        <span>SubTotal</span>
                        <span className="amount">₹{res}</span>
                    </div>
                    <p>Taxes and Shipping calculated at checkout</p>
                    <button>Check out</button>
                    <div className="continue-shopping">
                    <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                        <span>Continue Shopping</span>
                    </Link>

                </div>
                </div>

               </div>


    </div>

  );
}

export default Cart;