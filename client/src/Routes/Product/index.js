import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import "./index.css";

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      console.log(id)
      const { data } = await api.get(`/product/${id}`);
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
      <div className="products-container" id="home-container">
        {isLoading && <div className="loader"></div>}
        {product && (
          <>
            <img
              src={
                product.img
              }
              alt="Product IMG"
            />
            <div className="product-details">
              <h1>{product.name}</h1>
              <p>{product.highlights}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
