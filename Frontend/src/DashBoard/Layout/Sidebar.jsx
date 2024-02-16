import React, { useState } from "react";
import "../Style/Sidebar.css";
import { DashBoardSidebarMenus } from "../utils/StaticMenu";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getallproduct } from "../../Redux/Action/ProductAction";

const Sidebar = ({ show, setShow }) => {
  const [DropDown, setDropDown] = useState(false);
  const [DropDown1, setDropDown1] = useState(false);

  const dispatch = useDispatch();

  const dataallproductget = () => {
    dispatch(getallproduct());
  };

  return (
    <div className="admin_sidebar bg-[#3737e9b9] text-white z-10">
      {/* ===================== text logo */}
      <h2 className="text-center font-bold">PostoCard</h2>
      {/* ============= menus call  */}
      <ul>
        {DashBoardSidebarMenus &&
          DashBoardSidebarMenus.map((item) => {
            return (
              <NavLink to={item.link} key={item.id}>
                <li>{item.name}</li>
              </NavLink>
            );
          })}
        {/* -------------- */}
        <div className={DropDown ? "drop_down show_drop_down" : "drop_down"}>
          <li onClick={() => setDropDown(!DropDown)}>
            Products
            <ul>
              <NavLink to="/admin/products">
                <li onClick={dataallproductget}>Product list</li>
              </NavLink>
              <NavLink to="/admin/category/list">
                <li>Category List</li>
              </NavLink>
              <NavLink to="/admin/subcategory/list">
                <li>Subcategory List</li>
              </NavLink>
            </ul>
          </li>
        </div>
        <div className={DropDown1 ? "drop_down show_drop_down" : "drop_down"}>
          <li onClick={() => setDropDown1(!DropDown1)}>
            Fulfillment
            <ul>
              <NavLink to="/admin/orderlist">
                <li onClick={dataallproductget}>Orders</li>
              </NavLink>
              <NavLink to="/admin/vendor">
                <li>Vendor List</li>
              </NavLink>
              {/* <NavLink to="/admin/subcategory/list">
            <li>
              
            </li>
            </NavLink> */}
            </ul>
          </li>
        </div>
        <NavLink to={"/admin/allusers"}>
          <li>All Users</li>
        </NavLink>
        <NavLink to={"/admin/artists"}>
        <li>Artists</li>
        </NavLink>
        <NavLink to={"/admin/user/Analytics"}>
          <li>Users Analytics</li>
        </NavLink>
        <NavLink to={"/admin/product/discount"}>
          <li>Dicount on Items</li>
        </NavLink>
        <NavLink to={"/admin/create/package"}>
          <li>Create Package</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
