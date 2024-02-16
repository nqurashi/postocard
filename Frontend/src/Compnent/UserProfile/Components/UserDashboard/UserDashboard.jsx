import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { LOGOUTUSER } from "../../../../Redux/Action/UserAction";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="">
      <h2 className="text-[35px] font-medium mb-2">Dashboard</h2>
      <p className="text-[16px] text-[gray] mb-1">
        From your account dashboard you can view your recent orders, manage your
        shipping and billing addresses, and edit your password and account
        details.
      </p>
      <div className="userDashboard_box flex-wrap flex justify-center place-items-center gap-[12px] my-[20px]">
        <div
          className="user_dash_box cursor-pointer w-[200px] gap-2 bg-[#f9c58d7c] flex justify-center place-items-center flex-col h-[180px] rounded-md"
          onClick={() => setActive(2)}
        >
          <FiShoppingBag className="text-[60px] text-[#F49E3F]" />
          <p className="text-[18px] font-bold ">Orders</p>
        </div>
        <div
          className="user_dash_box cursor-pointer w-[200px] gap-2 bg-[#f9c58d7c] flex justify-center place-items-center flex-col h-[180px] rounded-md"
          onClick={() => setActive(3)}
        >
          <IoLocationOutline className="text-[60px] text-[#F49E3F]" />
          <p className="text-[18px] font-bold ">Address</p>
        </div>
        <div
          className="user_dash_box cursor-pointer w-[200px] gap-2 bg-[#f9c58d7c] flex justify-center place-items-center flex-col h-[180px] rounded-md"
          onClick={() => setActive(4)}
        >
          <RxPerson className="text-[60px] text-[#F49E3F]" />
          <p className="text-[18px] font-bold ">Acount details</p>
        </div>
        <div
          onClick={() => dispatch(LOGOUTUSER(navigate))}
          className="user_dash_box cursor-pointer w-[200px] gap-2 bg-[#f9c58d7c] flex justify-center place-items-center flex-col h-[180px] rounded-md"
        >
          <LuLogOut className="text-[60px] text-[#F49E3F]" />
          <p className="text-[18px] font-bold text-[red]">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
