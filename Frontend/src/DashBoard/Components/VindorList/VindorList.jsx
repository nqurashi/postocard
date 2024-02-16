import React from "react";
import "./style/VindorList.css";
import { FaArrowRight } from "react-icons/fa";
import { GoFilter } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { GrRefresh } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Layout/Loading/Loading";
import { GetAllVendor, UpdateVendorActive } from "../../../Redux/Action/VendorAction";

const VindorList = () => {
  const allVendor = useSelector((state) => state.vendor.allVendor);
  const loading = useSelector((state) => state.vendor.loading);
  const dispatch = useDispatch();
  
  const EditVendor = (id)=>{
      dispatch(UpdateVendorActive(id))
  }

  const refresh = ()=>{
    dispatch(GetAllVendor())
  }
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="VindorList">
          <div className="all_product_header flex justify-end place-items-center py-3 px-5 gap-3">
            <GrRefresh onClick={refresh} className="bg-white rounded-[10px] text-4xl py-2 px-2 border-2 border-[#b1b1b191] cursor-pointer" />
            <NavLink to="/admin/create/vendor">
              <button className="bg-[#6E6EEF] text-white py-2 px-6 rounded-[10px]">
                + Create Vindor
              </button>
            </NavLink>
          </div>
          <div className="admin_ListofProducts">
            {/* ============== list of product  */}
            <div className="list_product_admin">
              <div
                className={`product_list_header grid place-items-center  grid-cols-7 font-bold py-3 border-b-2 border-b-[gray]`}
              >
                <h2>id</h2>
                <h2>Name</h2>
                <h2>Adress</h2>
                <h2>Bank</h2>
                <h2>Number</h2>
                <h2>Email</h2>
                <h2>Action</h2>
              </div>
              {/* ---------- product  */}
              <div className="list_main_box">
                {allVendor?.map((item, index) => {
                  return (
                    <div
                      className="product_list_main grid grid-cols-7 gap-2 py-3 border-b-2"
                      key={index}
                    >
                      <p>#{item.id}</p>
                      <p>{item.VendorName?.slice(0, 10)}...</p>
                      <p>{item.Address?.slice(0, 10)}...</p>
                      <p>{item.BankAccountNo?.slice(0, 10)}...</p>
                      <p>{item.ContactNumber?.slice(0, 10)}...</p>
                      <p>{item.Email?.slice(0, 10)}...</p>
                      <p className="flex justify-center place-items-start gap-2">
                        <NavLink to={`/admin/vendor/detail/${item.id}`}>
                          <FaArrowRight className="text-[17px] cursor-pointer text-[green]" />
                        </NavLink>
                        <MdDeleteOutline className="text-[20px] cursor-pointer text-[red]" onClick={()=> EditVendor(item.id)}/>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VindorList;
