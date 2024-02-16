import React, { useMemo } from "react";
import Lottie from "lottie-react";
import SVGGET from "./posto_animation.json";

const Loading = () => {
  const Memozation = useMemo(() => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor : "white",
          // height: "80svh",
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
};

export default Loading;