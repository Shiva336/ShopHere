import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      console.log(id);
      const { data } = await api.get(`/product/${id}`);
      setProduct(data);
      console.log(data);
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
      <div className="separate-products-container" id="home-container">
        {isLoading && <div className="loader"></div>}
        {product && (
          <div className="separate-product-details">
            <div className="separate-image-container">
              <img
                src={product.img}
                alt="Product IMG"
                className="separate-product-image"
              />
            </div>
            <div className="separate-text-container">
              <h1>{product.name}</h1>
              <div className="separate-rr-cont">
                <div className="separate-ratings">
                  {product.rating.length} ratings
                </div>
                <div style={{ padding: "0px 10px" }}>and</div>
                <div className="separate-reviews">
                  {product.reviews.length} reviews
                </div>
              </div>
              <div className="separate-hl">
                <h2 className="hl-header">Specifications</h2>
                {product.highlights.map((highlight) => (
                  <div className="separate-highlights">{highlight}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
