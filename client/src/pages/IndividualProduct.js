import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import RatingStars from "../components/RatingStars";
import { api } from "../api";
import "../styles/IndividualProduct.css";
import Rating from "./Rating";
import { animateScroll as scroll } from "react-scroll";
import { VscDebugBreakpointLog } from "react-icons/vsc";
function IndividualProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [rated, setRated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState("");

  async function handleCartClick(id, price) {
    let productPrice = 0;
    let len = price.length;
    for (let i = 0; i < len; i++) {
      if (price[i] >= "0" && price[i] <= "9") {
        productPrice = productPrice * 10 + parseInt(price[i]);
      }
    }
    const data = {
      id: id,
      number: 100,
      username: localStorage.getItem("loggedUser"),
      price: productPrice,
    };
    console.log(data);
    const response = await api.put(`order/cart`, data);
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await api.get(`/product/${id}`);
      setProduct(data);
      setIsLoading(false);
    })();
  }, []);

  let avgRating = 0;
  let num = 0;
  function getRating(product) {
    avgRating = 0;
    num = 0;
    product.rating.map((rate) => {
      avgRating += parseFloat(rate.rating);
      num = num + 1;
      if (!rated) {
        setRated(true);
      }
    });
    if (product.rating.length === 0) {
      return "No reviews yet";
    }
    return parseInt((avgRating / num) * 100) / 100;
  }

  const storeReview = () => {
    const data = {
      newreview: review,
    };
    const response = api.put(`/product/${id}/review`, data);
  };

  const updateReview = (e) => {
    setReview(e.target.value);
  };
  const scrollToReviews = () => {
    const element = document.getElementById("ind-rev-cont");
    scroll.scrollTo(element.offsetTop);
  };
  return (
    <>
      {isLoading && <div className="loader"></div>}
      {product && (
        <div className="ind-pro-cont">
          <div className="ind-image-specs">
            <div className="ind-img-cont">
              <img
                src={product.img}
                alt="Product IMG"
                className="ind-pro-img"
              />
            </div>
            <div className="ind-specs-cont">
              <div className="ind-pro-name">
                <h1>{product.name}</h1>{" "}
                <div className="separate-rr-cont">
                  <div className="separate-ratings">
                    {product.rating.length} ratings
                  </div>
                  <div style={{ padding: "0px 10px" }}>and</div>
                  <div className="separate-reviews" onClick={scrollToReviews}>
                    {product.reviews.length} reviews
                  </div>
                </div>
              </div>
              <div className="ind-specs-content-cont">
                <div className="ind-text-cont">
                  <div className="separate-hl">
                    <h2 className="hl-header">Specifications</h2>
                    {product.highlights.map((highlight, i) => (
                      <div className="separate-highlights" key={i}>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="btn-rev-cont">
            <div>
              <button
                className="cart-button primary-btn"
                onClick={() => {
                  handleCartClick(product._id, product.price);
                }}
              >
                Add to cart
              </button>
            </div>
            <div className="rating-text">
              {getRating(product)} {rated && <AiTwotoneStar />}
            </div>
          </div>
          {product && (
            <div>
              <div className="rating-section">
                <RatingStars />
              </div>
            </div>
          )}
          <div className="rev-container">
            <h1 className="rev-review-text">Write a review : </h1>
            <textarea
              className="review-textarea"
              onChange={updateReview}
            ></textarea>
          </div>
            <button className="review-button" onClick={storeReview}>
              Submit
            </button>
            <h1 className="review-text-header">Reviews</h1>
          <div id="ind-rev-cont">
            {product.reviews.map((review) => {
              return (
                <div key={review.length} className="ind-review">
                  <div className="review-ind-cont">
                  <VscDebugBreakpointLog size="30" className="bullet-icon"/><div className="ind-rev-text-wrap">{review}</div></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default IndividualProduct;
