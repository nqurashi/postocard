import React, { useEffect, useState } from "react";
import "../Component/Sidebar.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import ViewMainProduct from "../../ViewMainProduct.jsx";
import "../Styles/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { getallproduct } from "../../../../Redux/Action/ProductAction.js";
import { useParams } from "react-router-dom";
import { AiOutlineFilter } from "react-icons/ai";
import Loading from "../../../../Layout/Loading/Loading.jsx";
import SVGGET from "../../../../Layout/Loading/notfound.json";
import AnimateLoading from "../../../../Layout/Loading/AnimateLoading.jsx";
import { getallSubCategory } from "../../../../Redux/Action/CategoryAction.js";

const Section2 = () => {
  const [filtershow, setFilterShow] = useState(false);
  const allProduct = useSelector((state) => state.product.allProduct);
  const [copyData, setCopyData] = useState(null);
  const isLoading = useSelector((state) => state.product.isLoading);
  const { category } = useParams();
  const categorydata = allProduct?.filter(
    (item) =>
      item?.sub_category_details?.category_details?.CategoryName == category
  );
  useEffect(() => {
    setCopyData(categorydata);
  }, [category]);
  useEffect(() => {
    dispatch(getallSubCategory());
  }, []);
  const subCategoryData = useSelector((state) => state.category.allsubcategory);
  // const filter the sub category
  const filterSubCategory = subCategoryData?.filter(
    (item) => item?.category_details?.CategoryName === category
  );
  const SliceFilterSubCategory = filterSubCategory?.slice(0, 3);

  // ========== slice the data
  const [count, setCount] = useState(1);
  const slicedata = copyData?.slice(0, count * 12);

  //   ---- search by seacr input
  const [search, setSerach] = useState("");
  const [price, setprice] = useState(0);

  const filterdata = () => {
    if (price > 0) {
      // Apply price filter
      const priceFilteredData = copyData?.filter((item) => item.Price <= price);
      setCopyData(priceFilteredData);
    } else {
      const FilterDatabyName =
        allProduct &&
        allProduct.filter((item) =>
          item.ProductName.toLocaleLowerCase().includes(
            search.toLocaleLowerCase()
          )
        );
      setCopyData(FilterDatabyName);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallproduct());
  }, []);
  useEffect(() => {
    setCopyData(categorydata);
  }, [allProduct]);

  useEffect(() => {
    if (search === "") {
      setCopyData(categorydata);
    } else {
      setCopyData(allProduct);
    }
  }, [search]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button className="filter_btn" onClick={() => setFilterShow(true)}>
            <p>Filters</p> <AiOutlineFilter className="mx-2" />
          </button>
          <div className="Product_Section2">
            <div className="product_section2_sidebar">
              <Sidebar
                search={search}
                setSerach={setSerach}
                filterdata={filterdata}
                setshowfilter={setFilterShow}
                showfilter={filtershow}
                setprice={setprice}
                price={price}
              />
            </div>
            {/* -------- */}
            {slicedata?.length > 0 ? (
              <div className="pro flex justify-center flex-col place-items-center">
                {/* {
                  SliceFilterSubCategory && SliceFilterSubCategory.map((item,index)=>{
                    return (
                      <div className="" key={index}>
                            <p className="text-2xl">{item?.SubCategoryName}</p>
                        </div>
                    )
                  })
                } */}
                <ViewMainProduct data={slicedata} />
                <button onClick={() => setCount(count + 1)}>Load more</button>
              </div>
            ) : (
              <div className="flex flex-col justify-center place-items-center gap-[10px]">
                <AnimateLoading SVGGET={SVGGET} />
                <p className="text-[#14BDA5] rounded-[7px] py-2 px-3  m-2 text-[25px] font-bold">
                  <span className="text-[28px]">OOPS!</span> No Product Found
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Section2;
