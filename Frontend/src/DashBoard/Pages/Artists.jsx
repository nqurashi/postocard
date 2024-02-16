import React from "react";
import Sidebar from "../Layout/Sidebar";
import Navebar from "../Layout/Navebar";
import AdminAllArtists from "../Components/Artists/AdminAllArtists";

const Artists = () => {
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
          <AdminAllArtists />
        </div>
      </div>
    </div>
  );
};

export default Artists;
