import React, { useEffect } from "react";
import "./UserOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { GetUserOrder } from "../../../../Redux/Action/OrderAction";
import { NavLink } from "react-router-dom";

const UserOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserOrder());
  }, []);
  const UserOrders = useSelector((state) => state.order.UserOrders);
  // console.log(UserOrders);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-[35px] font-medium mb-2">Orders</h2>
      <div className="orders_box">
        <div className="order_box_header">
          <p>Order Id</p>
          <p>Status</p>
          <p>Total</p>
          <p>Discount</p>
          <p>Total Product</p>
          <p>
            <span className="text-[green]">Comp</span> /
            <span className="text-[red]">Pend</span>
          </p>
          <p>Action</p>
        </div>
        {/* --body  */}
        <div className="">
          {UserOrders?.map((item, index) => {
            const CompletedOrder = item?.cart?.order_items?.filter(
              (item) => item.Status === "Completed"
            );
            const PendingOrder = item?.cart?.order_items?.filter(
              (item) =>
                item.Status === "Pending" ||
                "Printed" ||
                "Rejected" ||
                "Refunding"
            );
            return (
              <div
                key={index}
                className={`user_order_boady ${
                  index % 2 !== 0 && "bg-[#F9C48D]"
                }`}
              >
                {/* <div className="flex justify-start place-items-center gap-1">
                  <img
                    // src="https://tse4.mm.bing.net/th?id=OIP.mym1qB0KCJ99Uc2GVQ1G2wHaLH&pid=Api&P=0&h=220"
                    src={i?.product_details?.File1}
                    alt=""
                  />
                </div> */}
                <p>#{item?.cart?.OrderId}</p>
                <p>
                  {item?.cart?.IsCompleted === 0 ? (
                    <p className="text-[red] font-bold">Pending</p>
                  ) : (
                    <p className="text-[green] font-bold">Complete</p>
                  )}
                </p>
                <p>${item?.cart?.NetAmount}.00</p>
                <p>${item?.cart?.Discount}.00</p>
                <p className="">{item?.cart?.ProductCount}</p>
                <p className="">
                  <span className="text-[green] font-bold">
                    {CompletedOrder && CompletedOrder?.length}
                  </span>{" "}
                  /{" "}
                  <span className="text-[red] font-bold">
                    {PendingOrder && PendingOrder?.length}
                  </span>
                </p>
                <div className="buttons_user_order_body">
                  <NavLink to={`/user/order/details/${item?.id}`}>
                    <button className="bg-[#0FAFE9]">Details</button>
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
