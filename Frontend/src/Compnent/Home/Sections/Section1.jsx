import React from "react";
import "../Styles/Section1.css";
import { TbTruckDelivery } from "react-icons/tb";
import { PiPlantThin } from "react-icons/pi";
import { AiOutlineCheckCircle, AiOutlineCreditCard } from "react-icons/ai";

const Section1 = () => {
  return (
    <div className="section1">
      <h2>What makes us different</h2>
      {/* ---------- */}
      <div className="section1_box_parent">
        <div className="section1_box">
          <TbTruckDelivery />
          <h3>Next day as standard </h3>
          <p>
            Order before 3pm and get your order the next day as standard working
            days.
          </p>
        </div>
        <div className="section1_box">
          <AiOutlineCheckCircle />
          <h3>Made by true </h3>
          <p>Gift cards are made with real passion, love and companionship.</p>
        </div>
        <div className="section1_box">
          <AiOutlineCreditCard />
          <h3>Unbeatable prices</h3>
          <p>
            For our materials and quality you wont't find better prices
            anywhere.
          </p>
        </div>
        <div className="section1_box">
          <PiPlantThin />
          <h3>Recycled Packaging</h3>
          <p>
            We user 100% recycled packaging to ensure our footprint is
            manageable
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section1;
