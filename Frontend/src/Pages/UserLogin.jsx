import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CiLock } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLoginAction } from "../Redux/Action/UserAction";
import SpinnerLoading from "../Layout/Loading/SpinnerLoading";
import UserAuth from "../Hooks/UserAuth";

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Plaese Enter Valid Email Address")
    .required("Plaese Enter Your Email"),
  password: Yup.string().required("Plaese Enter Your Password"),
});

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkbox, setCheckbox] = useState(false);
  const IsLoading = useSelector((state) => state.user.loading);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: () => {
      // alert(values.email, values.password);
      dispatch(
        UserLoginAction(values.email, values.password, navigate, checkbox)
      );
    },
  });
  const { errors, values, touched, handleChange, handleSubmit } = formik;
  return (
    <UserAuth>
      <div className="mt-[20px] mb-[120px] w-full  flex justify-center place-items-center flex-col">
        <h2 className="text-[28px] font-bold  my-2">Login to your account</h2>
        <div className="border-[1px] rounded-sm border-[#dbdbdb] py-[15px] px-[7px] w-[550px]">
          <div className="my-2">
            <label
              htmlFor="Email"
              className="block text-[15px] font-bold mb-1 px-[3px]"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Please enter your email"
              className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px] ${
                errors.email && touched.email
                  ? "border-1 border-[red] shake"
                  : null
              }`}
              value={values.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block text-[15px] font-bold mb-1 px-[3px]"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Please enter your password"
              className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px]
            ${
              errors.password && touched.password
                ? "border-1 border-[red] shake"
                : null
            }
            `}
              name="password"
              onChange={handleChange}
              value={values.password}
            />
          </div>

          <div className="my-2 flex justify-between place-items-center">
            <p
              className="flex justify-start place-items-center cursor-pointer gap-1 text-[15px]"
              onClick={() => setCheckbox(!checkbox)}
            >
              <input
                type="checkbox"
                className="text-[20px] cursor-pointer"
                checked={checkbox}
                onClick={(e) => setCheckbox(e.target.value)}
              />
              <span>Rember me</span>
            </p>
            <p className="flex justify-start place-items-center gap-1 my-2 text-[15px] cursor-pointer">
              <CiLock className="text-[18px]" /> Forgot Password
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={IsLoading}
            className="mt-2 w-full flex justify-center place-items-center disabled:cursor-no-drop disabled:bg-[#f49d3f57] rounded-sm text-[16px] px-2 py-2 text-[white] bg-[#F49E3F] cursor-pointer"
          >
            {IsLoading ? <SpinnerLoading /> : "Login"}
          </button>
          <NavLink to="/user/signup">
            <p className="mt-4 text-center text-[16px] font-thin cursor-pointer">
              Don't have an account?
            </p>
          </NavLink>
        </div>
      </div>
    </UserAuth>
  );
};

export default UserLogin;
