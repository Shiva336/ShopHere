import "./ProductBox.css";
import { useNavigate } from "react-router-dom";

function ProductBox(props) {
  const { text } = props;
  const navigate = useNavigate();
  return (
    <div className="product-box" id="featured-products">
      <div className="image-container"><img
        src={text.img}
        alt="Product IMG"
        onClick={() => {
          navigate(`/product/${text._id}`);
        }}
      /></div>
      <h2>{text.name}</h2>
      <div className="card-content">
        <div className="flex">
          <p> {text.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
