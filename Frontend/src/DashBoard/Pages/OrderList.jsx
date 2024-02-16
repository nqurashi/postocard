import React, { useEffect, useState } from "react";
import Navebar from "../Layout/Navebar";
import Sidebar from "../Layout/Sidebar";
import { AiOutlineDelete } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import "../Style/OrderList.css";
import "../Components/AllProductsComponent/Styles/AllProductscomp.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrdersFunc } from "../../Redux/Action/OrderAction";

const OrderList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllOrdersFunc());
  }, []);

  const [count, setCount] = useState(1);

  const allorder = useSelector((state) => state.order.allorder);
  const sliceorderdata = allorder?.slice(0, count * 10);
  const allLength = allorder?.length;
  const slicelength = sliceorderdata?.length;

  return (
    <div className="dashboard_common">
      {/* ==================== sidebard dashboard  */}
      <div className="dashboard_sidebar">
        <Sidebar />
      </div>
      {/* ======================= navebar and content  */}
      <div className="navebar_content_dashbaord">
        {/* ============== naviabr  */}
        <Navebar />
        {/* =================== content  */}
        <div className="order_list">
          <h1>All Orders</h1>
          <div className="admin_ListofProducts">
            {/* ============== list of product  */}
            <div className="list_product_admin">
              <div
                className={`product_list_header grid  grid-cols-5  font-bold py-3 border-b-2 border-b-[gray]`}
              >
                <p>OrderId</p>
                <p>Total Price</p>
                <p>Total Product</p>
                <p>Order Status</p>
                <p>Action</p>
              </div>
              {/* ---------- product  */}
              {sliceorderdata?.map((item, index) => {
                return (
                  <div className="list_main_box" key={index}>
                    <div
                      className={`product_list_main grid grid-cols-5 py-3 border-b-2`}
                    >
                      <h2>#{item.order?.id}</h2>
                      <h2>${item.NetAmount}</h2>
                      <h2>{item.items?.length}</h2>
                      {item.IsCompleted === 0 ? (
                        <h2 className="text-[red] font-bold">Pending</h2>
                      ) : (
                        <h2 className="text-[green] font-bold">Completed</h2>
                      )}
                      <h2 className="flex justify-start place-items-center gap-2">
                        <NavLink to={`${`/admin/order/${item.OrderId}`}`}>
                          <FaArrowRight className="text-[20px] cursor-pointer text-[green]" />
                        </NavLink>
                        <AiOutlineDelete className="text-[20px] cursor-pointer text-[red]" />
                      </h2>
                    </div>
                  </div>
                );
              })}
              {allLength === slicelength ? null : (
                <button
                  className="rounded-sm my-3 mx-2 px-[20px] py-[8px] bg-[#6E6EEF] text-[white]"
                  onClick={() => setCount(count + 1)}
                >
                  Load more 10
                </button>
              )}
              {allLength === slicelength ? (
                <button
                  className="rounded-sm my-3 mx-2 px-[20px] py-[8px] bg-[#6E6EEF] text-[white]"
                  onClick={() => setCount(1)}
                >
                  Move Up
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
