import React, { useEffect } from "react";
import ProductIndex from "../Compnent/Product/ProductPage/ProductIndex";
import { useDispatch } from "react-redux";
import { getallproduct } from "../Redux/Action/ProductAction";

const Product = () => {
  // ------------ redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallproduct())
  }, []);
  return (
    <div>
      <ProductIndex />
    </div>
  );
};

export default Product;
