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
      const response = await api.get(
        `/product`
      );
      setProducts(response.data);
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

  return (<div>
    <div className="product-container" id="product-container">
      <div>
    <h1 style={{alignItems: 'center',justifyContent: 'center'}}>FEATURED PRODUCTS</h1></div>
      <div className="product-grid">
          {products.map((product) => (
            <ProductBox text={product} key={product._id} />
          ))}
      </div>
    </div></div>
  );
}

export default Product;


// {loading && <div className="loader"></div>}
// {!loading &&
//   products.map((product) => (
//     <ProductBox text={product} key={product._id} />
//   ))}