import React, { useState } from "react";
import "../Styles/Sidebar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const Sidebar = ({ search, setSerach, filterdata,setshowfilter,showfilter ,price,setprice}) => {

  const filterdataset = ()=>{
    filterdata()
    setshowfilter(false)
}
  
  return (
    <div className={showfilter ? "product_section2_sidebar_box show_filter" : "product_section2_sidebar_box"}>
     <div className="flex justify-between place-items-center">
     <h3>Filter :</h3>
      <RxCross1 className="filter_cross" onClick={()=> setshowfilter(false)}/>
     </div>
      <div className="sidebar_search_bar">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSerach(e.target.value)}
        />
      </div>
      {/* ------------------ filter by ctegory- */}
      {/* <div className="sidebar_filter_by_category">
        <h2>Category</h2>
      
        <ul>
          <li>View All</li>
          <li>E-Cards</li>
          <li>Birthday Cards</li>
          <li>Wedding</li>
        </ul>
      </div> */}
     
      {/* ---------------------  */}
      {/* <div className="sideba_filter_by_price">
        <h2>Filter By Price</h2>
        <div className="by_price_box">
          <input
            type="range"
            min={0}
            max={500}
            step={1}
            className="w-full my-2"
            onChange={(e)=> setprice(e.target.value)}
          />
          <div className="inputs_price">
            <input type="number" placeholder="0" value={price} />
            <input type="number" placeholder="500" value={500} />
          </div>
        </div>
      </div> */}
      <button className="filter" onClick={filterdataset}>
        Filter
      </button>
    </div>
  );
};

export default Sidebar;
