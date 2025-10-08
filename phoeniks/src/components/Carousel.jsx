import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide3.png";
import slide3 from "../assets/old1.jpeg";

const HomeCarousel = () => (
  <Carousel>
    <Carousel.Item>
      <img className="d-block w-100 carousel-img" src={slide1} alt="First slide" />
      <Carousel.Caption>
        <h3>Welcome to Phoeniks</h3>
        <p>Your gateway to unique digital card solutions.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100 carousel-img" src={slide2} alt="Second slide" />
      <Carousel.Caption>
        <h3>Accessible for All</h3>
        <p>Empowering persons with disabilities with accessible services.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100 carousel-img" src={slide3} alt="Third slide" />
      <Carousel.Caption>
        <h3>Apply Easily</h3>
        <p>Simplified and user-friendly card registration process.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default HomeCarousel;
