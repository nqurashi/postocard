import React from "react";
import ViewMainProduct from "../../Product/ViewMainProduct";
import "../Styles/Section3.css";
import { useSelector } from "react-redux";
import Loading from "../../../Layout/Loading/Loading";

;

const Section3 = () => {
  const allProduct = useSelector((state)=> state.product.allProduct);
  const sliceproduct = allProduct && allProduct.slice(0,4)
  const isLoading = useSelector((state)=> state.product.isLoading);


  return (
    <div className="section3">
      <h2>Occasions </h2>
      {/* ------------ */}
      <div className="section3_product">
       {
        isLoading ? <Loading/> : <div>
        <ViewMainProduct data={sliceproduct} />
      </div>
       }
      </div>
      {/* --- */}
      {/* <div className="w-full flex justify-center place-items-center">
        <button>More Occasions</button>
      </div> */}
    </div>
  );
};

export default Section3;
