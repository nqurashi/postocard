import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../../Setting/GlobalVariable";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const EditPackageComponent = () => {
  const params = useParams();

  const [PackageName, setPackageName] = useState("");
  const [PackageDeatils, setPackageDeatils] = useState("");
  const [PackagePrice, setPackagePrice] = useState("");
  const [PackageDiscount, setPackageDiscount] = useState("");
  const [cardCount, setcardCount] = useState("");

  const [details, setdetails] = useState([]);
  const [getPackages, setGetPackages] = useState([]);

  useEffect(() => {
    getSpecificPackage();
  }, []);
  const getSpecificPackage = async () => {
    try {
      const res = await fetch(`${server}/admin/packages/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify(),
      });

      const data = await res.json();
      console.log(data, "get specific data");

      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else {
        const packageDetails = data.data;

        // Set state values based on received data
        setPackageName(packageDetails?.name || "");
        setdetails(packageDetails?.package_detail || []);
        setPackagePrice(packageDetails?.price || "");
        setPackageDiscount(packageDetails?.discount || "");
        setcardCount(packageDetails?.card_count || "");
      }
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const AddDeatils = () => {
    if (!PackageDeatils) {
      return toast.error("Please Enter Package Detail");
    }
    const newPackageDetails = [...details, PackageDeatils];
    setdetails(newPackageDetails);
    setPackageDeatils("");
  };

  const removeDetails = (index) => {
    const filter = details?.filter((item, i) => i !== index);
    setdetails(filter);
  };

  const updatePackageHandler = async () => {
    if (!PackageName || !PackagePrice || !PackageDiscount || !cardCount) {
      return toast.error("Please fill in all fields");
    }

    const packageData = {
      name: PackageName,
      package_detail: details,
      price: parseInt(PackagePrice),
      discount: parseInt(PackageDiscount),
      card_count: parseInt(cardCount),
    };

    try {
      const res = await fetch(`${server}/admin/packages/${params.id}`, {
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
        // } else {
        //   const updatedPackages = getPackages.map((item) =>
        //     item.id === params.id ? data.updatedPackage : item
        //   );
        //   setGetPackages(updatedPackages);

        //   toast.success(data.message);
      }
    } catch (error) {
      console.error("Error updating package:", error);
    }

    // Reset the form
    setPackageName("");
    setPackageDeatils("");
    setPackagePrice("");
    setPackageDiscount("");
    setcardCount("");
    setdetails([]);
  };

  console.log(getPackages);
  return (
    <>
      <div className="flex justify-center place-items-center h-[90vh]">
        <div className="w-[650px]">
          <h2 className="text-[50px] text-center mb-3 font-semibold">
            Edit Package
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
            onClick={updatePackageHandler}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPackageComponent;
