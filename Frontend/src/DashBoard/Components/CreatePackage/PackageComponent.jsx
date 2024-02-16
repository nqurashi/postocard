import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  PackgaeCreateFunc,
  editPackagefunction,
} from "../../../Redux/Action/UserAction";
import axios from "axios";
import { server } from "../../../Setting/GlobalVariable";
import Cookies from "js-cookie";
import { set } from "date-fns/esm";
import { Link } from "react-router-dom";

const PackageComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [getId, setGetId] = useState(null);

  const [PackageName, setPackageName] = useState("");
  const [PackageDeatils, setPackageDeatils] = useState("");
  const [PackagePrice, setPackagePrice] = useState("");
  const [PackageDiscount, setPackageDiscount] = useState("");
  const [cardCount, setcardCount] = useState("");

  const [details, setdetails] = useState([]);

  const [getPackages, setGetPackages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  const dispatch = useDispatch();

  const showModalHandler = () => {
    setShowModal(!showModal);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const updatePackageHandler = async () => {
    if (!PackageName || !PackagePrice || !PackageDiscount || !cardCount) {
      return toast.error("Please fill in all fields");
    }

    const packageData = {
      name: PackageName,
      package_detail: details,
      price: parseInt(PackagePrice), // Parse to ensure it's a number
      discount: parseInt(PackageDiscount), // Parse to ensure it's a number
      card_count: parseInt(cardCount),
    };
    // dispatch(editPackagefunction(packageData, id));

    try {
      const res = await fetch(`${server}/admin/packages/${getId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify(packageData),
      });

      const data = await res.json();
      console.log(data);
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else {
        const updatedPackages = getPackages.map((item) =>
          item.id === getId ? data.updatedPackage : item
        );
        setGetPackages(updatedPackages);

        toast.success(data.message);
      }
    } catch (error) {}

    setPackageName("");
    setPackageDeatils("");
    setPackagePrice("");
    setPackageDiscount("");
    setcardCount("");
    setdetails([]);
  };

  const AddDeatils = () => {
    if (!PackageDeatils) {
      return toast.error("Plaese Enter Package Detail");
    }
    const newPackageDetails = [...details, PackageDeatils];
    setdetails(newPackageDetails);
    setPackageDeatils("");
  };
  const removeDetails = (index) => {
    const filter = details?.filter((item, i) => i !== index);
    setdetails(filter);
  };

  const createPackage = () => {
    if (!PackageName || !PackagePrice || !PackageDiscount || !cardCount) {
      return toast.error("Please fill in all fields");
    }

    const packageData = {
      name: PackageName,
      package_detail: details,
      price: parseInt(PackagePrice), // Parse to ensure it's a number
      discount: parseInt(PackageDiscount), // Parse to ensure it's a number
      card_count: parseInt(cardCount),
    };
    dispatch(PackgaeCreateFunc(packageData));

    setPackageName("");
    setPackageDeatils("");
    setPackagePrice("");
    setPackageDiscount("");
    setcardCount("");
    setdetails([]);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${server}/admin/packages`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });

      setGetPackages(response.data.data);
      console.log(response.data, "packagesget");
    } catch (error) {
      console.log(error.message);
    }
  };

  const packageDelHandler = async (id) => {
    try {
      const response = await axios.delete(`${server}/admin/packages/${id}`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      if (response.status === 200) {
        setGetPackages((prevFolders) =>
          prevFolders.filter((folder) => folder.id !== id)
        );
      } else {
        alert("Failed to delete the folder.");
      }
    } catch (error) {
      console.error(error, "Error");
    }
  };

  console.log(getPackages);
  return (
    <>
      <div className="flex justify-center place-items-center h-[90vh]">
        <div className="w-[650px]">
          <h2 className="text-[50px] text-center mb-3 font-semibold">
            Create Package
          </h2>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Package Name.
            </label>
            <input
              type="text"
              value={PackageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="Enter Package Name"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Package Details.
            </label>
            <div className="relative">
              <input
                type="text"
                value={PackageDeatils}
                onChange={(e) => setPackageDeatils(e.target.value)}
                placeholder="Enter Package Details"
                className="w-full border-[1px]  border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
              />
              {details.length > 0 && (
                <div className="max-h-[200px] min-h-[40px] overflow-auto">
                  {details?.map((item, index) => {
                    return (
                      <div
                        className="px-2 py-1 bg-[#8080804b] flex justify-between place-items-center my-1"
                        key={index}
                      >
                        <p className="text-[18px]">{item}</p>
                        <RxCross1
                          className="text-[23px] cursor-pointer"
                          onClick={() => removeDetails(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <button
                className="absolute right-0 top-0 z-10 bg-[white] px-[30px] py-[8px]"
                onClick={AddDeatils}
              >
                Add
              </button>
            </div>
          </div>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Price.
            </label>
            <input
              type="number"
              value={PackagePrice}
              onChange={(e) => setPackagePrice(e.target.value)}
              placeholder="Enter Package Name"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Discount.
            </label>
            <input
              type="number"
              value={PackageDiscount}
              onChange={(e) => setPackageDiscount(e.target.value)}
              placeholder="Enter Package Name"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Card Count.
            </label>
            <input
              type="number"
              value={cardCount}
              onChange={(e) => setcardCount(e.target.value)}
              placeholder="Enter Package Name"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>
          <button
            className="w-full px-3 py-2 bg-[#6E6EEF] text-[white] my-3 rounded-sm"
            onClick={createPackage}
          >
            Create
          </button>
        </div>
      </div>
      <div class="flex flex-col overflow-x-auto px-5 py-5">
        <div class="sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-x-auto">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr className="bg-[lightgray]">
                    <th scope="col" class="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Card Count
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Discount
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Package Detail
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-gray-200 !w-[100%]">
                  {getPackages?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr
                        key={index}
                        class="bg-white border-b-2 border-gray-200"
                      >
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          {item.name}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {item.card_count}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {" "}
                          {item.price}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {item.discount}
                        </td>
                        <td
                          class="whitespace-nowrap px-6 py-4"
                          onClick={() => toggleAccordion(index)}
                        >
                          {" "}
                          {isOpen === index ? "▲" : "▼"}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          <Link to={`/admin/edit/package/${item.id}`}>
                          <button
                            class="middle none center mr-4 rounded-lg bg-green-500 py-3 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            
                          >
                            Edit
                          </button>
                          </Link>
                         
                          <button
                            class="middle none center mr-4 rounded-lg bg-red-500 py-3 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            onClick={() => packageDelHandler(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      {isOpen === index && (
                        <div class="flex flex-wrap bg-[red] !w-[100%]">
                          {item?.package_detail.map((detail, i) => (
                            <ul class="border border-gray-200 rounded overflow-hidden shadow-md flex justify-center place-items-center bg-[red]">
                              <li class="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                                {detail}
                              </li>
                            </ul>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                  {showModal && (
                    <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                      <div class="p-4 sm:p-7">
                        <div class="text-center">
                          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
                            Forgot password?
                          </h1>
                        </div>

                        <div class="mt-5">
                          <form>
                            <div className="flex justify-center place-items-center h-[90vh]">
                              <div className="w-[650px]">
                                <h2 className="text-[50px] text-center mb-3 font-semibold">
                                  Create Package
                                </h2>
                                <div className="w-full mb-2">
                                  <label
                                    htmlFor="name"
                                    className="w-full text-[19px] font-bold px-1"
                                  >
                                    Package Name.
                                  </label>
                                  <input
                                    type="text"
                                    value={PackageName}
                                    onChange={(e) =>
                                      setPackageName(e.target.value)
                                    }
                                    placeholder="Enter Package Name"
                                    className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
                                  />
                                </div>
                                <div className="w-full mb-2">
                                  <label
                                    htmlFor="name"
                                    className="w-full text-[19px] font-bold px-1"
                                  >
                                    Package Details.
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={PackageDeatils}
                                      onChange={(e) =>
                                        setPackageDeatils(e.target.value)
                                      }
                                      placeholder="Enter Package Details"
                                      className="w-full border-[1px]  border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
                                    />
                                    {details.length > 0 && (
                                      <div className="max-h-[200px] min-h-[40px] overflow-auto">
                                        {details?.map((item, index) => {
                                          return (
                                            <div
                                              className="px-2 py-1 bg-[#8080804b] flex justify-between place-items-center my-1"
                                              key={index}
                                            >
                                              <p className="text-[18px]">
                                                {item}
                                              </p>
                                              <RxCross1
                                                className="text-[23px] cursor-pointer"
                                                onClick={() =>
                                                  removeDetails(index)
                                                }
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                    <button
                                      className="absolute right-0 top-0 z-10 bg-[white] px-[30px] py-[8px]"
                                      onClick={AddDeatils}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                                <div className="w-full mb-2">
                                  <label
                                    htmlFor="name"
                                    className="w-full text-[19px] font-bold px-1"
                                  >
                                    Price.
                                  </label>
                                  <input
                                    type="number"
                                    value={PackagePrice}
                                    onChange={(e) =>
                                      setPackagePrice(e.target.value)
                                    }
                                    placeholder="Enter Package Name"
                                    className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
                                  />
                                </div>
                                <div className="w-full mb-2">
                                  <label
                                    htmlFor="name"
                                    className="w-full text-[19px] font-bold px-1"
                                  >
                                    Discount.
                                  </label>
                                  <input
                                    type="number"
                                    value={PackageDiscount}
                                    onChange={(e) =>
                                      setPackageDiscount(e.target.value)
                                    }
                                    placeholder="Enter Package Name"
                                    className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
                                  />
                                </div>
                                <div className="w-full mb-2">
                                  <label
                                    htmlFor="name"
                                    className="w-full text-[19px] font-bold px-1"
                                  >
                                    Card Count.
                                  </label>
                                  <input
                                    type="number"
                                    value={cardCount}
                                    onChange={(e) =>
                                      setcardCount(e.target.value)
                                    }
                                    placeholder="Enter Package Name"
                                    className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
                                  />
                                </div>
                                <button
                                  className="w-full px-3 py-2 bg-[#6E6EEF] text-[white] my-3 rounded-sm"
                                  onClick={updatePackageHandler}
                                >
                                  Update
                                </button>
                                <button
                                  className="w-full px-3 py-2 bg-[red] text-[white] my-3 rounded-sm"
                                  onClick={closeModalHandler}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageComponent;
