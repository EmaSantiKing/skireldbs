import React, { useRef } from "react";
import "./slider.css";

export default function Slider({ items }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = container.offsetWidth / 1.2;
    if (direction === "left") container.scrollLeft -= scrollAmount;
    else container.scrollLeft += scrollAmount;
  };

  return (
    <div className="slider-container">
      <button className="slider-btn left" onClick={() => scroll("left")}>
        &#10094;
      </button>

      <div className="slider" ref={sliderRef}>
        {items.map((item, index) => (
          <div key={index} className="slide-item">
            <img src={item.image} alt={item.name} className="slide-image" />
            <p className="slide-caption">
              {item.name} <span className="slide-price">{item.price}</span>
            </p>
          </div>
        ))}
      </div>

      <button className="slider-btn right" onClick={() => scroll("right")}>
        &#10095;
      </button>
    </div>
  );
}
