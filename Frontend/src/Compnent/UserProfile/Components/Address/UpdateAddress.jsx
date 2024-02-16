import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getuseraddress,
  updateuseraddress,
} from "../../../../Redux/Action/UserAction";
import Loading from "../../../../Layout/Loading/Loading";

const UpdateAddress = ({ isEdit, id = 1 }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const userAddress = useSelector((state) => state.user.userAddress);
  const [filtertheaddress, setFiltertheaddres] = useState([]);
  console.log(id);

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

  const data = {
    full_name: firstName + lastName,
    country: country,
    street_address: streetaddress,
    City: city,
    town: town,
    state: state,
    postal_code: postocode,
    phone: phone,
    address_name: addressName,
  };

  const UpdateAddress = async () => {
    await dispatch(updateuseraddress(data, id));
    dispatch(getuseraddress());
  };

  useEffect(() => {
    dispatch(getuseraddress());
  }, []);

  useEffect(() => {
    const filterAddress = userAddress?.filter((item) => item.id === id);
    setFiltertheaddres(filterAddress);
  }, [id]);
  useEffect(() => {
    if (filtertheaddress.length > 0) {
      const address = filtertheaddress[0]; // Access the first (and only) item in the filtered array
      setFirstName(address.full_name.split(" ")[0] || ""); // Split full_name into first and last names
      setLastName(address.full_name.split(" ")[1] || "");
      setCountry(address.country || "");
      setStreetAddress(address.street_address || "");
      setCity(address.city || "");
      setTown(address.town || "");
      setState(address.state || "");
      setpostalCode(address.postal_code || null);
      setPhone(address.phone || "");
      setAddressName(address.address_name || "");
    }
  }, [filtertheaddress]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="">
            <div className="my-3 ">
              <label
                htmlFor=""
                className="block my-1 px-1 text-[18px] font-bold"
              >
                Address Name
              </label>
              <input
                type="text"
                placeholder="Address Name"
                value={addressName}
                readOnly={!isEdit}
                onChange={(e) => setAddressName(e.target.value)}
                className="w-full  outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor=""
                className="block my-1 px-1 text-[15px] font-bold"
              >
                FullName
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                readOnly={!isEdit}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
              />
            </div>
            {/* <div className="my-2">
              <label
                htmlFor=""
                className="block my-1 px-1 text-[15px] font-bold"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                readOnly={!isEdit}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
              />
            </div> */}
            <div className="my-2">
              <label
                htmlFor=""
                className="block my-1 px-1 text-[15px] font-bold"
              >
                Country
              </label>
              <input
                type="text"
                placeholder="Country"
                value={country}
                readOnly={!isEdit}
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
                placeholder="Street Address"
                value={streetaddress}
                readOnly={!isEdit}
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
                placeholder="City"
                value={city}
                readOnly={!isEdit}
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
                placeholder="Town"
                value={town}
                readOnly={!isEdit}
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
                placeholder="State"
                value={state}
                readOnly={!isEdit}
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
                placeholder="Postal Code"
                value={postocode}
                readOnly={!isEdit}
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
                placeholder="Phone Number"
                value={phone}
                readOnly={!isEdit}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
              />
            </div>
          </div>
          <button
            className="w-full bg-[#F49E3F] py-2 px-2 my-3  rounded-sm text-white"
            onClick={UpdateAddress}
          >
            Update Address
          </button>
        </>
      )}
    </>
  );
};

export default UpdateAddress;
