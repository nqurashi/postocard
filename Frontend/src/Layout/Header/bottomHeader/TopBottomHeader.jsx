import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import "./CartSidebar.jsx";
import CartSidebar from "./CartSidebar.jsx";
import { IoMenuSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import logo from "../../././../Assets/logo.jpg";
import { MdOutlineAccountCircle } from "react-icons/md";
import SpinnerLoading from "../../Loading/SpinnerLoading.jsx";
import { RxCross2 } from "react-icons/rx";

const TopBottomHeader = ({ setshowheader }) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const navigatetosearch = () => {
    if (search === "") {
      return toast.error("Plaese Fill The Input");
    }
    setShowSearch(!showSearch);
    navigate(`/allcollection/${search}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigatetosearch();
    }
  };
  const IsLoading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.user);
  const isAuthantication = useSelector((state) => state.user.isAuthantication);

  const searchRef = useRef(null);

  const handleDocumentClick = (event) => {
    // Check if the click is outside the search bar
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleDocumentClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="top_bottom_header" ref={searchRef}>
      {/* ---------- */}
      <div className="flex justify-center place-items-center gap-[8px] ">
        <IoMenuSharp
          className="cross_burger text-[23px]"
          onClick={() => setshowheader(true)}
        />
        <div className="flex justify-start place-items-center">
          <div className={showSearch ? "sercarbox sercarboxhide" : "sercarbox"}>
            <input
              type="text"
              placeholder="Search."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              className="outline-none"
              required
            />

            <AiOutlineSearch
              className="text-[#2A254B] text-[23px] cursor-pointer"
              onClick={navigatetosearch}
            />
            <RxCross2
              className="text-[#2A254B] text-[23px] cursor-pointer mx-3"
              onClick={() => setShowSearch(false)}
            />
          </div>
          <AiOutlineSearch
            className="text-[#2A254B] text-[20px] cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        </div>
      </div>
      {/* -------- */}
      <NavLink to="/">
        {/* <h2 className="">PostoCARD!</h2> */}
        <img src={logo} className="w-[70px] object-contain" alt="logo" />
      </NavLink>
      {/* ---------- */}
      <div className="right_bottom_header flex justify-center place-items-center  gap-[10px]">
        {/* <p>
          <span className="cursor-pointer">Log In</span>/
          <span className="cursor-pointer"> Sign Up</span>
        </p> */}
        <div className="relative flex justify-center place-items-center">
          <AiOutlineShoppingCart
            onClick={() => setShow(true)}
            className="mt-[8px] text-[23px]"
          />

          <span className="absolute top-[-2px] font-bold right-[-4px] text-[12px]  rounded-full bg-[#E61D79] h-[15px] text-[white] w-[15px] flex justify-center place-items-center">
            {cart?.Items?.length == undefined ? 0 : cart?.Items?.length}
          </span>
        </div>
        {IsLoading ? (
          <p className="flex justify-center place-items-center">
            <SpinnerLoading />
          </p>
        ) : isAuthantication && user ? (
          <NavLink to={"/user/profile"}>
            {/* <MdOutlineAccountCircle className="mt-[10px] text-[25px]" /> */}
            <p
              className="uppercase border-[1px]  
          !text-[#F49E3F] font-bold w-[30px] h-[30px] border-[#E61D79] p-2 rounded-full flex justify-center place-items-center"
            >
              {user?.name?.slice(0, 1)}
            </p>
          </NavLink>
        ) : (
          <NavLink to={"/user/Login"}>
            <MdOutlineAccountCircle className="mt-[10px] text-[25px]" />
          </NavLink>
        )}

        <CartSidebar show={show} setShow={setShow} />
      </div>
    </div>
  );
};

export default TopBottomHeader;
