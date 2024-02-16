import React, { useState } from "react";
import "../../DashBoard/Style/Sidebar.css";
import { DashBoardSidebarMenus } from "../utils/StaticMenu";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getallproduct } from "../../Redux/Action/ProductAction";

const Sidebar = ({ show, setShow }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [DropDown1, setDropDown1] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    // You can add additional logic here for item-specific actions if needed
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
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
        <div className="relative inline-block text-left w-[100%]">
          <button
            onClick={handleDropdownToggle}
            type="button"
            className="px-2 text-white focus:outline-none flex gap-5 items-center w-[100%]"
          >
            Orders
            {showDropdown ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a1 1 0 0 1-1-1v-6.586L4.707 14.707a1 1 0 1 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0l6 6a1 1 0 1 1-1.414 1.414L11 10.414V17a1 1 0 0 1-1 1z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 -mr-1 transform rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a1 1 0 0 1-1-1v-6.586L4.707 14.707a1 1 0 1 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0l6 6a1 1 0 1 1-1.414 1.414L11 10.414V17a1 1 0 0 1-1 1z"
                />
              </svg>
            )}
          </button>

          {showDropdown && (
        <div className="origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1">
                <NavLink to="/vendor/orders">
                <div  onClick={() => handleItemClick('All Orders')}   className={`block px-4 py-2 text-sm ${
                    selectedItem === 'All Orders' ? 'bg-gray-100' : ''
                  } text-gray-700 hover:bg-gray-100`}>
                    All Orders
                  </div>
                </NavLink>
                <NavLink to="/vendor/pendingorders">
                  <div onClick={() => handleItemClick('Pending')}   className={`block px-4 py-2 text-sm ${
                    selectedItem === 'Pending' ? 'bg-gray-100' : ''
                  } text-gray-700 hover:bg-gray-100`}>
                    Pending
                  </div>
                </NavLink>
                <NavLink to="/vendor/completedorders">
                  <div  onClick={() => handleItemClick('Completed')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Completed
                  </div>
                </NavLink>
                <NavLink to="/vendor/rejectedorders">
                  <div  onClick={() => handleItemClick('All Orders')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Rejected
                  </div>
                </NavLink>
              </div>
            </div>
          )}
        </div>
        {/* <div className={DropDown1 ? "drop_down show_drop_down" : "drop_down"}>
          <li onClick={() => setDropDown1(!DropDown1)}>
            Fulfillment
            <ul>
              <NavLink to="/admin/orderlist">
                <li onClick={dataallproductget}>Orders</li>
              </NavLink>
              <NavLink to="/admin/vendor">
                <li>Vendor List</li>
              </NavLink>
             
            </ul>
          </li>
        </div> */}
        {/* <NavLink to={"/admin/allusers"}>
          <li>All Users</li>
        </NavLink>
        <NavLink to={"/admin/user/Analytics"}>
          <li>Users Analytics</li>
        </NavLink>
        <NavLink to={"/admin/product/discount"}>
          <li>Dicount on Items</li>
        </NavLink>
        <NavLink to={"/admin/create/package"}>
          <li>Create Package</li>
        </NavLink> */}
      </ul>
    </div>
  );
};

export default Sidebar;
