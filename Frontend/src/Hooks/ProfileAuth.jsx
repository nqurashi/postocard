import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileAuth = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const isAuthantication = useSelector((state) => state.user.isAuthantication);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !isAuthantication) {
      return navigate("/user/login");
    }
  }, [isAuthantication, user]);
  return <>{children}</>;
};

export default ProfileAuth;
