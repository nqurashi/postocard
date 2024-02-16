import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserAuth = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const isAuthantication = useSelector((state) => state.user.isAuthantication);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && isAuthantication) {
      return navigate("/user/profile");
    } else if (user?.isAdmin === 1) {
      return navigate("/admin/dashboard");
    }
  }, [user, isAuthantication, navigate]);

  return <>{children}</>;
};

export default UserAuth;
