import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);
 const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "assets/carousel/carousel-1.jpg",
    "assets/carousel/carousel-2.jpg"
  ];

  const next = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex >= images.length ? 0 : nextIndex);
  };

  const prev = () => {
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex < 0 ? images.length - 1 : prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel" style={{ overflow: "hidden" }}>
      <button className="carousel__button carousel__button--prev" onClick={prev}>
      <FontAwesomeIcon icon="arrow-left" />
      </button>
      <img src={images[currentIndex]} className="carousel__image" alt="slide" />
      <button className="carousel__button carousel__button--next" onClick={next}>
      <FontAwesomeIcon icon="arrow-right" />
      </button>
    </div>
  );
};

export default Carousel;