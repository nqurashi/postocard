import React from "react";
import Hero from "./Hero/Hero";
import "./About.css";
import AnimateLoading from "../../Layout/Loading/AnimateLoading";
import SVG from "../../Layout/Loading/about.json";
import SVG2 from "../../Layout/Loading/mission.json";

const Index = () => {
  return (
    <div>
      <Hero />
      {/* ===== content  */}
      <div className="About_Content">
        <div className="about_container1">
          {/* <h2>About Us</h2> */}
          <p>
            Welcome to <strong>Postocard</strong>, your go-to destination for
            beautifully crafted holiday cards that spread joy and warmth on
            special occasions. At Postocard, we're passionate about celebrating
            life's precious moments with heartwarming greetings. Our journey
            began with a simple idea: to make it easy for you to express your
            love, appreciation, and well-wishes to your loved ones through our
            artistic and thoughtful cards.
          </p>
          {/* <img src="https://edmy-react.hibootstrap.com/images/testimonials/testimonial-1.png" alt="" /> */}
        </div>
        <div className="about_container2">
          <div className="about_container2_content">
            <h2 className="text-2xl font-bold mb-2">What Sets Us Apart?</h2>
            <p>
              <strong>Exceptional Designs</strong>: We take pride in our
              exquisite card designs that are thoughtfully created to capture
              the essence of each celebration. Whether it's Eid, Christmas,
              Diwali, or any other special occasion, Postocard designs are meant
              to resonate with the emotions you want to convey.
              <br />
              <br /> <strong>Quality and Craftsmanship</strong>: We believe in
              the art of card-making and pay meticulous attention to every
              detail. Our cards are crafted with premium materials, ensuring
              each one is a work of art.
              <br />
              <br /> <strong>Personal Touch</strong>: We understand the
              significance of personalized greetings. That's why we offer
              customization options to add your unique touch to each Postocard.
            </p>
          </div>
          <AnimateLoading SVGGET={SVG} />
        </div>
        <div className="about_container3">
          <div className="about_container3_svg">
          <AnimateLoading SVGGET={SVG2} />
          </div>
          <div className="about_container3_content">
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p>
              <strong>Our Commitment to You</strong>: At Postocard, our
              commitment to you is unwavering. We exist to create moments of joy
              and connection through our beautifully crafted holiday cards. Our
              mission is simple: to be a part of your cherished moments by
              providing cards that make your loved ones smile emotions you want
              to convey.
              <br />
              <br /> <strong>Driving Our Purpose</strong>: Our purpose is clear
              - to drive the art of meaningful communication through our holiday
              cards. At Postocard, we understand the significance of
              celebrations and the emotions they carry.
              <br />
              <br /> <strong>Crafting Moments of Joy</strong>: At Postocard, our
              passion lies in crafting moments of joy. Our mission is evident:
              to be a part of your cherished moments by providing cards that
              make your loved ones smile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
