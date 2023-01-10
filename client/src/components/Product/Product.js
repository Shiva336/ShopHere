import ProductBox from "./ProductBox";
import "./Product.css";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../api";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      setLoading(true);
      const response = await api.get(
        `/Users`
      );
      const { data } = response.data;
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    <div className="product-container" id="product-container">
      <h1>FEATURED</h1>
      <div className="product-grid">
        {loading && <div className="loader"></div>}
        {!loading &&
          products.map((product) => (
            <ProductBox text={product} key={product._id} />
          ))}
      </div>
    </div>
  );
}

export default Product;
