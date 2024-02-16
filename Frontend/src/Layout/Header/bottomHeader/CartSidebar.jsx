import React, { useEffect, useState } from "react";
import "../Styles/CartSidebar.css";
import { RxCross1 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCartData } from "../../../Redux/Action/CartAction";
import { media } from "../../../Setting/GlobalVariable";
import { CommonPOSTCall } from "../../../Redux/Action/DeleteCommonFunction";
import {
  DELETE_CART_PRODUCT_ERROR,
  DELETE_CART_PRODUCT_REQUEST,
  DELETE_CART_PRODUCT_REQUEST_FAIL,
  DELETE_CART_PRODUCT_SUCCESS,
} from "../../../Redux/Variables/CartVariable";
import { NavLink } from "react-router-dom";

const CartSidebar = ({ show, setShow }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const CartCode = localStorage.getItem("cartcode");
    dispatch(GetAllCartData(CartCode));
  }, []);

  const decriment = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  const incriment = () => {
    setCount(count + 1);
  };

  const cart = useSelector((state) => state.cart.cart);

  const v1 = DELETE_CART_PRODUCT_REQUEST;
  const v2 = DELETE_CART_PRODUCT_REQUEST_FAIL;
  const v3 = DELETE_CART_PRODUCT_SUCCESS;
  const v4 = DELETE_CART_PRODUCT_ERROR;

  const deleteitem = async (productid) => {
    const bodydata = {
      CartId: cart.CartData.id,
      ItemId: productid,
    };
    const url = "cart/delete";
    const CartCode = localStorage.getItem("cartcode");
    await dispatch(CommonPOSTCall(v1, v2, v3, v4, bodydata, url));
    dispatch(GetAllCartData(CartCode));
  };

  const cartloading = useSelector((state)=> state.cart.isloading)


  return (
    <div
    className={
      show
        ? "fixed z-20 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10"
        : ""
    }
    >
      <div className={show ? "cartSiebar hide_cart" : "cartSiebar"}>
        <div className="cart_siebar_header flex justify-between place-items-center text-[20px] mb-4">
          <h2>Your Cart</h2>
          <RxCross1
            className="w-[24px] h-[24] cursor-pointer"
            onClick={() => setShow(false)}
          />
        </div>
        {/* ----- */}
        <div className="cart_data">
          <div className="cart_data_header px-1 flex justify-between place-items-center text-[14px] text-black mb-2">
            <p>Product</p>
            <p>Total</p>
          </div>
          {/* -------------- cart box  */}
          <div className="cart_data_overflow">
            {cart?.Items?.length > 0 ? (
              
              cart &&
              cart.Items &&
              cart.Items.map((item, index) => {
                return (
                  <div className={`cart_sidebar_box  ${cartloading ? "opacity-[.3]" : "" }`} key={index}>
                    <div className="cart_sidebar_box_image">
                      <img
                        src={`${media}/${item.product_details?.File1}`}
                        alt=""
                      />
                    </div>
                    {/* --- */}
                    <div children="cart_sidebar_box_content">
                      <div className="sibar_cart_box_title mb-2 w-[full] gap-[5px] flex-col">
                        <p className="cart_heading !text-[18px]">
                          {item.product_details?.ProductName?.slice(0, 80)}{" "}
                          {`${
                            item.product_details?.ProductName?.length > 80
                              ? "..."
                              : ""
                          }`}
                        </p>
                        <font></font>
                        <div className="w-full flex justify-between place-items-center">
                          <p className=" !text-[18px]">
                            ${item.product_details?.Price}
                          </p>
                         {
                          cartloading ?  <MdDelete
                          className="text-[25px] text-[#ff000085] cursor-pointer !cursor-not-allowed"
                        /> :  <MdDelete
                        className="text-[25px] text-[red] cursor-pointer"
                        onClick={() => deleteitem(item.id)}
                      />
                         }
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="bg-[#F49E3F] text-2xl p-2 my-3">No Item In Cart</p>
            )}
          </div>
        </div>
        <div className="fixed_cart">
          <div className="total_amount">
            <p>
              <span className="text-[18px]">Subtotal</span>
              <span className="text-[18px]">
                ${cart?.CartData?.GrossAmount ? cart?.CartData?.GrossAmount : 0}
              </span>
            </p>
            <p>
              <span className="text-[18px]">Discount</span>
              <span className="text-[18px]">
                ${cart?.CartData?.Discount ? cart?.CartData?.Discount : 0}
              </span>
            </p>
            <p>
              <span className="text-[18px]">Total</span>
              <span className="text-[18px]">
                ${cart?.CartData?.NetAmount ? cart?.CartData?.NetAmount : 0}
              </span>
            </p>
          </div>
          {cart?.Items?.length > 0 ? (
            <NavLink to="/payment">
              <button className="checkout" onClick={() => setShow(false)}>
                Check Out
              </button>
            </NavLink>
          ) : (
            <button
              className="checkout"
              disabled
              onClick={() => setShow(false)}
            >
              Check Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
