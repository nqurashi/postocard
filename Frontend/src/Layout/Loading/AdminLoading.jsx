import React, { useMemo } from "react";
import Lottie from "lottie-react";
import SVGGET from "./posto_animation.json";

const AdminLoading = () => {
  const Memozation = useMemo(() => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor : "white",
          height: "100vh",
          position : "absolute",
          top : 0,
          left : 0,
          width : "100%",
          backgroundColor : "white",
          zIndex : 80
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

export default AdminLoading