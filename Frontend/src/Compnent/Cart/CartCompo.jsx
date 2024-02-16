import React, { useEffect } from "react";
import "./Style/CartCompo.css";
import { useDispatch } from "react-redux";
import { GetAllCartData } from "../../Redux/Action/CartAction";

const CartCompo = () => {


  return (
    <div className="CartCompo">
      {/* ---------- head  */}
      <div className="cart_com_header_page">
        <p>Items</p>
        <p className="p">Quantity</p>
        <p className="p">Total</p>
      </div>
      {/* ------------ cart-content */}
      <div className="main_cart_data_page">
        <div className="cart_data_page">
          <div className="cart_data_image">
            <img src="./data/product/image4.png" alt="" />
            <div className="cart_data_img_content">
              <h2>Eid Card</h2>
              <p>A timeless ceramic vase with a tri color grey glaze.</p>
              <span>$8</span>
            </div>
          </div>
          <p className="p">1</p>
          <p className="p">$8</p>
        </div>
      </div>

      {/* ------------------------- button area  */}
      <div className="cart_btn_area">
        <div className="cart_subtotal">
          <p>Taxes and shipping are calculated at checkout</p>
          <div className="sub_cart">
            <p>Subtotal</p>
            <p className="p">$20</p>
          </div>
        </div>
        <div className="text-right">
          <button>Go to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartCompo;
