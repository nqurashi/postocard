import React from "react";
import Sidebar from "../Layout/Sidebar";
import Navebar from "../Layout/Navebar";
import AdminAllUsers from "../Components/AllUsers/AdminAllUsers";

const AllUsers = () => {
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
        <div className="content_dashboard">
          <AdminAllUsers />
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
