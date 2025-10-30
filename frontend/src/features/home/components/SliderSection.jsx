import React from "react";
import Slider from "./Slider";
import "./slider-section.css";

const dir = "/assets/";

const products = [
    {
        name: "Top Babic",
        price: "$75.000",
        image: "top-babic.jpg",
    },
    {
        name: "Top Hrushi",
        price: "$85.000",
        image: "top-hrushi.jpg",
    },
    {
        name: "Top Luiza",
        price: "$85.000",
        image: "top-luiza.jpg",
    },
    {
        name: "Vestido Amaro",
        price: "$145.000",
        image: "vestido-amaro.jpg",
    },
    {
        name: "Trench Navis",
        price: "$245.000",
        image: "trench-navis.webp",
    },
];

for (let product of products) product.image = dir + product.image;

export default function SliderSection() {
    return (
        <section className="slider-section">
            <h2 className="slider-title"><em>Anticipo Season 26</em></h2>
            <Slider items={products} />
        </section>
    );
}
