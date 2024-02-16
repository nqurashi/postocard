import React, { useEffect } from "react";
import Sidebar from "../../Layout/Sidebar";
import Navebar from "../../Layout/Navebar";
import { useDispatch, useSelector } from "react-redux";
import { UserAnalytics } from "../../../Redux/Action/UserAction";
import Loading from "../../../Layout/Loading/Loading";
import { GrRefresh } from "react-icons/gr";
import "./AdminUserAnalytics.css";

const AdminUserAnalytics = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserAnalytics());
  }, []);
  const UserAnalyticsdata = useSelector((state) => state.user.UserAnalytics);
  const isloading = useSelector((state) => state.user.loading);
  console.log(UserAnalyticsdata);
  return (
    <div className="dashboard_common">
      {/* ==================== sidebard dashboard  */}
      <div className="dashboard_sidebar">
        <Sidebar />
      </div>
      {/* ======================= navebar and content  */}
      <div className="navebar_content_dashbaord">
        {/* ============== naviabr  */}
        <Navebar />
        {/* =================== content  */}
        <div className="content_dashboard">
          <>
            {isloading ? (
              <Loading />
            ) : (
              <div className="bg-gray-50 min-h-screen relative">
                <div className="all_product_header flex justify-end place-items-center py-3 px-5 gap-3">
                  <div
                    className="bg-white rounded-[10px] px-1 py-1 border-2 border-[#b1b1b191] cursor-pointer flex justify-center place-items-center gap-1"
                    // onClick={() => dispatch(AdminAllUsersFunc())}
                  >
                    <GrRefresh className=" text-2xl " />
                    <span className="text-[18px]">Reload</span>
                  </div>
                  <div />
                </div>
                <div>
                  <div className="p-4">
                    <div className="bg-white p-4 rounded-md">
                      <div>
                        <h2 className="mb-4 text-xl font-bold text-gray-700">
                          All User
                        </h2>
                        <div>
                          <div>
                            <div className=" admin_user_table_analytics bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                              <div>
                                <span>Name</span>
                              </div>
                              <div>
                                <span>current-package</span>
                              </div>
                              <div>
                                <span>payment-method</span>
                              </div>
                            </div>
                            <div>
                              {UserAnalyticsdata?.map((item, index) => {
                                return (
                                  <div
                                    className="admin_user_table_analytics border-t text-md font-normal mt-2 admin_user_table"
                                    key={index}
                                  >
                                    <div className="px-2 max-w-[300px] flex place-items-center">
                                      <span>{item?.user?.name}</span>
                                    </div>
                                    <div className="px-2 max-w-[300px]">
                                      <span>{item?.user?.current_package}</span>
                                    </div>
                                    <div className="px-2">
                                      <span>{item?.PaymentMethod}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default AdminUserAnalytics;
