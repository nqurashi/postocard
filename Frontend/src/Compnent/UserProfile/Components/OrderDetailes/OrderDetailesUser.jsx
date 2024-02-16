import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserOrder } from "../../../../Redux/Action/OrderAction";
import { useParams } from "react-router-dom";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocationSearching } from "react-icons/md";
import { IoBarcode } from "react-icons/io5";
import Sidebar from "../../Sidebar/Sidebar";

const OrderDetailesUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserOrder());
  }, []);

  const toggleAccordion = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  const UserOrders = useSelector((state) => state.order.UserOrders);
  const { id } = useParams();
  const filterOrder = UserOrders?.filter((item) => item.id == id);
  console.log(filterOrder);

  return (
    <div className="px-[10px] py-[40px] bg-[#f5a95217] flex justify-start place-items-start gap-2">
      <div className="h-[300px] w-[350px] sidebar_profile">
          <Sidebar/>
        </div>
     
      <div>
        {/* <div className="py-1 rounded-sm mb-4">
          <h2 className="mt-3 text-[35px] font-bold border-b-[3px] ">
            Shipping Address.
          </h2>
          <div className="flex justify-start align-content-center my-[6px]">
            <h2 className="text-[20px] font-bold mr-2">FullName : </h2>
            <p className="text-[20px]">{filterOrder[0]?.FullName}</p>
          </div>
          <div className="flex justify-start align-content-center my-[6px]">
            <h2 className="text-[20px] font-bold mr-2">StreetAddress : </h2>
            <p className="text-[20px]">{filterOrder[0]?.StreetAddress}</p>
          </div>
          <div className="flex justify-start align-content-center my-[6px]">
            <h2 className="text-[20px] font-bold mr-2">City : </h2>
            <p className="text-[20px]">{filterOrder[0]?.City}</p>
          </div>
          <div className="flex justify-start align-content-center my-[6px]">
            <h2 className="text-[20px] font-bold mr-2">State : </h2>
            <p className="text-[20px]">{filterOrder[0]?.State}</p>
          </div>
          <div className="flex justify-start align-content-center my-[6px]">
            <h2 className="text-[20px] font-bold mr-2">PostalCode : </h2>
            <p className="text-[20px]">{filterOrder[0]?.PostalCode}</p>
          </div>
          <div className="flex justify-start align-content-center my-[6px]">
            <h2 className="text-[20px] font-bold mr-2">Country : </h2>
            <p className="text-[20px]">{filterOrder[0]?.Country}</p>
          </div>
          <div className="flex justify-start align-content-center my-[6px]">
            <h2 className="text-[20px] font-bold mr-2">Mobile : </h2>
            <p className="text-[20px]">{filterOrder[0]?.Mobile}</p>
          </div>
        </div> */}
        <div class="flex flex-col justify-center items-center pt-4">
        <h1 className="mt-3 text-[35px] font-bold border-b-[3px] mb-2 ">OrderId #{filterOrder[0]?.id}</h1>
          <div class="min-w-[375px] md:min-w-[700px] xl:min-w-[800px] mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            <div class="relative flex flex-grow items-center border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <FaUser style={{ fontSize: "28px", color: "#F5A852" }} />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">
                  FullName
                </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                  {filterOrder[0]?.FullName}
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow  items-center  border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <FaLocationDot
                      style={{ fontSize: "28px", color: "#F5A852" }}
                    />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">
                  StreetAddress
                </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                  {filterOrder[0]?.StreetAddress}
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow  items-center border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <FaLocationDot
                      style={{ fontSize: "28px", color: "#F5A852" }}
                    />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">City </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                  {filterOrder[0]?.City}
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <MdOutlineLocationSearching
                      style={{ fontSize: "28px", color: "#F5A852" }}
                    />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">State </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                  {filterOrder[0]?.State}
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <IoBarcode style={{ fontSize: "28px", color: "#F5A852" }} />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">
                  PostalCode{" "}
                </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                  {filterOrder[0]?.PostalCode}
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <FaLocationDot
                      style={{ fontSize: "28px", color: "#F5A852" }}
                    />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">
                  Country{" "}
                </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                  {filterOrder[0]?.Country}
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <FaPhone style={{ fontSize: "28px", color: "#F5A852" }} />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">Mobile </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                  {filterOrder[0]?.Mobile}
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/* ========================== payment  */}
        {/* <div className=" my-[30px]">
          <div className="">
            <h2 className="mt-3 text-[35px] font-bold border-b-[3px] mb-2 ">
              Payment.
            </h2>
            <div className="flex justify-between align-content-center my-[6px]">
              <h2 className="text-[20px] font-bold mr-2">GrossAmount : </h2>
              <p className="text-[20px]">
                ${filterOrder[0]?.cart?.GrossAmount}.00
              </p>
            </div>
            <div className="flex justify-between align-content-center my-[6px]">
              <h2 className="text-[20px] font-bold mr-2">Discount : </h2>
              <p className="text-[20px]">
                ${filterOrder[0]?.cart?.Discount}.00
              </p>
            </div>
            <div className="flex justify-between align-content-center my-[6px]">
              <h2 className="text-[20px] font-bold mr-2">NetAmount : </h2>
              <p className="text-[20px]">
                ${filterOrder[0]?.cart?.NetAmount}.00
              </p>
            </div>
            <div className="flex justify-between align-content-center my-[6px]">
              <h2 className="text-[20px] font-bold mr-2">PaymentMethod : </h2>
              <p className="text-[20px]">{filterOrder[0]?.PaymentMethod}</p>
            </div>
            <div className="flex justify-between align-content-center my-[6px]">
              <h2 className="text-[20px] font-bold mr-2">PaymentStatus : </h2>
              <p className="text-[20px] text-[green]">
                {filterOrder[0]?.PaymentStatus}
              </p>
            </div>
          </div>
        </div> */}
        <div class="flex flex-col justify-center items-center pt-4">
        <h2 className="mt-3 text-[35px] font-bold border-b-[3px] mb-2 ">
              Payment.
            </h2>
            <div class="min-w-[375px] md:min-w-[700px] xl:min-w-[800px] mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            <div class="relative flex flex-grow items-center border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <FaUser style={{ fontSize: "28px", color: "#F5A852" }} />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">
                GrossAmount 

                </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                ${filterOrder[0]?.cart?.GrossAmount}.00
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow items-center border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <FaLocationDot
                      style={{ fontSize: "28px", color: "#F5A852" }}
                    />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">
                Discount 

                </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                ${filterOrder[0]?.cart?.Discount}.00
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow items-center border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <FaLocationDot
                      style={{ fontSize: "28px", color: "#F5A852" }}
                    />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">NetAmount  </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                ${filterOrder[0]?.cart?.NetAmount}.00
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow items-center border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <MdOutlineLocationSearching
                      style={{ fontSize: "28px", color: "#F5A852" }}
                    />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">PaymentMethod   </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                {filterOrder[0]?.PaymentMethod}
                </h4>
              </div>
            </div>
            <div class="relative flex flex-grow items-center border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span class="flex items-center text-brand-500 dark:text-white">
                    <MdOutlineLocationSearching
                      style={{ fontSize: "28px", color: "#F5A852" }}
                    />
                  </span>
                </div>
              </div>
              <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                <p class="font-dm text-sm font-medium text-gray-600">PaymentStatus  </p>
                <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                {filterOrder[0]?.PaymentStatus}
                </h4>
              </div>
            </div>
          
          </div>
        </div>

      {/* ================== items  */}
      <div>
        <h2 className="text-[35px] my-[25px] font-bold">Order Items.</h2>
        <div className="order_item_box">
          {filterOrder[0]?.cart?.order_items?.map((item, index) => {
            return (
              <div>
                <div className="w-[600px] my-[6px] border-b-[1px] border-b-[gray] shadow-sm pb-1 flex justify-between place-items-center gap-3">
                  {/* <img src={item?.product_details?.File1} alt="" /> */}
                  <img
                    className="w-[100px] h-[100px] border-[1px] border-[gray] object-contain"
                    src="https://tse3.mm.bing.net/th?id=OIP.FzjTJnXtg4gEUInv7jAtCQHaJ4&pid=Api&P=0&h=220"
                    alt=""
                  />
                  <div className="flex justify-start place-items-center gap-3">
                    <p className="text-[20px]">
                      $
                      {item?.product_details?.Price
                        ? item?.product_details?.Price
                        : item?.product_details?.Price -
                          item?.product_details?.Discount}
                      .00
                    </p>
                    <p className="text-[20px]">X</p>
                    <p className="text-[20px]">1</p>
                  </div>
                  <p className="text-[20px]">=</p>
                  <div className="flex justify-start place-items-center gap-2">
                    <p className="text-[23px]">
                      $
                      {item?.product_details?.Price
                        ? item?.product_details?.Price
                        : item?.product_details?.Price -
                          item?.product_details?.Discount}
                      .00
                    </p>
                    /
                    <p
                      className={`font-bold ${
                        item?.Status === "Completed"
                          ? "text-[green]"
                          : item?.Status === "Pending"
                          ? "text-[red]"
                          : item?.Status === "Printed"
                          ? "text-[green]"
                          : item?.Status === "Rejected"
                          ? "text-[red]"
                          : item?.Status === "Refunding"
                          ? "text-[orange]"
                          : ""
                      }`}
                    >
                      {item?.Status}
                    </p>
                    <p
                      class="whitespace-nowrap px-6 py-4"
                      onClick={() => toggleAccordion(index)}
                    >
                      {" "}
                      {isOpen === index ? "▲" : "▼"}
                    </p>
                  </div>
                </div>
                {isOpen === index && (
                  <div class="container flex flex-col items-center gap-16 mx-auto">
                    <div class="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                      <div class="flex flex-col items-center gap-3 px-5 py-5 bg-white rounded-3xl shadow-main">
                        <span>
                          <FaLocationDot
                            style={{ fontSize: "30px", color: "#F5A852" }}
                          />
                        </span>
                        <p class="text-1xl font-extrabold text-dark-grey-900">
                          Address
                        </p>
                        <p class="text-base leading-7 text-dark-grey-600">
                          <p class="text-base leading-7 text-dark-grey-600">
                            {item?.NewAddress === 1
                              ? `${item?.StreetAddress}, ${item?.City}, ${item?.Country}`
                              : <p>Your item will be send on your shipping address</p>}
                          </p>
                        </p>
                      </div>
                      <div style={{display: item?.NewAddress === 0 ? 'none' : 'block'}} class="flex flex-col items-center gap-3 px-5 py-5 bg-white rounded-3xl shadow-main">
                        <span>
                          <FaUser
                            style={{ fontSize: "30px", color: "#F5A852" }}
                          />
                        </span>
                        <p class="text-1xl font-extrabold text-dark-grey-900">
                          Name
                        </p>
                        <p class="text-base leading-7 text-dark-grey-600">
                          {item?.user_address_id === null ||
                          item?.user_address_id === 0
                            ? item?.FullName
                            : null}
                        </p>
                      </div>
                      <div style={{display: item?.NewAddress === 0 ? 'none' : 'block'}} class="flex flex-col items-center gap-3 px-5 py-5 bg-white rounded-3xl shadow-main">
                        <span>
                          <FaPhone
                            style={{ fontSize: "30px", color: "#F5A852" }}
                          />
                        </span>
                        <p class="text-1xl font-extrabold text-dark-grey-900">
                          Mobile
                        </p>
                        <p class="text-base leading-7 text-dark-grey-600">
                          {item?.user_address_id === null ||
                          item?.user_address_id === 0
                            ? item?.MobileNo
                            : null}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* <div class="container flex flex-col items-center gap-16 mx-auto">
            <div class="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div class="flex flex-col items-center gap-3 px-5 py-5 bg-white rounded-3xl shadow-main">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                  >
                    <path
                      d="M31.9904 13.965L22.4166 4.40166C21.6057 3.60976 20.5294 3.16817 19.4104 3.16817C18.2914 3.16817 17.2151 3.60976 16.4041 4.40166L6.8304 13.9017C6.40502 14.283 6.0629 14.7524 5.82645 15.279C5.58999 15.8056 5.46454 16.3776 5.45831 16.9575V30.5425C5.47456 31.6946 5.93476 32.793 6.73808 33.5973C7.5414 34.4016 8.62236 34.846 9.74415 34.8333H28.9225C30.0443 34.846 31.1252 34.4016 31.9285 33.5973C32.7319 32.793 33.1921 31.6946 33.2083 30.5425V16.9575C33.2071 16.4009 33.0989 15.85 32.8899 15.3365C32.6809 14.823 32.3752 14.3569 31.9904 13.965ZM18.47 6.68166C18.7058 6.46025 19.0138 6.33747 19.3333 6.33747C19.6528 6.33747 19.9608 6.46025 20.1966 6.68166L28.5833 15.0417L20.1504 23.4017C19.9146 23.6231 19.6066 23.7459 19.2871 23.7459C18.9675 23.7459 18.6596 23.6231 18.4237 23.4017L10.0833 15.0417L18.47 6.68166ZM30.125 30.5425C30.1052 30.8533 29.9688 31.144 29.7445 31.3537C29.5203 31.5633 29.2256 31.6755 28.9225 31.6667H9.74415C9.44102 31.6755 9.14636 31.5633 8.9221 31.3537C8.69785 31.144 8.56147 30.8533 8.54165 30.5425V17.9708L14.7854 24.1458L12.2262 26.6792C11.9391 26.9758 11.7779 27.3771 11.7779 27.7954C11.7779 28.2137 11.9391 28.615 12.2262 28.9117C12.3695 29.066 12.5417 29.1891 12.7324 29.2734C12.9232 29.3578 13.1286 29.4017 13.3362 29.4025C13.7332 29.4009 14.1142 29.2421 14.4 28.9592L17.1287 26.2675C17.8065 26.6928 18.5853 26.9179 19.3796 26.9179C20.1738 26.9179 20.9527 26.6928 21.6304 26.2675L24.3591 28.9592C24.6449 29.2421 25.026 29.4009 25.4229 29.4025C25.6306 29.4017 25.8359 29.3578 26.0267 29.2734C26.2174 29.1891 26.3896 29.066 26.5329 28.9117C26.82 28.615 26.9812 28.2137 26.9812 27.7954C26.9812 27.3771 26.82 26.9758 26.5329 26.6792L23.9583 24.1458L30.125 17.9708V30.5425Z"
                      fill="#581ff8"
                    />
                  </svg>
                </span>
                <p class="text-2xl font-extrabold text-dark-grey-900">Name</p>
                <p class="text-base leading-7 text-dark-grey-600">
                  Contact us at
                </p>
              </div>
              <div class="flex flex-col items-center gap-3 px-5 py-5 bg-white rounded-3xl shadow-main">
                <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                  >
                    <path
                      d="M31.7091 15.2475C31.4927 12.9341 30.6966 10.7177 29.3984 8.81412C28.1003 6.91054 26.3443 5.38464 24.3014 4.38503C22.2585 3.38541 19.9984 2.94614 17.7412 3.10998C15.4839 3.27383 13.3065 4.03522 11.4208 5.32C9.8008 6.43252 8.44083 7.89972 7.43858 9.6162C6.43633 11.3327 5.81667 13.2558 5.62413 15.2475C5.43524 17.2261 5.67758 19.2231 6.33355 21.0936C6.98953 22.9641 8.04269 24.6611 9.41663 26.0617L17.5875 34.4692C17.7308 34.6176 17.9013 34.7354 18.0892 34.8157C18.277 34.8961 18.4785 34.9375 18.682 34.9375C18.8856 34.9375 19.0871 34.8961 19.2749 34.8157C19.4628 34.7354 19.6333 34.6176 19.7766 34.4692L27.9166 26.0617C29.2906 24.6611 30.3437 22.9641 30.9997 21.0936C31.6557 19.2231 31.898 17.2261 31.7091 15.2475ZM25.7583 23.8292L18.6666 31.1125L11.575 23.8292C10.5298 22.7557 9.72928 21.4578 9.23081 20.0288C8.73233 18.5997 8.54834 17.075 8.69204 15.5642C8.83668 14.0301 9.31143 12.5482 10.082 11.2256C10.8525 9.90299 11.8996 8.77278 13.1475 7.91666C14.7831 6.80079 16.703 6.20555 18.6666 6.20555C20.6302 6.20555 22.5502 6.80079 24.1858 7.91666C25.4299 8.76947 26.4747 9.89469 27.245 11.2115C28.0154 12.5283 28.4922 14.0039 28.6412 15.5325C28.7896 17.0484 28.6079 18.5793 28.1093 20.0142C27.6107 21.4491 26.8076 22.7522 25.7583 23.8292ZM18.6666 9.5C17.2945 9.5 15.9532 9.91787 14.8124 10.7008C13.6715 11.4837 12.7823 12.5965 12.2572 13.8984C11.7321 15.2003 11.5947 16.6329 11.8624 18.015C12.1301 19.3971 12.7908 20.6667 13.7611 21.6631C14.7313 22.6596 15.9674 23.3382 17.3132 23.6131C18.6589 23.888 20.0538 23.7469 21.3215 23.2076C22.5892 22.6684 23.6726 21.7551 24.4349 20.5834C25.1972 19.4117 25.6041 18.0342 25.6041 16.625C25.6001 14.7366 24.8678 12.9268 23.5677 11.5915C22.2675 10.2562 20.5053 9.50418 18.6666 9.5ZM18.6666 20.5833C17.9043 20.5833 17.1592 20.3512 16.5254 19.9162C15.8916 19.4813 15.3976 18.8631 15.1058 18.1398C14.8141 17.4165 14.7378 16.6206 14.8865 15.8528C15.0352 15.0849 15.4023 14.3796 15.9413 13.826C16.4803 13.2724 17.1671 12.8955 17.9147 12.7427C18.6623 12.59 19.4373 12.6684 20.1416 12.968C20.8458 13.2676 21.4477 13.7749 21.8712 14.4259C22.2947 15.0768 22.5208 15.8421 22.5208 16.625C22.5208 17.6748 22.1147 18.6816 21.3919 19.424C20.6691 20.1663 19.6888 20.5833 18.6666 20.5833Z"
                      fill="#581ff8"
                    />
                  </svg>
                </span>
                <p class="text-2xl font-extrabold text-dark-grey-900">Address</p>
                <p class="text-base leading-7 text-dark-grey-600">
                  {filterOrder[0]?.cart?.order_items?.user_address_id}
                </p>
              </div>
              <div class="flex flex-col items-center gap-3 px-5 py-5 bg-white rounded-3xl shadow-main">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                  >
                    <path
                      d="M31.7091 15.2475C31.4927 12.9341 30.6966 10.7177 29.3984 8.81412C28.1003 6.91054 26.3443 5.38464 24.3014 4.38503C22.2585 3.38541 19.9984 2.94614 17.7412 3.10998C15.4839 3.27383 13.3065 4.03522 11.4208 5.32C9.8008 6.43252 8.44083 7.89972 7.43858 9.6162C6.43633 11.3327 5.81667 13.2558 5.62413 15.2475C5.43524 17.2261 5.67758 19.2231 6.33355 21.0936C6.98953 22.9641 8.04269 24.6611 9.41663 26.0617L17.5875 34.4692C17.7308 34.6176 17.9013 34.7354 18.0892 34.8157C18.277 34.8961 18.4785 34.9375 18.682 34.9375C18.8856 34.9375 19.0871 34.8961 19.2749 34.8157C19.4628 34.7354 19.6333 34.6176 19.7766 34.4692L27.9166 26.0617C29.2906 24.6611 30.3437 22.9641 30.9997 21.0936C31.6557 19.2231 31.898 17.2261 31.7091 15.2475ZM25.7583 23.8292L18.6666 31.1125L11.575 23.8292C10.5298 22.7557 9.72928 21.4578 9.23081 20.0288C8.73233 18.5997 8.54834 17.075 8.69204 15.5642C8.83668 14.0301 9.31143 12.5482 10.082 11.2256C10.8525 9.90299 11.8996 8.77278 13.1475 7.91666C14.7831 6.80079 16.703 6.20555 18.6666 6.20555C20.6302 6.20555 22.5502 6.80079 24.1858 7.91666C25.4299 8.76947 26.4747 9.89469 27.245 11.2115C28.0154 12.5283 28.4922 14.0039 28.6412 15.5325C28.7896 17.0484 28.6079 18.5793 28.1093 20.0142C27.6107 21.4491 26.8076 22.7522 25.7583 23.8292ZM18.6666 9.5C17.2945 9.5 15.9532 9.91787 14.8124 10.7008C13.6715 11.4837 12.7823 12.5965 12.2572 13.8984C11.7321 15.2003 11.5947 16.6329 11.8624 18.015C12.1301 19.3971 12.7908 20.6667 13.7611 21.6631C14.7313 22.6596 15.9674 23.3382 17.3132 23.6131C18.6589 23.888 20.0538 23.7469 21.3215 23.2076C22.5892 22.6684 23.6726 21.7551 24.4349 20.5834C25.1972 19.4117 25.6041 18.0342 25.6041 16.625C25.6001 14.7366 24.8678 12.9268 23.5677 11.5915C22.2675 10.2562 20.5053 9.50418 18.6666 9.5ZM18.6666 20.5833C17.9043 20.5833 17.1592 20.3512 16.5254 19.9162C15.8916 19.4813 15.3976 18.8631 15.1058 18.1398C14.8141 17.4165 14.7378 16.6206 14.8865 15.8528C15.0352 15.0849 15.4023 14.3796 15.9413 13.826C16.4803 13.2724 17.1671 12.8955 17.9147 12.7427C18.6623 12.59 19.4373 12.6684 20.1416 12.968C20.8458 13.2676 21.4477 13.7749 21.8712 14.4259C22.2947 15.0768 22.5208 15.8421 22.5208 16.625C22.5208 17.6748 22.1147 18.6816 21.3919 19.424C20.6691 20.1663 19.6888 20.5833 18.6666 20.5833Z"
                      fill="#581ff8"
                    />
                  </svg>
                </span>
                <p class="text-2xl font-extrabold text-dark-grey-900">
                  Location
                </p>
                <p class="text-base leading-7 text-dark-grey-600">
                  Find us at our office
                </p>
              </div>
            </div>
        
      </div> */}
      </div>
    </div>
  );
};

export default OrderDetailesUser;
