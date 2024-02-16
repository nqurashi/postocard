import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const BottomBottomHeader = ({ showheader, setshowheader }) => {
  const allcategory = useSelector((state) => state.category.allcategoryforuser);
  const Occasions = allcategory?.filter((item) => item?.ParentItem === 1);
  const hollidays = allcategory?.filter((item) => item?.ParentItem === 2);
  // console.log(allcategory);
  const [select, setSlect] = useState(0);
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div
      className={
        showheader
          ? "bottom_bottom_header mob_bottom_header"
          : "bottom_bottom_header"
      }
    >
      <RxCross1 className="cross" onClick={() => setshowheader(false)} />
      <div className="drop_down_menus">
        <div
          className={`${
            select === 1
              ? "showdropdown bottom_bottom_header_menus_parent"
              : "bottom_bottom_header_menus_parent"
          }`}
        >
          <p className="cursor-pointer" onMouseEnter={() => setSlect(1)}>
            OCCASIONS
          </p>
          <IoIosArrowDown className="cursor-pointer" />
          {/* ===== menus  */}
          {select === 1 && (
            <div className="menus flex-wrap" onMouseLeave={() => setSlect(0)}>
              {Occasions?.map((item, index) => {
                return (
                  <ul key={index}>
                    <NavLink to={`/products/${item.CategoryName}`}>
                      <li
                        onClick={() => {
                          {
                            setshowheader(false);
                            setSlect(0);
                          }
                        }}
                      >
                        {item.CategoryName}
                      </li>
                    </NavLink>
                  </ul>
                );
              })}
              {/* ==== */}
              {/* <div>
                   <img src="http://cdn.shopify.com/s/files/1/0002/3317/7140/collections/Special_Occasions100_1200x1200.png?v=1519589612" alt="" />
     
                     </div> */}
            </div>
          )}
        </div>
        {/* ========================= 2 */}
        <div
          className={`${
            select === 1
              ? "showdropdown bottom_bottom_header_menus_parent"
              : "bottom_bottom_header_menus_parent"
          }`}
        >
          <p className="cursor-pointer" onMouseEnter={() => setSlect(2)}>
            Holiday
          </p>
          <IoIosArrowDown className="cursor-pointer" />
          {/* ===== menus  */}
          {select === 2 && (
            <div className="menus flex-wrap " onMouseLeave={() => setSlect(0)}>
              {hollidays?.map((item, index) => {
                return (
                  <ul key={index}>
                    <NavLink to={`/products/${item.CategoryName}`}>
                      <li
                        onClick={() => {
                          {
                            setshowheader(false);
                            setSlect(0);
                          }
                        }}
                      >
                        {item.CategoryName}
                      </li>
                    </NavLink>
                  </ul>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ==========  */}
      <div className="sidebar_accordian">
        <Accordion open={open === 1} className="my-2 w-[full] ">
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="my-[10px] py-1 justify-start w-full font-normal text-[18px]  border-none"
          >
            OCCASIONS <IoIosArrowDown className="cursor-pointer" />
          </AccordionHeader>
          <AccordionBody className="py-0">
            <div className="menus flex-wrap">
              {Occasions?.map((item, index) => {
                return (
                  <ul key={index}>
                    <NavLink to={`/products/${item.CategoryName}`}>
                      <li
                        onClick={() => {
                          {
                            setshowheader(false);
                            setSlect(0);
                          }
                        }}
                        className="my-1 border-b-[1px] border-[#d4d4d4]"
                      >
                        {item.CategoryName}
                      </li>
                    </NavLink>
                  </ul>
                );
              })}
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion
          className="my-2 border-b-[1px] border-[#8080804b]"
          open={open === 2}
        >
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className=" my-[10px] py-1 justify-start  font-normal text-[18px]  border-none"
          >
            Holiday <IoIosArrowDown className="cursor-pointer" />
          </AccordionHeader>
          <AccordionBody className="py-0">
            <div className="menus flex-wrap">
              {hollidays?.map((item, index) => {
                return (
                  <ul key={index}>
                    <NavLink to={`/products/${item.CategoryName}`}>
                      <li
                        onClick={() => {
                          {
                            setshowheader(false);
                            setSlect(0);
                          }
                        }}
                        className="my-1 border-b-[1px] border-[#d4d4d4]"
                      >
                        {item.CategoryName}
                      </li>
                    </NavLink>
                  </ul>
                );
              })}
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
};

export default BottomBottomHeader;
