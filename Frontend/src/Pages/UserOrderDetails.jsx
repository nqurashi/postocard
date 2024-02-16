import React from "react";
import OrderDetailesUser from "../Compnent/UserProfile/Components/OrderDetailes/OrderDetailesUser";
import ProfileAuth from "../Hooks/ProfileAuth";

const UserOrderDetails = () => {
  return (
    <ProfileAuth>
      <OrderDetailesUser />
    </ProfileAuth>
  );
};

export default UserOrderDetails;
