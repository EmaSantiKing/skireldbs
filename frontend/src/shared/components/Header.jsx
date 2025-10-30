import React, { useState, useEffect } from "react";
import "./header.css";

const images = [
  "/assets/hero-1.jpg",
  "/assets/hero-2.jpg",
  "/assets/hero-3.jpg",
];

export default function Header() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="hero-header">
      {images.map((img, i) => (
        <div
          key={i}
          className={`hero-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="hero-content">
        <h1 className="hero-text">
          The best <br />
          of the <br />
          winter <br />
          season
        </h1>
      </div>

      <div className="hero-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </header>
  );
}
