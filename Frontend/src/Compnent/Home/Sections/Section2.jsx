import React from "react";
import "../Styles/Section2.css";
import ViewMainProduct from "../../Product/ViewMainProduct";
import { useSelector } from "react-redux"
import Loading from "../../../Layout/Loading/Loading";



const Section2 = () => {
  const allProduct = useSelector((state)=> state.product.allProduct);
  const isLoading = useSelector((state)=> state.product.isLoading);
  const sliceProduct = allProduct && allProduct.slice(0,4)

  return (
    <div className="Section2">
      <h2>WE THINK YOU'LL LOVE THESE</h2>
      {/* -------------- */}
      {
        isLoading ? <Loading/> : <div className="product_card">
        <ViewMainProduct data={sliceProduct} />
      </div>
      }
    </div>
  );
};

export default Section2;
