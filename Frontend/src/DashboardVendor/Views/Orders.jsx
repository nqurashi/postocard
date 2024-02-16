import React from "react";
import Sidebar from "../Layout/Sidebar";
import Navebar from "../Layout/Navebar";
import AllOrders from "../Components/orders/AllOrders";


const Orders = () => {
  return (
    <div className="dashboard_common">
      {/* ==================== sidebard dashboard  */}
      <div className="dashboard_sidebar ">
        <Sidebar />
      </div>
      {/* ======================= navebar and content  */}
      <div className="navebar_content_dashbaord w-[100%] h-[100vh]">
        {/* ============== naviabr  */}
        <Navebar />
        {/* =================== content  */}
        <div className="content_dashboard w-[100%]">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default Orders;
