import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProductDiscount } from "../../../Redux/Action/ProductAction";
import { toast } from "react-toastify";
import Loading from "../../../Layout/Loading/Loading";
import "./DiscountItems.css";

const DiscountItems = () => {
  const allProduct = useSelector((state) => state.product.allProduct);
  const isLoading = useSelector((state) => state.product.isLoading);
  const [search, setSeach] = useState("");
  const [discountValue, setDiscount] = useState(null);
  const [show, setShow] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState({});
  const [id, setId] = useState(null);
  useEffect(() => {
    if (search === "") {
      setFilterData(allProduct);
    } else {
      setShow(true);
      const filter = allProduct?.filter((item) =>
        item.ProductName?.toLowerCase().includes(search.toLowerCase())
      );
      setFilterData(filter);
    }
  }, [search]);

  const selecttheItem = (name, image, id, price) => {
    setValue({
      name: name,
      image: image,
      price: price,
    });
    setShow(false);
    setSeach("");
    setId(id);
  };
  const dispatch = useDispatch();
  const addDiscount = async () => {
    if (!discountValue) {
      return toast.error("Plaese Enter Discount Percentage");
    }
    if (discountValue > value?.price) {
      return toast.error(
        "Plaese Enter Discount Percentage must be less than Product Price"
      );
    }
    await dispatch(UpdateProductDiscount(id, discountValue));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" w-full py-3 px-3">
          <h2 className="text-[30px] py-3 px-3 font-semibold">
            Add Discounts On Product.
          </h2>
          {/* ---------  */}
          <div className="max-w-[600px] mx-auto my-5">
            <div className="my-2 relative">
              <label
                htmlFor=""
                className="block mb-1 text-[16px] font-semibold"
              >
                Product Name
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSeach(e.target.value)}
                placeholder="Enter Product Name"
                className="border-[1px] border-[#80808071] px-2 py-2  text-[17px] w-full rounded-sm outline-none"
              />
              {/* -------  */}
              {show && search && (
                <div className="absolute top-[70px] w-full bg-[white] border-[1px] border-[#8080803a] z-10 shadow-lg py-2  h-[300px]  overflow-auto">
                  {filterData?.length > 0 ? (
                    filterData?.map((item, index) => {
                      return (
                        <div
                          className="flex cursor-pointer hover:bg-[#80808077] justify-start place-items-center gap-3 mb-1 border-b-[1px] border-b-[#8080803a] py-2 px-1  shadow-md"
                          onClick={() =>
                            selecttheItem(
                              item?.ProductName,
                              item?.File1,
                              item?.id,
                              item?.Price
                            )
                          }
                        >
                          <img
                            // src="https://www.lifestylesports.com/on/demandware.static/-/Sites-LSS_eCommerce_Master/default/dwcbca58ee/images/64529513xlalt3.jpg"
                            src={item?.File1}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-contain border-[1px] border-[gray]"
                          />
                          <h2 className="text-[20px]">{item?.ProductName}</h2>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-[20px] px-3 py-3 font-body w-full bg-[#80808067]">
                      No Product Found
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="my-2">
              <label
                htmlFor=""
                className="block mb-1 text-[16px] font-semibold"
              >
                Discount Price
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter Discount Price like 100 , 200 ,300"
                className="border-[1px] border-[#80808071] px-2 py-2 text-[17px] w-full rounded-sm outline-none"
              />
            </div>
            <div>
              {Object.keys(value).length > 0 && (
                <div className="flex cursor-pointer justify-start place-items-center gap-3 mb-1 border-[1px] border-[#808080f1] py-2 px-1  shadow-md">
                  <img
                    //   src="https://www.lifestylesports.com/on/demandware.static/-/Sites-LSS_eCommerce_Master/default/dwcbca58ee/images/64529513xlalt3.jpg"
                    src={value?.image}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-contain border-[1px] border-[gray]"
                  />
                  <h2 className="text-[20px]">{value?.name}</h2>
                  <p className="text-[20px]">${value?.price}</p>
                </div>
              )}
            </div>
            <button
              className="my-2 w-full py-2 px-2 text-[18px] font-semibold bg-[#6E6EEF] text-[white] rounded-sm"
              onClick={addDiscount}
            >
              Add Discount
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountItems;
