import React from "react";
import "../Styles/Hero.css";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      {/* -------- left  */}
      <div className="left_hero">
        <h2>Lets gather for the extreme Fun..</h2>
        <NavLink to={"/allcollection/all"}>
          <button className="rounded-md">View collection</button>
        </NavLink>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer.
        </p>
      </div>
      {/* ----------- */}
      <div className="right_hero">
        <img src="./data/hero/hero.svg" alt="" />
      </div>
    </div>
  );
};

export default Hero;
