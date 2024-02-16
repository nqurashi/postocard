import React, { useEffect, useState } from "react";
import "./style/orderdetail.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllOrdersFunc,
  UpdateOrderStatusFunc,
  downloadfileFunc,
} from "../../../Redux/Action/OrderAction";
import {
  AssignedVendor,
  GetAllVendor,
} from "../../../Redux/Action/VendorAction";
import { RxCross1 } from "react-icons/rx";
import Loading from "../../../Layout/Loading/Loading";
import { download } from "../../../Setting/GlobalVariable";

const OrderDetail = () => {
  const data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllOrdersFunc());
  }, []);

  const allorder = useSelector((state) => state.order.allorder);
  const { id } = useParams();

  const filterOrder = allorder?.filter((item) => item.OrderId == id);

  const allProduct = useSelector((state) => state.product.allProduct);

  const [showActions, setShowActions] = useState(
    new Array(data.length).fill(false)
  );
  const [showUsers, setShowUsers] = useState(
    new Array(data.length).fill(false)
  );

  const toggleActions = (index) => {
    const newShowActions = [...showActions];
    newShowActions[index] = !newShowActions[index];
    setShowActions(newShowActions);
  };

  const toggleUsers = (index) => {
    const newShowUsers = [...showUsers];
    newShowUsers[index] = !newShowUsers[index];
    setShowUsers(newShowUsers);
  };

  useEffect(() => {
    dispatch(GetAllVendor());
  }, []);

  const allVendor = useSelector((state) => state.vendor.allVendor);
  // console.log(allVendor)
  const filtervendor = allVendor?.filter((item) => item.IsActive === 1);
  const loading = useSelector((state) => state.vendor.loading);
  const orderloading = useSelector((state) => state.order.loading);

  const [showmodal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState(null);

  const handleSelectChange = (event, id) => {
    const selectedId = event.target.value;
    setSelectedItemId(selectedId);
    setSelectedOrderItemId(id);
  };

  const updatesomestate = (index) => {
    toggleUsers(index);
    setShowModal(true);
  };

  const assignedfunc = async () => {
    const vdata = {
      VendorId: selectedItemId,
      LineId: selectedOrderItemId,
    };
    await dispatch(AssignedVendor(vdata));
    dispatch(GetAllOrdersFunc());
  };

  const [status, setststus] = useState(false);
  const [statusget, setststusget] = useState("");

  const handletogetstatus = (e) => {
    setststusget(e.target.value);
  };

  const statatusDtaa = ["Printed ", "Rejected ", "Refunding ", "Completed "];
  const updatethemodalofstatus = (index) => {
    toggleUsers(index);
    setststus(true);
  };
  // ======

  const files = useSelector((state) => state.order.files);
  // console.log(files);
  const file1 = download+files?.image1;
  const file2 = download+files?.image2;
  // console.log(file1);

  const downloadFile1 = () => {
    if (file1) {
      initiateDownload(file1, "image1.jpg");
    }
  };

  const downloadFile2 = () => {
    if (file2) {
      initiateDownload(file2, "image2.jpg");
    }
  };

  const initiateDownload = (url, filename) => {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadcard = async (id) => {
    await dispatch(downloadfileFunc(id));
  };

  const updateitsStatus = async (id) => {
    await dispatch(UpdateOrderStatusFunc(id, statusget));
    dispatch(GetAllOrdersFunc());
  };

  return (
    <>
      {orderloading ? (
        <Loading />
      ) : (
        <>
          <div className="Order_Cart_Details_Header">
            {/* <a href={file1} download target="_blank">
              Download image1
            </a>
            <a href={file2} download target="_blank">
              Download image2
            </a> */}

            <h1>Order Deatiles.</h1>
            <div className="Order_Cart_Details_Header_box_parent">
              <div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>OrderId:</h2>
                  <h3>{filterOrder[0]?.OrderId}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Total Amount:</h2>
                  <h3>${filterOrder[0]?.NetAmount}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Total Items:</h2>
                  <h3>{filterOrder[0]?.items.length}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Time:</h2>
                  <h3>{filterOrder[0]?.created_at?.slice(0, 10)}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Payment Method:</h2>
                  <h3>{filterOrder[0]?.order.PaymentMethod}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Currency:</h2>
                  <h3>{filterOrder[0]?.Currency}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>PaymentStatus:</h2>
                  <h3>{filterOrder[0]?.order?.PaymentStatus}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Discount:</h2>
                  <h3>{filterOrder[0]?.Discount}</h3>
                </div>
              </div>
              <div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>FullName:</h2>
                  <h3>{filterOrder[0]?.order?.FullName}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Country:</h2>
                  <h3>{filterOrder[0]?.order?.Country}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>City:</h2>
                  <h3>{filterOrder[0]?.order?.City}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>State:</h2>
                  <h3>{filterOrder[0]?.order?.State}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Street Adress:</h2>
                  <h3>{filterOrder[0]?.order?.StreetAddress}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Email:</h2>
                  <h3>{filterOrder[0]?.order?.Email}</h3>
                </div>
                <div className="Order_Cart_Details_Header_box">
                  <h2>Mobile Number:</h2>
                  <h3>{filterOrder[0]?.order?.Mobile}</h3>
                </div>
              </div>
            </div>
          </div>
          {/* ============= */}
          <div className="order_detail">
            <div className="order_detail_header">
              <p>ProductId</p>
              <p>Product Name</p>
              <p>Product Quantity</p>
              <p>Product Price</p>
              <p>Item Status</p>
              <p>Assigned To</p>
              <p>Actions</p>
            </div>
            {/* =========== order detail box  */}
            {filterOrder[0]?.items?.map((item, index) => {
              return (
                <div className="order_details_box" key={item.id}>
                  {/* ===================  */}
                  {status === true && showUsers[index] && (
                    <div className="z-40 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-[.5] py-10">
                      <div className=" max-h-full relative w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                        <RxCross1
                          className="absolute top-[20px] right-[20px] text-[23px] cursor-pointer"
                          onClick={() => setststus(false)}
                        />

                        <div className="w-full h-[280px] overflow-auto flex flex-col justify-start place-items-center gap-2">
                          <div className="m-8 my-20 max-w-[400px] mx-auto">
                            <select onChange={(e) => handletogetstatus(e)}>
                              <option value="">Select Status</option>
                              {statatusDtaa?.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            <button
                              className="assigned"
                              onClick={() => updateitsStatus(item.id)}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================= */}
                  {showmodal === true && showUsers[index] && (
                    <div className="z-40 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
                      <div className=" max-h-full relative w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                        <RxCross1
                          className="absolute top-[20px] right-[20px] text-[23px] cursor-pointer"
                          onClick={() => setShowModal(false)}
                        />
                        {loading ? (
                          <Loading />
                        ) : (
                          <div className="w-full h-[280px] overflow-auto flex flex-col justify-start place-items-center gap-2">
                            <div className="m-8 my-20 max-w-[400px] mx-auto">
                              <select
                                onChange={(e) => handleSelectChange(e, item.id)}
                              >
                                <option value="">Select an item</option>
                                {filtervendor?.map((item, index) => (
                                  <option key={item.id} value={item.id}>
                                    {item.VendorName}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={assignedfunc}
                                className="assigned"
                              >
                                Assigne
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="order_details_box_header">
                    <h2>#{item.Product}</h2>
                    <h2>Birthday Card</h2>
                    <h2>1</h2>
                    <h2>${item.GrossAmount}</h2>
                    <h2
                      className={`${
                        item?.Status === "Completed"
                          ? "text-green-500"
                          : item?.Status === "Refunding"
                          ? "text-yellow-500"
                          : item?.Status === "Printed"
                          ? "text-green-500"
                          : item?.Status === "Rejected"
                          ? "text-red-500"
                          : "text-red-500"
                      } font-bold`}
                    >
                      {item?.Status}
                    </h2>{" "}
                    <h2>
                      {item?.vendor?.VendorName
                        ? item.vendor?.VendorName
                        : "Not Assigned"}
                    </h2>
                    <h2 className="flex justify-center place-items-center relative">
                      <BsThreeDotsVertical
                        className="mr-1"
                        onClick={() => toggleActions(index)}
                      />
                      <IoIosArrowDown
                        onClick={() => toggleUsers(index)}
                        className={`arrow-icon ${
                          showUsers[index]
                            ? "rotate-180 transition-all"
                            : "transition-all"
                        }`}
                      />
                      <div
                        className={
                          showActions[index]
                            ? "order_details_actions_box show_action"
                            : "order_details_actions_box"
                        }
                      >
                        {!item?.vendor?.VendorName ? (
                          <h2 onClick={async () => updatesomestate(index)}>
                            Assigned to vendor
                          </h2>
                        ) : null}
                        <h2 onClick={() => downloadcard(item.id)}>
                          Download File
                        </h2>
                        <h2 onClick={async () => updatethemodalofstatus(index)}>
                          Update Status
                        </h2>
                      </div>
                    </h2>
                  </div>
                  {/* ======= user detail  */}
                  <div className={"user_detail_box"}>
                    <div
                      className={
                        showUsers[index]
                          ? "user_detail_box_inner show"
                          : "user_detail_box_inner"
                      }
                    >
                      <h2>User Message</h2>
                      <div className="user_order_message">
                        <p>
                          {item.Message
                            ? item.Message
                            : "No Meassage Available"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        showUsers[index]
                          ? "user_detail_box_inner show"
                          : "user_detail_box_inner"
                      }
                    >
                      <h2 className="text-right">User Signature</h2>
                      <div className="user_order_message">
                        <p>
                          {item.Signature
                            ? item.Signature
                            : "No Signature Available"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* ------------- */}
                  {showUsers[index] && item?.NewAddress == 1 && (
                    <div className="single_card_address">
                      <p className="bg-[#D7D7D7] p-[10px] my-2">
                        Address :{" "}
                        {item.Country +
                          " " +
                          item.State +
                          " " +
                          item.City +
                          " " +
                          item.StreetAddress}
                      </p>
                      <p className="bg-[#D7D7D7] p-[10px] my-2">
                        ContactNo. {item.MobileNo}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetail;
