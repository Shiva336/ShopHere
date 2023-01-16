import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import "./Productcategories.css";
import { GiBurningDot } from "react-icons/gi";
import Navbar from "../Navbar/Navbar";
function Productcategories() {
  const { category } = useParams();
  const [products, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <div>
        Welcome to {category} section!
        <div className="category-container">
          {isLoading && <div className="loader"></div>}
          {!isLoading &&
            products.map((product) => (
              <div className="individual-product-container">
                <img src={product.img} alt="product-image"></img>
                <div className="individual-text-container">
                  <div className="individual-name">
                    <h1>{product.name}</h1>
                  </div>
                  <div className="individual-price">
                    <h3>{product.price}</h3>
                  </div>
                  <div className="individual-highlights">
                    <h2>Highlights</h2>
                    {product.highlights.map((highlight) => (
                      <div>
                        <GiBurningDot />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <div className="individual-rating">{product.rating}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Productcategories;
