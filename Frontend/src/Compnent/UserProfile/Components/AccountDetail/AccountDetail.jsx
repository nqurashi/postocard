import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  ProfileUpdatte,
  UpdateUserPassword,
} from "../../../../Redux/Action/UserAction";
import Loading from "../../../../Layout/Loading/Loading";

const AccountDetail = () => {
  const user = useSelector((state) => state.user.user);
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showPass, setShowPass] = useState("hide");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  useEffect(() => {
    setname(user?.name ? user?.name : "");
    setemail(user?.email ? user?.email : "");
  }, []);
  const dispatch = useDispatch();
  const updatepassword = () => {
    if (!oldpassword) {
      return toast.error("Please enter your new Old Password");
    }
    if (!newpassword) {
      return toast.error("Please enter your new New Password");
    }
    if (!confirmPassword) {
      return toast.error("Please enter your new Confirm Password");
    }
    // --- chect is the new password is equal with the old password
    if (newpassword !== confirmPassword) {
      return toast.error("Confirm Password does not match");
    }
    dispatch(UpdateUserPassword(oldpassword, newpassword));
  };

  const updateProfile = () => {
    if (!name) {
      return toast.error("please Enter your name");
    }
    if (!email) {
      return toast.error("please Enter your email");
    }
    dispatch(ProfileUpdatte(name, email));
  };
  const loading = useSelector((state) => state.user.loading);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <h2 className="text-[35px] font-medium mb-2">Account Details</h2>
          <div className="box1_account_deatils my-2">
            <div className="flex justify-between place-items-center gap-2">
              <div className="my-2 w-full">
                <label
                  htmlFor="Email"
                  className="block text-[15px] font-bold mb-1 px-[3px]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  // readOnly
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Please enter your First Name"
                  className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px] `}
                  name="FirstName"
                />
              </div>
              <div className="my-2 w-full">
                <label
                  htmlFor="Email"
                  className="block text-[15px] font-bold mb-1 px-[3px]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Please enter your Last Name"
                  className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px] `}
                  name="lastName"
                />
              </div>
            </div>
            {/* <div className="my-2 w-full">
          <label
            htmlFor="Email"
            className="block text-[15px] font-bold mb-1 px-[3px]"
          >
            Display name
          </label>
          <input
            type="text"
            placeholder="Please enter your Name"
            className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px] `}
            name="name"
          />
        </div> */}
            <div className="my-2 w-full">
              <label
                htmlFor="Email"
                className="block text-[15px] font-bold mb-1 px-[3px]"
              >
                Email Address
              </label>
              <input
                type="email"
                // readOnly
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Please enter your email"
                className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px] `}
                name="email"
              />
            </div>
            <button
              className="text-[17px] px-[30px] py-[8px] bg-[#F49E3F] text-[white] rounded-sm mt-1 mb-3"
              onClick={updateProfile}
            >
              Update Account
            </button>
          </div>
          {/* -----  */}
          <h2 className="text-[25px] font-medium my-3">Change Password</h2>
          <div className="box1_account_deatils my-2">
            <div className="my-2 w-full relative">
              <label
                htmlFor="Email"
                className="block text-[15px] font-bold mb-1 px-[3px]"
              >
                Current password
              </label>
              <input
                value={oldpassword}
                onChange={(e) => setoldpassword(e.target.value)}
                type={showPass === "show" ? "text" : "password"}
                placeholder="**************"
                className={`w-full border-[1px] text-[18px] border-[#dbdbdb] outline-none px-[5px] py-[8px] `}
                name="oldpassword"
              />
              {showPass === "hide" ? (
                <IoMdEye
                  className="absolute top-[38px] right-[10px] text-[20px] cursor-pointer"
                  onClick={() => setShowPass("show")}
                />
              ) : (
                <IoMdEyeOff
                  className="absolute top-[38px] right-[10px] text-[20px] cursor-pointer"
                  onClick={() => setShowPass("hide")}
                />
              )}
            </div>

            <div className="my-2 w-full relative">
              <label
                htmlFor="Email"
                className="block text-[15px] font-bold mb-1 px-[3px]"
              >
                new passowrd
              </label>
              <input
                value={newpassword}
                onChange={(e) => setnewpassword(e.target.value)}
                type={showPass === "show" ? "text" : "password"}
                placeholder="*****************"
                className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px] `}
                name="newpassword"
              />
              {showPass === "hide" ? (
                <IoMdEye
                  className="absolute top-[38px] right-[10px] text-[20px] cursor-pointer"
                  onClick={() => setShowPass("show")}
                />
              ) : (
                <IoMdEyeOff
                  className="absolute top-[38px] right-[10px] text-[20px] cursor-pointer"
                  onClick={() => setShowPass("hide")}
                />
              )}
            </div>
            <div className="my-2 w-full relative">
              <label
                htmlFor="Email"
                className="block text-[15px] font-bold mb-1 px-[3px]"
              >
                Confirm new passowrd
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                type={showPass === "show" ? "text" : "password"}
                placeholder="****************"
                className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px] `}
                name="conformpassword"
              />
              {showPass === "hide" ? (
                <IoMdEye
                  className="absolute top-[38px] right-[10px] text-[20px] cursor-pointer"
                  onClick={() => setShowPass("show")}
                />
              ) : (
                <IoMdEyeOff
                  className="absolute top-[38px] right-[10px] text-[20px] cursor-pointer"
                  onClick={() => setShowPass("hide")}
                />
              )}
            </div>
          </div>
          <button
            className="text-[17px] px-[30px] py-[8px] bg-[#F49E3F] text-[white] rounded-sm"
            onClick={updatepassword}
          >
            Update Password
          </button>
        </div>
      )}
    </>
  );
};

export default AccountDetail;
