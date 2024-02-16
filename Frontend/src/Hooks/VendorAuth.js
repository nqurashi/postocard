import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const VendorAuth = ({ children }) => {
  const isVendorExist = Cookies.get("vendorLoginToken");

  if (!isVendorExist) {
    return <Navigate replace to={"/vendor/login"} />;
  } else {
    return <>{children}</>;
  }
};
export default VendorAuth;
