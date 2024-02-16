import React from "react";
import "../Styles/UpderHeader.css";
import { BsTelephone } from "react-icons/bs";
import {
  AiOutlineMail,
  AiFillInstagram,
  AiFillYoutube,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const UpderHeader = () => {
  return (
    <>
      <div className="uper_header">
        {/* ------------ left header  */}
        {/* <div className="uper_left_header flex justify-center place-items-center gap-[10px] text-white">
         
          <div className="uper_left_1 flex justify-between place-items-center gap-[5px]">
            <BsTelephone />
            <p>(92) 321-0118444</p>
          </div>
          <div className="uper_left_2 flex p-[5px] justify-between place-items-center gap-[5px]">
            <AiOutlineMail />
            <p>ubaid@postocard.com</p>
          </div>
        </div> */}

        {/* ------------- midlle  */}
        <div className="uper_middle_header">
          <p>Follow Us and get a chance to win 80% off</p>
        </div>
        {/* ------ right header  */}
        <div className="uper_right_header flex justify-between place-items-center gap-[10px]">
          <p>Follow Us :</p>
          <div className="right_uper_icons">
            <AiFillInstagram />
            <AiFillYoutube />
            <BsFacebook />
            <AiFillTwitterCircle />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpderHeader;
