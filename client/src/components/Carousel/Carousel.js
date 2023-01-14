import React, { useState, useEffect } from "react";
import {FaArrowCircleRight,FaArrowCircleLeft} from 'react-icons/fa'
import { useCallback } from 'react';

import "./Carousel.css";
 const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "assets/carousel/carousel-1.jpg",
    "assets/carousel/carousel-2.jpg"
  ];
  const next = useCallback(() => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex >= images.length ? 0 : nextIndex);
  }, [currentIndex,images.length]);
  const prev = () => {
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex < 0 ? images.length - 1 : prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3500);
    return () => clearInterval(interval);
  }, [currentIndex,next]);

  return (
    <div className="carousel" style={{ overflow: "hidden" }}>
      <button className="carousel__button carousel__button--prev" onClick={prev}>
      <FaArrowCircleLeft />
      </button>
      <img src={images[currentIndex]} className="carousel__image" alt="slide" />
      <button className="carousel__button carousel__button--next" onClick={next}>
      <FaArrowCircleRight/>
      </button>
    </div>
  );
};

export default Carousel;