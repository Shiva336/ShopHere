import "./ProductBox.css";
import { useNavigate } from "react-router-dom";

function ProductBox(props) {
  const { text } = props;
  const navigate = useNavigate();
  return (
    <div className="featured-product-box" id="featured-products" 
    onClick={() => {
      navigate(`/product/${text._id}`);
    }}>
      <div className="featured-image-container">
        <img
          src={text.img}
          alt="Product IMG"
        />
      </div>
      <div className="featured-text-container">
        <h2>{text.name}</h2>
        <div className="featured-card-content">
          <div className="featured-flex">
            <p> {text.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
