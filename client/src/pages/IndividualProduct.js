import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import RatingStars from "../components/RatingStars";
import { api } from "../api";
import "../styles/IndividualProduct.css";
import Rating from "./Rating";
import { animateScroll as scroll } from "react-scroll";

function IndividualProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState([]);
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
    });

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
          <div>
            <button
              className="cart-button primary-btn"
              onClick={() => {
                handleCartClick(product._id, product.price);
              }}
            >
              Add to cart 
            </button>
            {getRating(product)} <AiTwotoneStar />
          </div>
          {product && (
        <div>
          <div className="rating-section"> 
            <RatingStars />
          </div>
          <div className="reviews-section">
            <h1>Write a review: </h1>
            <textarea
              className="review-textarea"
              onChange={updateReview}
            ></textarea>
            <button className="review-button" onClick={storeReview}>
              Submit
            </button>

            <h1>Reviews</h1>
            {product.reviews.map((review) => {
              return <div key={review.length} className="review">{review}</div>;
            })}
          </div>
        </div>
      )}
          <div>submit review form</div>
          <div id="ind-rev-cont">reviews</div>
        </div>
      )}
    </>
  );
}

export default IndividualProduct;
