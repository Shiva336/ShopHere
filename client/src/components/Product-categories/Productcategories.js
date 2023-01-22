import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import "./Productcategories.css";
import { GiBurningDot } from "react-icons/gi";
import Topbar from "../topbar/Topbar";
import { useNavigate } from "react-router-dom";
import {AiTwotoneStar} from 'react-icons/ai'
function Productcategories() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleCartClick =() => {}
  const handleWishlistClick=()=>{}
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

  let avgRating = 0;
  let num = 0;
  function displayRating(product) {
    avgRating=0; num=0
                    {product.rating.map((rate)=> {
                      avgRating+= parseFloat(rate);
                      num = num+1;
                    })}
    return (parseInt((avgRating/num)*100))/100
  }
  return (
    <>
      <Topbar />
      <div className="categories-container">
        <div className="category-container">
          {isLoading && <div className="loader"></div>}
          {!isLoading &&
            products.map((product) => (
              <div className="individual-product-container"  onClick={() => {
                navigate(`/product/${product._id}`);
              }}>
                <div className="img-btn">
                  <img src={product.img} alt="productimage"></img>
                  <div className="cart-button-container">
                    <button className="cart-button primary-btn" onClick={handleCartClick}>Add to cart</button>
                    <button className="wish-button primary-btn" onClick={handleWishlistClick}>Add to wishlist</button>
                  </div>
                </div>
                <div className="individual-text-container">
                  <div className="individual-name">
                    <h1>{product.name}</h1>
                  </div>
                  <div className="individual-price">
                    <h3>{product.price}</h3>
                  </div>
                  <div className="individual-highlights">
                    {product.highlights.map((highlight) => (
                      <div>
                        <GiBurningDot className="icon-highlights" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <div className="individual-rating">
                  
                  <span> Rating: {displayRating(product)} <AiTwotoneStar/> </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Productcategories;
