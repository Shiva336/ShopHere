import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import "./Productcategories.css";
import { GiBurningDot } from "react-icons/gi";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
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
  return (
    <>
      <Navbar />
      <div className="categories-container">
        <p className="category-welcome-message">
          Welcome to {category} section!
        </p>
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
                    <h1>RATING HERE : @shiva</h1> {product.rating}
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
