import React from "react";
import {BsStar,BsStarFill,BsStarHalf} from "react-icons/bs"
import "./addreview.css";
import ReactStars from "react-rating-stars-component";


const AddReview = () => {
    const rattingvalue = {
        size: 30,
        value: 3,
        edit: false
      };
      const addReview = {
        size: 30,
        count: 5,
        isHalf: false,
        value: 4,
        color: "black",
        activeColor: "yellow",
        onChange: newValue => {
          console.log(`Example 3: new value is ${newValue}`);
        }
      };
  return (
    <div className="addreview">
      {/* ------------ all reviews */}
      <div className="all_reviews">
        <h2>Reviews :</h2>
        <div className="review_single_box">
          <h1>M</h1>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              ipsum minima fuga soluta quod dolores, maiores nesciunt provident
              dolorem impedit.
            </p>
            <div className="star mx-[5px]">
               <ReactStars {...rattingvalue} />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- */}
      <h2>Be the first to review “Product Name”</h2>
      <div className="ratting_star">
        <p>Your Rating</p>
        <div className="star">
           <ReactStars {...addReview} />
        </div>
      </div>
      <div className="add_review_box">
        <p>Your Review</p>
        <textarea cols={10} rows={5} placeholder="Message" />
        <div className="second_inputs">
          <input type="text" placeholder="Order ID" />
          <input type="email" placeholder="Email Adress" />
        </div>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default AddReview;
