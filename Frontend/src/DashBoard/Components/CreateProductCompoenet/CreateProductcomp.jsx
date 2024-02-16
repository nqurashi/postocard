import React, { useEffect, useState } from "react";
import "./Style/CreateProductcomp.css";
import { useDispatch, useSelector } from "react-redux";
import { CreateProductFunc } from "../../../Redux/Action/ProductAction";
import { getallSubCategory } from "../../../Redux/Action/CategoryAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { server } from "../../../Setting/GlobalVariable";
import Artists from "../../Pages/Artists";
import { parse } from "date-fns";

const CreateProductcomp = () => {
  // ---- call to get all sub categoty
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallSubCategory());
    getArtist();
  }, []);

  const subCategoryData = useSelector((state) => state.category.allsubcategory);
  const isLoading = useSelector((state) => state.product.isLoading);
  // console.log(subCategoryData)

  const [checkbox, setCheckbox] = useState(true);
  const [ProductName, setProductName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategorysearch, setSubCategorysearch] = useState("");
  const [showsubcategory, setshowsubcategory] = useState(true);
  const [Artist, setArtist] = useState("");
  const [Price, setPrice] = useState(0);
  const [File1, setFile1] = useState(null);
  const [File2, setFile2] = useState(null);
  // const [File3, setFile3] = useState(null);
  // const [File4, setFile4] = useState(null);
  const [CopyCategory, setCopyCategory] = useState(subCategoryData);
  const [getArtists, setGetArtists] = useState("");

  useEffect(() => {
    const filteredCategories =
      subCategoryData &&
      subCategoryData.filter((item) =>
        item.SubCategoryName.toLowerCase().includes(
          subCategorysearch.toLowerCase()
        )
      );
    setCopyCategory(filteredCategories);
  }, [subCategoryData, subCategorysearch]);

  // --------- file2change

  const data = {
    ProductName: ProductName,
    artist_id: parseInt(Artist),
    Price: Price,
    File1: File1,
    File2: File2,
    // File3: File3,
    // File4: File4,
    SubCategory: subCategory,
  };
  console.log(data);
  // ----------- usedisatch

  // -----------createproduct
  const createproduct = () => {
    dispatch(CreateProductFunc(data, Navigate));
  };

  // const addcategory = (id,name)=>{
  //   setSubCategory(id)
  //   setshowsubcategory(false)
  //   setSubCategorysearch(name)
  // }

  // const subcategorychangevalue = (e)=>{
  //   setSubCategorysearch(e.target.value)
  //   console.log(subCategorysearch)
  //   setshowsubcategory(true)
  // }

  const saveArtistId = (id) => {
    setArtist(id);
  };

  const getArtist = async () => {
    try {
      const res = await axios.get(`${server}/artists`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      console.log(res.data);
      setGetArtists(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(getArtists);

  const handleSubCategoryChange = (e) => {
    const selectedOption = e.target.value;

    // Find the selected subcategory
    const selectedSubCategory = subCategoryData.find(
      (item) => item.SubCategoryName === selectedOption
    );

    // Update state with the selected subcategory's id
    if (selectedSubCategory) {
      setSubCategory(selectedSubCategory.id);
    } else {
      // Handle the case where no matching subcategory is found
      setSubCategory("");
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div className="create_product_admin_comp">
          <h2 className="text-center mb-4 font-bold text-3xl">
            Create Product
          </h2>
          <div className="create_product_box">
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
            {/* ----------- is active  */}
            <div className="create_product_input_check">
              <input
                type="checkbox"
                checked
                disabled
                value={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
              />
              <label htmlFor="f4">Is Active</label>
            </div>
            <div className="create_product_input">
              <label htmlFor="productname">Select Artist</label>
              <select
                className="my-1 outline-none bg-[whitesmoke]"
                onChange={(e) => saveArtistId(e.target.value)}
              >
                <option value="">Select Artist</option>
                {getArtists &&
                  getArtists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* ------------- Artist Name */}
            {/* <div className="create_product_input">
              <label htmlFor="Artist Name">Artist Name</label>
              <input
                type="text"
                name="Artistname"
                value={Artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </div> */}
            {/* <div className="create_product_input">
              <label htmlFor="Artist Name">Sub Category</label>
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
                            onClick={
                             ()=> addcategory(item.id,item.SubCategoryName)
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
            </div> */}
            {/* ------------ price */}

            <div className="create_product_input form-group my-2">
              <label htmlFor="Artist Name">Sub Category</label>
              <select
                className="form-control"
                value={
                  subCategoryData.find((item) => item.id === subCategory)
                    ?.SubCategoryName || ""
                }
                onChange={handleSubCategoryChange}
              >
                <option value="">Please Select SubCategory</option>
                {subCategoryData &&
                  subCategoryData.map((item, index) => (
                    <option key={index} value={item.SubCategoryName}>
                      {item.SubCategoryName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="create_product_input">
              <label htmlFor="Price">Product Price</label>
              <input
                type="number"
                name="price"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* ------------ file 1 */}
            <div className="create_product_input">
              <label htmlFor="f1">File 1</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="File1"
                onChange={(e) => setFile1(e.target.files[0])}
              />
            </div>
            {/* ------------ file 2 */}
            <div className="create_product_input">
              <label htmlFor="f2">File 2</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="File2"
                onChange={(e) => setFile2(e.target.files[0])}
              />
            </div>
            {/* ------------ file 3 */}
            {/* <div className="create_product_input">
              <label htmlFor="f3">File 3</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="File3"
                onChange={(e) => setFile3(e.target.files[0])}
              />
            </div> */}
            {/* ------------ file 4 */}
            {/* <div className="create_product_input">
              <label htmlFor="f4">File 4</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="File4"
                onChange={(e) => setFile4(e.target.files[0])}
              />
            </div> */}

            {/* ------button */}
          </div>
          <button onClick={createproduct} className="btn_create_p">
            Create Product
          </button>
        </div>
      )}
    </>
  );
};

export default CreateProductcomp;
