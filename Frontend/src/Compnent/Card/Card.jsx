import React from "react";
import "./Style/Card.css";
import { Cards } from "./StaticData/CardData";
import { NavLink } from "react-router-dom";

const Card = () => {
  return (
    <div className="card">
      <h2>New Cards</h2>
      {/* -------- main crad box  */}
      <div className="card_main">
        {Cards &&
          Cards.map((item, index) => {
            return (
              <NavLink to={`/singleCard/${item.id}`} key={index}>
                <div className="main_card_box">
                  <div className="main_card_fixed_div"></div>
                  <img src={item.img} alt="" />
                </div>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default Card;
