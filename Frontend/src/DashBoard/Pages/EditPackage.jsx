import React from "react";
import '../Style/CommonStyle.css'
import Sidebar from "../Layout/Sidebar";
import Navebar from "../Layout/Navebar";
import EditPackageComponent from "../Components/CreatePackage/EditPackageComponent";

const EditPacage = () => {
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
          <EditPackageComponent />
        </div>
      </div>
    </div>
  );
};

export default EditPacage;
