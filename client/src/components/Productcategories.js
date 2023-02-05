import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import "../styles/Productcategories.css";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";

function Productcategories() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function handleCartClick(id){
    const data = {
      id: id,
      number: 100,
      username: localStorage.getItem("loggedUser")
    }
    const response = await api.put(`order/cart`,data);
  };

  //check if logged in as admin
  let isAdmin = localStorage.getItem("loggedUser")==="admin";
 
  const handleWishlistClick = () => {};
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await api.get(`/product/category/${category}`);
      setProduct(data);
      setIsLoading(false);
    })();

    return () => {
      setProduct(null);
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(products);

  let avgRating = 0;
  let num = 0;
  function displayRating(product) {
    avgRating = 0;
    num = 0;

    product.rating.map((rate) => {
      avgRating += parseFloat(rate);
      num = num + 1;
    });

    return parseInt((avgRating / num) * 100) / 100;
  }

  return (
    <>
      <Topbar />
      <div className="categories-container">
        <div className="category-container">
          {isLoading && <div className="loader"></div>}
          {!isLoading &&
            products.map((product) => (
              <div className="individual-product-container" key={product._id}>
                <div
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                  }}
                  className="clickable-div"
                >
                  <div className="img-container">
                    <div className="individual-product-image">
                      <img
                        src={product.img}
                        className="individual-product-image"
                        alt="productimage"
                      ></img>
                    </div>
                  </div>
                  <div className="individual-text-container">
                    <div className="individual-name">
                      <h2>{product.name}</h2>
                    </div>
                    <div className="individual-price">
                      <h3>{product.price}</h3>
                    </div>
                    <div className="individual-rating">
                      <span>
                        Rating: {displayRating(product)} <AiTwotoneStar />
                      </span>
                    </div>
                  </div>
                </div>
                {!isAdmin && <div className="cart-button-container">
                      <button
                        className="cart-button primary-btn"
                        onClick={()=> {handleCartClick(product._id)}}
                      >
                        Add to cart
                      </button>
                      <button
                        className="wish-button primary-btn"
                        onClick={handleWishlistClick}
                      >
                        Add to wishlist
                      </button>                  
                </div>}

                {isAdmin && <div className="cart-button-container">
                      <button
                        className="cart-button primary-btn"
                        onClick={()=> {handleCartClick(product._id)}}
                      >
                        Remove product
                      </button>
                </div>}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Productcategories;
