import React, { useEffect, useState } from "react";
import "../Styles/admin_ListofProducts.css";
import { FilterCategory } from "../StaticData/CategoryFilter";
import { PriceFilter } from "../StaticData/PriceFilter";
import { GoFilter } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateproductFunc,
  getallSubCategory,
} from "../../../../Redux/Action/CategoryAction";
import { RxCross1 } from "react-icons/rx";
import { getallproductforAdmin } from "../../../../Redux/Action/ProductAction";
import Loading from "../../../../Layout/Loading/Loading";
import { AiOutlineDelete } from "react-icons/ai";
import { LuMoreVertical } from "react-icons/lu";
import { Link } from "react-router-dom";

const ListofProducts = ({
  name1,
  name2,
  name3,
  name4,
  name5,
  artistName,
  category = false,
  allProduct,
  clo2 = false,
  setCid,
  updateactive,
}) => {
  const [singleproduct, setSingleProduct] = useState([]);
  console.log(allProduct);

  const [edit, setedit] = useState(false);
  const [checkbox, setCheckbox] = useState(
    singleproduct && singleproduct.length > 0 ? singleproduct[0]?.IsActive : 0
  );
  const [ProductName, setProductName] = useState(
    singleproduct && singleproduct.length > 0
      ? singleproduct[0]?.ProductName
      : ""
  );
  const [Price, setPrice] = useState(
    singleproduct && singleproduct.length > 0 ? singleproduct[0]?.Price : 0
  );
  const [subCategory, setSubCategory] = useState("");
  const [showsubcategory, setshowsubcategory] = useState(true);
  const [subCategorysearch, setSubCategorysearch] = useState("");
  const subCategoryData = useSelector((state) => state.category.allsubcategory);
  const [CopyCategory, setCopyCategory] = useState(subCategoryData);
  const [id, setid] = useState(null);
  useEffect(() => {
    setProductName(
      singleproduct && singleproduct.length > 0
        ? singleproduct[0]?.ProductName
        : ""
    );
    setPrice(
      singleproduct && singleproduct.length > 0 ? singleproduct[0]?.Price : 0
    );
    setCheckbox(
      singleproduct && singleproduct.length > 0 ? singleproduct[0]?.IsActive : 0
    );
    setSubCategorysearch(
      singleproduct && singleproduct.length > 0
        ? singleproduct[0]?.sub_category_details?.SubCategoryName?.slice(
            0,
            singleproduct[0]?.sub_category_details?.SubCategoryName?.length - 3
          )
        : ""
    );
  }, [singleproduct]);

  // ---- call to get all sub categoty
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallSubCategory());
  }, []);
  useEffect(() => {
    const filteredCategories =
      subCategoryData &&
      subCategoryData.filter((item) =>
        item.SubCategoryName?.toLowerCase().includes(
          subCategorysearch?.toLowerCase()
        )
      );
    setCopyCategory(filteredCategories);
  }, [subCategoryData, subCategorysearch]);
  const editproduct = (iditem) => {
    setid(iditem);
    const filterproductbyid = allProduct?.filter((item) => item.id === iditem);
    setSingleProduct(filterproductbyid);
    setedit(true);
  };

  const addcategory = (id, name) => {
    setSubCategory(id);
    setshowsubcategory(false);
    setSubCategorysearch(name);
  };

  const subcategorychangevalue = (e) => {
    setSubCategorysearch(e.target.value);
    setshowsubcategory(true);
  };

  const updateproduct = async () => {
    const Cdata = {
      ProductName: ProductName,
      SubCategory: subCategory,
      Price: Price,
      ProductId: id,
      IsActive: checkbox,
    };
    await dispatch(UpdateproductFunc(Cdata));
    dispatch(getallproductforAdmin());
  };

  const isLoading = useSelector((state) => state.category.isLoading);
  const isLoadingp = useSelector((state) => state.product.isLoading);
  const [productStatus, setProductStatus] = useState(new Array([]).fill(false));
  const showproductmodal = (index) => {
    const newproductStatus = [...productStatus];
    newproductStatus[index] = !productStatus[index];
    setProductStatus(newproductStatus);
  };
  return (
    <>
      {isLoading || isLoadingp ? (
        <Loading />
      ) : (
        <div className="admin_ListofProducts">
          {edit && (
            <div className="all_product_header flex justify-end place-items-center py-3 px-5 gap-3">
              <div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
                <div class="max-h-full w-full p-[20px] max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                  <div className="w-full text-right">
                    <RxCross1
                      className="text-3xl my-3 mx-4 cursor-pointer p-1 "
                      onClick={() => {
                        setedit(false);
                        setSubCategorysearch("");
                      }}
                    />
                  </div>
                  <div className="eidt_product">
                    {/* ------- product name  */}
                    <div className="create_product_input">
                      <label htmlFor="productname">Product Name</label>
                      <input
                        type="text"
                        name="productname"
                        value={ProductName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                    {/* ------------ price */}
                    <div className="create_product_input">
                      <label htmlFor="Price">Product Price</label>
                      <input
                        type="number"
                        name="price"
                        value={Price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    {/* =====  */}
                    <div className="create_product_input">
                      <label htmlFor="Artist Name">
                        Sub Category{" "}
                        <span className="text-[red]">
                          (Plaese Select The SubCategory)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="search"
                        value={subCategorysearch}
                        onChange={subcategorychangevalue}
                        autoComplete="off"
                      />
                      <div className="show_subcategory">
                        {subCategorysearch && showsubcategory && (
                          <div className=" overflow-auto bg-white z-10 filter_category">
                            {CopyCategory &&
                              CopyCategory.map((item, index) => {
                                return (
                                  <p
                                    onClick={() =>
                                      addcategory(item.id, item.SubCategoryName)
                                    }
                                    key={index}
                                  >
                                    {item.SubCategoryName}
                                  </p>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ===== check  */}
                    {/* =======  */}
                    <div className="flex gap-[30px] justify-start place-items-center">
                      <div className="create_product_input_check flex justify-end place-items-end">
                        <input
                          type="checkbox"
                          checked={checkbox === 1 ? true : false}
                          value={checkbox}
                          onChange={() => setCheckbox(checkbox === 1 ? 0 : 1)}
                        />
                        <label htmlFor="f4 !m-0 !p-0">Is Active</label>
                      </div>
                    </div>
                    <div className="w-full flex justify-center place-items-center">
                      <button onClick={updateproduct} className="btn_create_p">
                        Update Product
                      </button>
                    </div>

                    {/* ===== */}
                  </div>
                </div>
              </div>
            </div>
          )}
          <FilterHeader />
          {/* ============== list of product  */}
          <div className="list_product_admin">
            <div
              className={`product_list_header grid ${
                category === true && clo2 === true
                  ? "grid-cols-2"
                  : "grid-cols-3"
              } ${
                category === false
                  ? "grid-cols-6"
                  : category === true && clo2
                  ? "grid-cols-4"
                  : "grid-cols-6"
              } font-bold py-3 border-b-2 border-b-[gray]`}
            >
              {name1 && <h2>{name1}</h2>}
              {name2 && <p>{name2}</p>}
              {artistName && <p>{artistName}</p>}
              {name3 && <p>{name3}</p>}
              {name5 && <p>{name5}</p>}
              {name4 && <p>{name4}</p>}
              {category === true && <h2>Active</h2>}
              {category === true && <h2>Action</h2>}
            </div>
            {/* ---------- product  */}
            {category ? (
              <div className="list_main_box">
                {allProduct &&
                  allProduct?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`product_list_main grid ${
                          category === true && clo2
                            ? "grid-cols-4"
                            : "grid-cols-5"
                        }  py-3 border-b-2`}
                      >
                        <p>{item.id}</p>
                        <h2>
                          {(item.CategoryName && item.CategoryName) ||
                            (item.SubCategoryName && item.SubCategoryName)}
                        </h2>
                        {item.category_details && (
                          <h2>
                            {item.category_details &&
                              item.category_details.CategoryName}
                          </h2>
                        )}
                        <h2>
                          {item?.IsActive === 1 ? (
                            <p className="text-[green]">Active</p>
                          ) : (
                            <p className="text-[red]">InActive</p>
                          )}
                        </h2>
                        <h2
                          onClick={() => {
                            setCid(item.id);
                            updateactive(item.id);
                          }}
                        >
                          <AiOutlineDelete className="text-[23px] cursor-pointer text-[red]" />
                        </h2>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="list_main_box">
                {allProduct &&
                  allProduct?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="product_list_main grid grid-cols-6 py-3 border-b-2 justify-center items-center"
                      >
                        <Link to={`/admin/products/view/${item.id}`}>
                        <h2 className="flex justify-start place-items-center gap-1 ">
                          <img
                            src={item?.File1}
                            alt=""
                            className="w-[50px] h-[50px] border-[1px] border-[gray] rounded-full"
                          />
                          {item?.ProductName}
                        </h2>
                        </Link>
                        <p>{item?.Price}$</p>
                        <p>{item?.artist?.name}</p>
                        <p>
                          {item?.IsActive === 1 ? (
                            <p className="text-[green]">Active</p>
                          ) : (
                            <p className="text-[red]">InActive</p>
                          )}
                        </p>
                        <p>{item?.sub_category_details?.SubCategoryName}</p>
                        {/* <h2 >{item?.IsActive === 1 ? <p className="text-[green]">YES</p> : <p className="text-[red]">NO</p>}</h2> */}
                        <p className="flex justify-start place-items-center gap-3 relative">
                          <FaRegEdit
                            className="text-[green] cursor-pointer text-[20px]"
                            onClick={() => editproduct(item.id)}
                          />
                          <LuMoreVertical
                            className="text-[23px] cursor-pointer"
                            onClick={() => showproductmodal(index)}
                          />
                          {productStatus[index] && (
                            <div
                              className="absolute top-[30px] w-[100px] h-[35px] left-[-50px] py-1 px-1 rounded-sm bg-white z-10 border-[1px] border-[black]"
                              onClick={() => showproductmodal(index)}
                            >
                              <p className="cursor-pointer">Update Status</p>
                            </div>
                          )}
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ListofProducts;

// ========================= haeder
const FilterHeader = () => {
  return (
    <div className="filter_header flex justify-between place-items-center">
      {/* ------------- name  */}
      <div className="filter_inputs flex justify-between place-items-center gap-2">
        <input type="text" placeholder="Name" />
        {/* ------------- category  */}
        <select>
          <option value="">Filter By Category</option>
          {FilterCategory &&
            FilterCategory.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
        </select>
        {/* ======================= priceing filter  */}
        <select>
          <option value="">Filter By Price</option>
          {PriceFilter &&
            PriceFilter.map((item) => {
              return <option key={item.id}>{item.value}</option>;
            })}
        </select>
      </div>
      {/* ============== filter button  */}
      <div className="flex justify-center place-items-center text-[#6C6CEB] bg-[#2e2ec727] py-[7px] gap-1 rounded-[7px] px-4">
        <GoFilter />
        <button>Filters</button>
      </div>
    </div>
  );
};
