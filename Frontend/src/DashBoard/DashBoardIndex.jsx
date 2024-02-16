import React, { useEffect, useState } from "react";
import Navebar from "./Layout/Navebar";
import Sidebar from "./Layout/Sidebar";
import "./Style/CommonStyle.css";
import Content from "./Layout/Content";
import { useDispatch } from "react-redux";
import { GetAllOrdersFunc, getTranscations } from "../Redux/Action/OrderAction";
import {
  getallCategory,
  getallSubCategory,
} from "../Redux/Action/CategoryAction";
import { getallproductforAdmin } from "../Redux/Action/ProductAction";

const DashBoardIndex = () => {
  // --------- redux
  // const user = useSelector((state)=> state.user.user)
  // const isAuthantication = useSelector((state)=> state.user.isAuthantication)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllOrdersFunc());
    dispatch(getallproductforAdmin());
    dispatch(getallCategory());
    dispatch(getallSubCategory());
    dispatch(getTranscations());
  }, []);

  const [show, setShow] = useState(0);

  return (
    <div className="dashboard_common">
      {/* ==================== sidebard dashboard  */}
      <div className="dashboard_sidebar">
        <Sidebar show={show} setShow={setShow} />
      </div>
      {/* ======================= navebar and content  */}
      <div className="navebar_content_dashbaord">
        {/* ============== naviabr  */}
        <Navebar />
        {/* =================== content  */}
        <div className="content_dashboard">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default DashBoardIndex;
