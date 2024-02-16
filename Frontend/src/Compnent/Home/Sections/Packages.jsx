import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../../Setting/GlobalVariable";
import Cookies from "js-cookie";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";
import PayPalButton from "../../payments/PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_REQUEST, ORDER_SUCCESS } from "../../../Redux/Variables/Order";
import {
  SubscriptionInPackages,
  createSubscription,
} from "../../../Redux/Action/OrderAction";

const Packages = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isSuccess = useSelector((state) => state.order.isSuccess);
  console.log(user);
  const verifyToken = Cookies.get("ApiLoginToken");
  const [getPackages, setGetPackages] = useState([]);
  const [showbtnpaypl, setshowbtnpaypl] = useState(false);
  const [ShowScess, setShowScess] = useState(false);
  const [GetId, setGetId] = useState(null);
  const [GetPrice, setGetPrice] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  // useEffect(() => {

  // }, [isSuccess]);
  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${server}/user/packages`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });

      setGetPackages(response.data.data);
      console.log(response.data, "user packages");
    } catch (error) {
      console.log(error.message);
    }
  };

  const buyPlanHandler = (id, price) => {
    setGetId(id);
    console.log(id, "card id");
    if (!verifyToken) {
      return toast.error("Please login to continue.");
    }
    const userPackage =user?.package && user?.package[0]?.package;
    if (userPackage && userPackage.id === id) {
      return toast.error("Selected package is already exist.");
    }
    setshowbtnpaypl(true);
    setGetPrice(price);
  };
  const paymentVerify = async (orderid) => {
    await dispatch(SubscriptionInPackages(orderid, GetId, GetPrice));
   
  };

  const CreateOrderFunctiontobackend = async (orderid, name) => {
    await paymentVerify(orderid);
  };

  return (
    <div>
      <div class="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getPackages &&
            getPackages.map((item, index) => (
              <div
                key={index}
                class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              >
                <div class="p-1  bg-[#F5A852]"></div>
                <div class="p-8">
                  <h2 class="text-3xl font-bold text-gray-800 mb-4">
                    {item.name}
                  </h2>
                  <p class="text-3xl font-bold text-gray-700 mb-6">
                    Price: {item.price}
                  </p>
                  <p class="text-3xl font-bold text-gray-700 mb-6">
                    Discount: {item.discount}
                  </p>
                  <ul class="text-sm text-gray-600 mb-6">
                    {item.package_detail.map((detail, ind) => (
                      <li class="mb-2 flex items-center">
                        <GoDotFill style={{ color: "#F5A852" }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div class="p-4">
                  <button
                    onClick={() =>
                      buyPlanHandler(item?.id, item?.price - item?.discount)
                    }
                    class="w-full bg-[#F5A852] text-white rounded-full px-4 py-2 hover:bg-black focus:outline-none focus:shadow-outline-black active:bg-black"
                  >
                    Buy Plan
                  </button>
                </div>
              </div>
            ))}

          {/* <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <div class="p-1  bg-[#F5A852]"></div>
            <div class="p-8">
              <h2 class="text-3xl font-bold text-gray-800 mb-4">Pro Plan</h2>
              <p class="text-gray-600 mb-6">Perfect for growing businesses</p>
              <p class="text-4xl font-bold text-gray-800 mb-6">$49.99</p>
              <ul class="text-sm text-gray-600 mb-6">
                <li class="mb-2 flex items-center">
                  <svg
                    class="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  25 Users
                </li>
                <li class="mb-2 flex items-center">
                  <svg
                    class="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Advanced Features
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  24/7 Support
                </li>
              </ul>
            </div>
            <div class="p-4">
              <button class="w-full bg-[#F5A852] text-white rounded-full px-4 py-2 hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                Select Plan
              </button>
            </div>
          </div>

          <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <div class="p-1  bg-[#F5A852]"></div>
            <div class="p-8">
              <h2 class="text-3xl font-bold text-gray-800 mb-4">
                Enterprise Plan
              </h2>
              <p class="text-gray-600 mb-6">For large-scale enterprises</p>
              <p class="text-4xl font-bold text-gray-800 mb-6">$99.99</p>
              <ul class="text-sm text-gray-600 mb-6">
                <li class="mb-2 flex items-center">
                  <svg
                    class="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Unlimited Users
                </li>
                <li class="mb-2 flex items-center">
                  <svg
                    class="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http

://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Premium Features
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  24/7 Priority Support
                </li>
              </ul>
            </div>
            <div class="p-4">
              <button class="w-full  bg-[#F5A852] text-white rounded-full px-4 py-2 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple active:bg-purple-800">
                Select Plan
              </button>
            </div>
          </div> */}
        </div>
      </div>
      {showbtnpaypl && (
        <PayPalButton
          setpaypalbtn={setshowbtnpaypl}
          setShowScess={setShowScess}
          CreateOrderFunctiontobackend={CreateOrderFunctiontobackend}
          amount={GetPrice}
        />
      )}
    </div>
  );
};

export default Packages;
