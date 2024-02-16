import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateAddress,
  deleteAddress,
  getuseraddress,
} from "../../../../Redux/Action/UserAction";
import { LuFolderSymlink } from "react-icons/lu";
import { MdKeyboardBackspace } from "react-icons/md";
import UpdateAddress from "./UpdateAddress";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import Loading from "../../../../Layout/Loading/Loading";
import { MdDeleteOutline } from "react-icons/md";

const UserAddres = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // --- state

  const [activeaddress, setActiveAddress] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [showmoadl, setShowMoadl] = useState(false);

  // ==============================
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [streetaddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [postocode, setpostalCode] = useState(null);
  const [phone, setPhone] = useState("");
  const [addressName, setAddressName] = useState("");
  // ---
  const [id, setId] = useState(null);

  const data = {
    user_id: user?.id,
    full_name: firstName + lastName,
    country: country,
    street_address: streetaddress,
    city: city,
    town: town,
    state: state,
    postal_code: postocode,
    phone: phone,
    address_name: addressName,
  };

  const createuseraddress = async () => {
    if (
      !firstName ||
      !lastName ||
      !country ||
      !streetaddress ||
      !city ||
      !state ||
      !postocode ||
      !town ||
      !phone ||
      !addressName
    ) {
      return toast.error("Plaese Enter All Fields");
    }
    await dispatch(CreateAddress(data));
    dispatch(getuseraddress());
    setShowMoadl(false);
  };
  const loading = useSelector((state) => state.user.loading);
  const userAddress = useSelector((state) => state.user.userAddress);
  useEffect(() => {
    dispatch(getuseraddress());
  }, []);
  return (
    <div className="">
      <h2 className="text-[35px] font-medium ">Address</h2>
      <h2 className="text-[20px] font-medium">Billing address</h2>

      {/* ----- address  */}
      {activeaddress === 1 && (
        <>
          <p onClick={() => setActiveAddress(0)} className="my-1">
            <MdKeyboardBackspace className="text-[25px]  cursor-pointer" />
          </p>
          <h2
            className="text-[16px] text-[#0FAFE9] font-medium mb-2 cursor-pointer"
            onClick={() => setIsEdit(!isEdit)}
          >
            {!isEdit ? "Edit" : "ReadOnly"}
          </h2>
          {/* <div className="addres_user border-[1px] border-[#D4D4D4]">
            <div className="flex  px-[20px] py-[10px] justify-between place-items-center border-b-[1px] border-b-[#D4D4D4]">
              <p>First Name</p>
              <p>Ali</p>
            </div>
            <div className="flex px-[20px] py-[10px] justify-between place-items-center border-b-[1px] border-b-[#D4D4D4]">
              <p>Last Name</p>
              <p>Ali</p>
            </div>
            <div className="flex px-[20px] py-[10px] justify-between place-items-center border-b-[1px] border-b-[#D4D4D4]">
              <p>Country</p>
              <p>Pakistan</p>
            </div>
            <div className="flex px-[20px] py-[10px] justify-between place-items-center border-b-[1px] border-b-[#D4D4D4]">
              <p>Street Address</p>
              <p>Pakistan</p>
            </div>
            <div className="flex px-[20px] py-[10px] justify-between place-items-center border-b-[1px] border-b-[#D4D4D4]">
              <p>Town</p>
              <p>Pakistan</p>
            </div>
            <div className="flex px-[20px] py-[10px] justify-between place-items-center border-b-[1px] border-b-[#D4D4D4]">
              <p>State</p>
              <p>Pakistan</p>
            </div>
            <div className="flex px-[20px] py-[10px] justify-between place-items-center border-b-[1px] border-b-[#D4D4D4]">
              <p>Postal Code</p>
              <p>Pakistan</p>
            </div>
            <div className="flex px-[20px] py-[10px] justify-between place-items-center border-b-[1px] border-b-[#D4D4D4]">
              <p>Phone</p>
              <p>Pakistan</p>
            </div>
            <div className="flex px-[20px] py-[10px] justify-between place-items-center border-b-[1px] border-b-[#D4D4D4]">
              <p>Email Address</p>
              <p>Pakistan</p>
            </div>
          </div> */}
          {/* -----------  */}
          <UpdateAddress isEdit={isEdit} id={id} />
        </>
      )}
      {/* ====================  */}
      {activeaddress === 0 &&
        (loading ? (
          <Loading />
        ) : (
          <div className="">
            {/* ------------------  */}
            <div className="">
              {/* --- head  */}
              <div className="bg-[#F49E3F] mt-2 w-full flex justify-between place-items-center px-2 py-3 rounded-sm">
                <p className="text-white text-[20px] font-bold">
                  Name of Address
                </p>
                <p className="text-white text-[20px] font-bold">Action</p>
              </div>
              {/* ---- body  */}
              <div>
                {userAddress?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex justify-between place-items-center  mb-1 py-3 px-2 border-[1px] border-[#80808085] ${
                        index % 2 !== 0 ? "bg-[#FCE4CA]" : "bg-[white]"
                      }`}
                    >
                      <p className="text-[20px]">{item?.address_name}</p>
                      <p className="flex justify-center place-items-center gap-2">
                        <LuFolderSymlink
                          className="text-[23px] cursor-pointer"
                          onClick={() => {
                            setActiveAddress(1);
                            setId(item.id);
                          }}
                        />
                        <MdDeleteOutline
                          className="text-[25px] cursor-pointer text-[red]"
                          onClick={() => {
                            dispatch(deleteAddress(item.id));
                            dispatch(getuseraddress());
                          }}
                        />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      <button
        className=" bg-[#F49E3F] py-2 px-2 my-3 rounded-sm text-white"
        onClick={() => setShowMoadl(true)}
      >
        Create New Address
      </button>

      {/* ==================== create new address  */}
      {showmoadl && (
        <div>
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
            <div className="max-h-full relative w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
              <div className="w-full ">
                <RxCross1
                  className="absolute top-3 right-3 text-[23px] cursor-pointer "
                  onClick={() => setShowMoadl(false)}
                />
                <div className="m-1 my-20 max-w-[400px] mx-auto">
                  <div className="">
                    <div className="my-3">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[18px] font-bold"
                      >
                        Address Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Address Name"
                        value={addressName}
                        onChange={(e) => setAddressName(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[15px] font-bold"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[15px] font-bold"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[15px] font-bold"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[15px] font-bold"
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Street Address"
                        value={streetaddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[15px] font-bold"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[15px] font-bold"
                      >
                        Town
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Town"
                        value={town}
                        onChange={(e) => setTown(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[15px] font-bold"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[15px] font-bold"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Postal Code"
                        value={postocode}
                        onChange={(e) => setpostalCode(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor=""
                        className="block my-1 px-1 text-[15px] font-bold"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <button
                      className="p-3 bg-[#F49E3F] rounded-md text-white w-full text-[18px]"
                      onClick={() => createuseraddress()}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // ============================
  );
};

export default UserAddres;
