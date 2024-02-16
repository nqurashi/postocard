import React from "react";
import { useDispatch } from "react-redux";
import { LOGOUTUSER } from "../../../Redux/Action/UserAction";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden rounded-lg border-[1px] bg-[#fff9f9] border-[#D4D4D4]">
      <h2 className="bg-[#F49E3F] text-[white] font-bold text-[22px] space-x-1 w-full py-[10px] px-[15px]">
        My Profile
      </h2>
      <p
        onClick={() => setActive(1)}
        className={`px-[15px] ${
          active === 1 && "bg-[#f49d3f93]"
        } py-[13px] border-b-[1px] border-b-[#D4D4D4] text-black cursor-pointer text-[15px]`}
      >
        Dashboard
      </p>
      <p
        onClick={() => setActive(2)}
        className={`px-[15px] ${
          active === 2 && "bg-[#f49d3f93]"
        } py-[13px] border-b-[1px] border-b-[#D4D4D4] text-black cursor-pointer text-[15px]`}
      >
        Orders
      </p>
      <p
        onClick={() => setActive(3)}
        className={`px-[15px] ${
          active === 3 && "bg-[#f49d3f93]"
        } py-[13px] border-b-[1px] border-b-[#D4D4D4] text-black cursor-pointer text-[15px]`}
      >
        Address
      </p>
      <p
        onClick={() => setActive(4)}
        className={`px-[15px] ${
          active === 4 && "bg-[#f49d3f93]"
        } py-[13px] border-b-[1px] border-b-[#D4D4D4] text-black cursor-pointer text-[15px]`}
      >
        Account details
      </p>
      <p
        className="px-[15px] py-[13px]  text-[red] cursor-pointer text-[15px]"
        onClick={() => dispatch(LOGOUTUSER(navigate))}
      >
        Logout
      </p>
    </div>
  );
};

export default Sidebar;
