import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActiveOrDeactiveUser,
  AdminAllUsersFunc,
} from "../../../Redux/Action/UserAction";
import "./AdminAllUsers.css";
import Loading from "../../../Layout/Loading/Loading";
import { GrRefresh } from "react-icons/gr";
import axios from "axios";
import { server } from "../../../Setting/GlobalVariable";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AdminAllArtists = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAllUsersFunc());
  }, []);
  const AdminUsers = useSelector((state) => state.user.AdminUsers);
  const isloading = useSelector((state) => state.user.loading);
  console.log(AdminUsers);

  const [showModal, setShowModal] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);

  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
  });
  const [artists, setArtists] = useState([]);
  const [id, setId] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const createArtistHandler = async () => {
    try {
      const res = await axios.post(`${server}/artist/create`, createForm, {
        headers: {
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      console.log(res.data);
      setShowModal(false);
      getArtists();
    } catch (error) {
      console.log(error.message);
      setShowModal(false);
    }
  };

  useEffect(() => {
    getArtists();
  }, []);

  const loadAllArtistHandler = () => {
    getArtists();
  };

  const getArtists = async () => {
    try {
      const res = await axios.get(`${server}/artists`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      console.log(res.data);
      setArtists(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const delArtistHandler = async (id) => {
    try {
      const res = await axios.delete(`${server}/artist/${id}`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      console.log(res.data);
      getArtists();
      toast.success("Artist Deleted Successfully");
    } catch (error) {
      console.log(error.message);
      toast.success(error.message);
    }
  };

  const updateArtistHandler = async (id) => {
    try {
      setId(id);
      setShowModal(true);
      setUpdateButton(true);
      const res = await axios.get(`${server}/artist/${id}`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      console.log(res.data);
      const getSpecific = res.data;
      setCreateForm({
        ...createForm, // Spread the existing state
        name: getSpecific?.name || createForm.name,
        email: getSpecific?.email || createForm.email,
      });
      // setShowModal(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      // setShowModal(false);
    }
  };

  const finalUpdateHandler = async () => {
    try {
      const res = await axios.put(`${server}/artist/${id}`, createForm, {
        headers: {
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      console.log(res.data);
      toast.success("Artist Updated Successfully");
      setShowModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="bg-gray-50 min-h-screen relative">
          <div className="all_product_header flex justify-end place-items-center py-3 px-5 gap-3">
            <div
              className="bg-white rounded-[10px] px-1 py-1 border-2 border-[#b1b1b191] cursor-pointer flex justify-center place-items-center gap-1"
              onClick={() => {
                setShowModal(true);
                setUpdateButton(false);
              }}
            >
              {/* <GrRefresh className=" text-2xl " /> */}
              <span className="text-[18px]">Create Artist</span>
            </div>
            <div
              className="bg-white rounded-[10px] px-1 py-1 border-2 border-[#b1b1b191] cursor-pointer flex justify-center place-items-center gap-1"
              onClick={loadAllArtistHandler}
            >
              <GrRefresh className=" text-2xl " />
              <span className="text-[18px]">Reload</span>
            </div>
            <div />
          </div>
          {showModal && (
            <div className="fixed inset-0 z-10 flex items-center justify-center">
              {/* <div className="absolute inset-0 bg-gray-800 opacity-50"></div> */}
              <main
                id="content"
                role="main"
                class="w-full max-w-md mx-auto p-6"
              >
                <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <div class="p-4 sm:p-7">
                    <div class="text-center">
                      <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
                        Create Artist
                      </h1>
                    </div>

                    <div class="mt-5">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault(); // Prevent the default form submission behavior
                          updateButton
                            ? finalUpdateHandler()
                            : createArtistHandler();
                        }}
                      >
                        <div class="grid gap-y-4">
                          <div>
                            <label
                              for="name"
                              class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                            >
                              Name
                            </label>
                            <div class="relative">
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={createForm.name}
                                onChange={handleChange}
                                class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                required
                                aria-describedby="name-error"
                              />
                            </div>
                            <p
                              class="hidden text-xs text-red-600 mt-2"
                              id="email-error"
                            >
                              Please include a valid email address so we can get
                              back to you
                            </p>
                          </div>
                          <div>
                            <label
                              for="email"
                              class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                            >
                              Email address
                            </label>
                            <div class="relative">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={createForm.email}
                                onChange={handleChange}
                                class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                required
                                aria-describedby="email-error"
                              />
                            </div>
                            <p
                              class="hidden text-xs text-red-600 mt-2"
                              id="email-error"
                            >
                              Please include a valid email address so we can get
                              back to you
                            </p>
                          </div>
                          <div class="flex space-x-4">
                            <button
                              type="submit"
                              class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                            >
                              {updateButton ? "Update" : "Create"}
                            </button>

                            <button
                              type="submit"
                              class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          )}
          <div>
            <div className="p-4">
              <div className="bg-white p-4 rounded-md">
                <div>
                  <h2 className="mb-4 text-xl font-bold text-gray-700">
                    All Artists ({AdminUsers?.length})
                  </h2>
                  <div>
                    <div>
                      <div className=" admin_user_table bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                        <div>
                          <span>ID</span>
                        </div>
                        <div>
                          <span>Name</span>
                        </div>
                        <div>
                          <span>Email</span>
                        </div>

                        <div>
                          <span>Actions</span>
                        </div>
                      </div>
                      <div>
                        {artists?.map((item, index) => {
                          return (
                            <div
                              className=" border-t text-md font-normal mt-2 admin_user_table"
                              key={index}
                            >
                              <div className="px-2 max-w-[300px] flex place-items-center">
                                <span>{item?.id}</span>
                              </div>
                              <div className="px-2 max-w-[300px]">
                                <span>{item?.name}</span>
                              </div>
                              <div className="px-2">
                                <span>{item.email}</span>
                              </div>
                              <div className="flex gap-1 px-2">
                                <button
                                  class="middle none center mr-4 rounded-lg bg-green-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  data-ripple-light="true"
                                  onClick={() => updateArtistHandler(item.id)}
                                >
                                  Edit
                                </button>

                                <button
                                  class="middle none center mr-4 rounded-lg bg-red-500 py-2 px-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  data-ripple-light="true"
                                  onClick={() => delArtistHandler(item.id)}
                                >
                                  Delete
                                </button>
                              </div>

                              {/* <div className="px-2">
                                <span>
                                  {item.is_active === false
                                    ? "DeActive"
                                    : "Active"}
                                </span>
                              </div> */}
                              {/* <div className="px-2">
                                <span>{item?.created_at?.slice(0, 10)}</span>
                              </div> */}
                              {/* <div className="px-2">
                                <select>
                          <option>Admin</option>
                          <option>User</option>
                        </select>
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
                              </div> */}
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

export default AdminAllArtists;
