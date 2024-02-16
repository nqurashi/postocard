import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Styles/PaymentCompo.css";
import { RxCross1 } from "react-icons/rx";

const PayPalButton = ({
  setpaypalbtn,
  setShowScess,
  CreateOrderFunctiontobackend,
  amount
}) => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null); // State to store order ID
  const [userName, setUserName] = useState(""); // State to store user nam
  const cart = useSelector((state) => state.cart.cart);
  return (
    <div className="fixed z-10 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white relative">
        <div className="w-full ">
          <div className="m-8 my-20 max-w-[400px] mx-auto">
            <RxCross1
              className="text-2xl cursor-pointer absolute top-[20px] right-[20px]"
              onClick={() => {
                setpaypalbtn(false);
              }}
            />
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AVY_DIbUPBcxlGU_kMvydBWtyqquKKpDu5Fp2qBLg0otcNAV5G2n_NuYL9N4xSx8Bd6DSPzGAZJ74huh",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value:  amount, // Set the payment amount here
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  return actions.order.capture().then(function (details) {
                    // const { id } = details.purchase_units[0].payments.captures[0];
                    const { given_name } = details.payer.name;
                    setOrderId(details.id);
                    setpaypalbtn(false);
                    setShowScess(true);
                    CreateOrderFunctiontobackend(details.id, given_name);
                    navigate("/conformOrder");
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalButton;
