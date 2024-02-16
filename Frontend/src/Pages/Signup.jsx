import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiAccountCircleLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { userRegistration } from "../Redux/Action/UserAction";
import { useDispatch, useSelector } from "react-redux";
import UserAuth from "../Hooks/UserAuth";
import SpinnerLoading from "../Layout/Loading/SpinnerLoading";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Schema = Yup.object().shape({
  name: Yup.string().required("Plaese Enter Your name"),
  email: Yup.string()
    .email("Plaese Enter Valid Email Address")
    .required("Plaese Enter Your Email"),
  password: Yup.string()
    .required("Plaese Enter Your Password")
    .min(8, "Password must be at least 8 characters"),
});

const Signup = () => {
  const [profile, setProfile] = useState(null);
  const [imagedata, setImagedata] = useState(null);
  const IsLoading = useSelector((state) => state.user.loading);
  const [showPass, setShowPass] = useState("hide");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: Schema,
    onSubmit: () => {
      dispatch(
        userRegistration(
          values.name,
          values.email,
          values.password,
          // imagedata,
          navigate
        )
      );
    },
  });
  const { errors, values, touched, handleChange, handleSubmit } = formik;

  // --------------- hnadleprofilechnage
  const hnadleprofilechnage = (e) => {
    const file = e.target.files[0];
    setImagedata(file);
    const render = new FileReader();

    render.onload = () => {
      if (render.readyState === 2) {
        setProfile(render.result);
      }
    };
    render.readAsDataURL(file);
  };

  return (
    <UserAuth>
      <div className="mt-[20px] mb-[120px] w-full  flex justify-center place-items-center flex-col">
        <h2 className="text-[28px] font-bold  my-2">Create an account</h2>
        <div className="border-[1px] rounded-sm border-[#dbdbdb] py-[15px] px-[7px] w-[550px]">
          <div className="my-2">
            <label
              htmlFor="name"
              className="block text-[15px] font-bold mb-1 px-[3px]"
            >
              FullName
            </label>
            <input
              type="text"
              placeholder="Please enter your FullName"
              className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px] ${
                errors.name && touched.name
                  ? "border-1 border-[red] shake"
                  : null
              }`}
              value={values.name}
              onChange={handleChange}
              name="name"
            />
            {errors.name && touched.name ? (
              <p className="text-[red] my-1 mx-1 text-[15px]">{errors.name}</p>
            ) : null}
          </div>
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
            {errors.email && touched.email ? (
              <p className="text-[red] my-1 mx-1 text-[15px]">{errors.email}</p>
            ) : null}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-[15px] font-bold mb-1 px-[3px]"
            >
              Password
            </label>
            <input
              type={showPass === "show" ? "text" : "password"}
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
            {errors.password && touched.password ? (
              <p className="text-[red] my-1 mx-1 text-[15px]">
                {errors.password}
              </p>
            ) : null}
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
          {/* <div className="border-[2px] my-2 gap-2 border-w-[#DBDBDB] flex justify-start place-items-center px-1 py-[8px]">
            {profile ? (
              <img
                src={profile}
                alt=""
                className="w-[50px] h-[50px] object-contain rounded-full border-[1px] border-[gray]"
              />
            ) : (
              <RiAccountCircleLine className="text-[50px]" />
            )}
            <label htmlFor="image" className="text-[19px] cursor-pointer">
              Profile Picture
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={hnadleprofilechnage}
            />
          </div> */}
          <button
            type="button" // Change this to "submit" if you want a submit button
            onClick={handleSubmit}
            disabled={IsLoading}
            className="mt-2 w-full disabled:cursor-no-drop disabled:bg-[#f49d3f57] flex justify-center place-items-center rounded-sm text-[16px] px-2 py-2 text-[white] bg-[#F49E3F] cursor-pointer"
          >
            {IsLoading ? <SpinnerLoading /> : "Sign-Up"}
          </button>
          <NavLink to="/user/login">
            <p className="mt-4 text-center text-[16px] font-thin cursor-pointer">
              Already have an account?
            </p>
          </NavLink>
        </div>
      </div>
    </UserAuth>
  );
};

export default Signup;
