import React, { useMemo } from 'react';
import SVGGET from "../../../Layout/Loading/success-lottie.json"
import Lottie from 'lottie-react';

const OrderSuccess = () => {
    const Memozation = useMemo(() => {
        return (
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
        );
      }, [SVGGET]);
    
      return Memozation;
}

export default OrderSuccess