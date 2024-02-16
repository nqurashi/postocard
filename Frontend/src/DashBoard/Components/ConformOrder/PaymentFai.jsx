import React from 'react';
import SVGGET from "../../../Layout/Loading/paymentfail.json"
import Lottie from 'lottie-react';

const PaymentFai = () => {
  return (
    <div className='paymentfail'>
    <p className='text-[16px] my-2 flex'>
        <h1 className='text-19 font-bold'>Payment confirmation failed</h1>
        . Please wait for 24 hours for manual verification.</p>
    <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor : "white",
              height: "40svh",
            }}
          >
            <Lottie
              animationData={SVGGET}
              loop={true}
              style={{ width: "300px", height: "300px" }}
              className="svges"
            />
          </div>
    </div>
  )
}

export default PaymentFai