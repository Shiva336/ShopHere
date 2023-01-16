import ProductBox from "./ProductBox";
import "./Product.css";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../api";

function Product() {
  const [products, setProducts] = useState([{}]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      setLoading(true);
      const response = await api.get(`/product/featured`);
      setProducts(response.data);
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
      <div className="featured-product-container" id="featured-product-container">
        <div>
          <h1 className="featured-shimmering-text">FEATURED PRODUCTS</h1>
        </div>

        <div className="featured-product-grid">
          {loading && <div className="loader"></div>}
          {!loading &&
            products.map((product) => (
                <ProductBox text={product} key={product._id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Product;

