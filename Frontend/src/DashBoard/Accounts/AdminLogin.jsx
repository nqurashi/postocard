import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogedinUser, UserLoginAction } from "../../Redux/Action/UserAction";
import { toast } from "react-toastify";
import Loading from "../../Layout/Loading/Loading";
import AdminVerify from "../../Hooks/AdminVerify";
import AdminLoading from "../../Layout/Loading/AdminLoading";

const AdminLogin = () => {
  // -------redux
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const isAuthantication = useSelector((state) => state.user.isAuthantication);
  const user = useSelector((state) => state.user.user);

  // ---- use Navigation
  const navigate = useNavigate();

  // -------------useState for email and password
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const [checkbox, setCheckbox] = useState(false);

  //  onChange function
  const admindataChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  // -------- loginadmin
  const loginadmin = async () => {
    if (!adminData.email || !adminData.password) {
      return toast.error("Plaese Enter Email or Password");
    }
    setAdminData({
      email: "",
      password: "",
    });
    await dispatch(
      UserLoginAction(adminData.email, adminData.password, navigate, checkbox)
    );
    dispatch(LogedinUser());
  };

  useEffect(() => {
    if (isAuthantication === true && user?.IsAdmin === 1) {
      // navigate("/admin/dashboard")
      navigate("/admin/dashboard");
    }
  }, [isAuthantication]);

  return (
    <>
      {loading ? (
        <AdminLoading />
      ) : (
        <>
          <div className="h-[100vh] flex flex-col justify-center place-items-center absolute top-0 left-0 w-full bg-white z-[20]">
            {/* ======================  inputs filed */}
            <div className="input_field_admin_content">
              <div className="h-[80vh] bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                  <h1 className="font-bold text-center text-2xl mb-5">
                    Your Logo
                  </h1>
                  <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                      <label className="font-semibold text-sm text-gray-600 pb-1 block">
                        E-mail
                      </label>
                      <input
                        type="email"
                        placeholder="Plaese Enter Your Email"
                        required
                        name="email"
                        value={adminData.email}
                        onChange={admindataChange}
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                      />

                      <label className="font-semibold text-sm text-gray-600 pb-1 block">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Please Enter Your Password"
                        required
                        name="password"
                        value={adminData.password}
                        onChange={admindataChange}
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                      />
                      <div className="flex justify-start place-items-center gap-1 mb-3">
                        <input
                          type="checkbox"
                          className="p-2"
                          onChange={(e) => setCheckbox(e.target.checked)}
                        />
                        <p>Remember me</p>
                      </div>
                      <button
                        onClick={loginadmin}
                        type="button"
                        className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                      >
                        <span className="inline-block mr-2">Login</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4 inline-block"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="py-5">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                          <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-4 h-4 inline-block align-text-top"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="inline-block ml-1">
                              Forgot Password
                            </span>
                            <br />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminLogin;
