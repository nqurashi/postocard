import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiFillSkype,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";
import { useSelector } from "react-redux";

const footerbox1 = [
  "New arrivals",
  "Best selling",
  "Recently viewed",
  "Popular this week",
  "All products",
];

const footerbox2 = [
  "Birthday",
  "E-Cards",
  "Gift Cards",
  "Smash ups",
  "Wedding",
  "Anniversary",
];

const footerbox3 = [
  "About us",
  "Careers",
  "Contact us",
  "Privacy",
  "Returns policy",
];


const Footer = () => {
  const allcategory = useSelector((state)=> state.category.allcategoryforuser)

  return (
    <div className="footer">
      <div className="footer1">
        {/* <div className="footer1_box">
          <h2>Menu</h2>
          {footerbox1.map((item, index) => (
            <NavLink to="/" key={index}>
              <li>{item}</li>
            </NavLink>
          ))}
        </div> */}
        {/* -- */}
        <div className="footer1_box flex justify-between place-items-center w-full">
          <h2>Categories</h2>
         <div className="flex justify-between place-items-center  gap-[20px]">
           <ul  className="">
         {/* {allcategory?.map((item, index) => {
          return (
             <NavLink key={index} to={`/products/${item.CategoryName}`}>
             <li>{item.CategoryName}</li>
             </NavLink>
          );
        })} */}
       <NavLink to={"/contactus"}>
       <li>Contact-Us</li>
       </NavLink>
       <NavLink to={"/aboutus"}>
       <li>About-Us</li>
       </NavLink>
       <NavLink to={"/privacypolicy"}>
       <li>Privacy-policy</li>
       </NavLink>
       <NavLink to={"/termsconditions"}>
       <li>terms-conditions</li>
       </NavLink>
       <NavLink to={"/refundpolicy"}>
       <li>Refund-Policy</li>
       </NavLink>
        </ul>
         </div>
        </div>
        {/* ---- */}
        {/* <div className="footer1_box">
          <h2>Our company</h2>
          {footerbox3.map((item, index) => (
            <NavLink to="/" key={index}>
              <li>{item}</li>
            </NavLink>
          ))}
        </div> */}
        {/* ---- */}
        {/* <div className="footer1_box4">
          <h2>Join our mailing list</h2>
          <div className="input">
            <input type="text" placeholder="your@gmail.com" />
            <button>Sign up</button>
          </div>
        </div> */}
      </div>
      {/* -------------  */}
      <div className="footer2">
        <div className="footer2_box1">
          <h2>Copyright 2023 PostoCard</h2>
        </div>
        <div className="footer2_box2">
          <AiFillLinkedin />
          <AiFillFacebook />
          <AiFillInstagram />
          <AiFillSkype />
          <AiFillTwitterCircle />
          <BsPinterest />
        </div>
      </div>
    </div>
  );
};

export default Footer;
