import React, { useEffect, useState } from "react";
import "../Styles/BottomHeader.css";
import TopBottomHeader from "./TopBottomHeader";
import BottomBottomHeader from "./BottomBottomHeader"

const BottomHeader = () => {

  const [showHeader, setShowHeader] = useState(false)
  return (
    <>
      <div className="bottom_header">
        {/* ------ */}
        <TopBottomHeader setshowheader={setShowHeader} />
        <BottomBottomHeader showheader={showHeader} setshowheader={setShowHeader}/>
      </div>
    </>
  );
};

export default BottomHeader;
