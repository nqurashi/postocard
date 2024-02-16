import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActiveOrDeactiveUser,
  AdminAllUsersFunc,
} from "../../../Redux/Action/UserAction";
import "./AdminAllUsers.css";
import Loading from "../../../Layout/Loading/Loading";
import { GrRefresh } from "react-icons/gr";

const AdminAllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAllUsersFunc());
  }, []);
  const AdminUsers = useSelector((state) => state.user.AdminUsers);
  const isloading = useSelector((state) => state.user.loading);
  console.log(AdminUsers);
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="bg-gray-50 min-h-screen relative">
          <div className="all_product_header flex justify-end place-items-center py-3 px-5 gap-3">
            <div
              className="bg-white rounded-[10px] px-1 py-1 border-2 border-[#b1b1b191] cursor-pointer flex justify-center place-items-center gap-1"
              onClick={() => dispatch(AdminAllUsersFunc())}
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
                    All User ({AdminUsers?.length})
                  </h2>
                  <div>
                    <div>
                      <div className=" admin_user_table bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                        <div>
                          <span>Name</span>
                        </div>
                        <div>
                          <span>Email</span>
                        </div>
                        <div>
                          <span>Role</span>
                        </div>
                        <div>
                          <span>Active</span>
                        </div>
                        <div>
                          <span>Time</span>
                        </div>
                        <div>
                          <span>Edit</span>
                        </div>
                      </div>
                      <div>
                        {AdminUsers?.map((item, index) => {
                          return (
                            <div
                              className=" border-t text-md font-normal mt-2 admin_user_table"
                              key={index}
                            >
                              <div className="px-2 max-w-[300px] flex place-items-center">
                                <span>{item?.name}</span>
                              </div>
                              <div className="px-2 max-w-[300px]">
                                <span>{item?.email}</span>
                              </div>
                              <div className="px-2">
                                <span>{item.role}</span>
                              </div>
                              <div className="px-2">
                                <span>
                                  {item.is_active === false
                                    ? "DeActive"
                                    : "Active"}
                                </span>
                              </div>
                              <div className="px-2">
                                <span>{item?.created_at?.slice(0, 10)}</span>
                              </div>
                              <div className="px-2">
                                {/* <select>
                          <option>Admin</option>
                          <option>User</option>
                        </select> */}
                                {item.is_active == true ? (
                                  <button
                                    className="btn_admin_user !text-[red]"
                                    onClick={async () => {
                                      await dispatch(
                                        ActiveOrDeactiveUser(item.id)
                                      );
                                      await dispatch(AdminAllUsersFunc());
                                    }}
                                  >
                                    DeActivate User
                                  </button>
                                ) : (
                                  <button
                                    className="btn_admin_user !text-[green]"
                                    onClick={async () => {
                                      await dispatch(
                                        ActiveOrDeactiveUser(item.id)
                                      );
                                      await dispatch(AdminAllUsersFunc());
                                    }}
                                  >
                                    Activate User
                                  </button>
                                )}
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
  );
};

export default AdminAllUsers;
