import React, { useEffect, useState } from "react";
import { IoIosPricetag } from "react-icons/io";
import { TbProgressHelp } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ViewProduct = () => {
  const [selectRow, setSelectRow] = useState({});
  const allProduct = useSelector((state) => state.product.allproductforAdmin);
  const params = useParams();

  console.log(allProduct);

useEffect(()=> {
    const selectedRow = allProduct?.filter((item) => item.id === parseInt(params.id));
    setSelectRow(selectedRow || {});
}, [allProduct, params.id])
console.log(allProduct);
console.log(selectRow);


  return (
    <div>
      <section class="relative pt-16 bg-blueGray-50">
        <div class="container mx-auto">
        <h2 className="text-center mb-4 font-bold text-3xl">
            View Product
          </h2>
          <div class="flex flex-wrap items-center">
            {/* <div class="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-500">
                <img
                  alt="..."
                  src={selectRow[0]?.File1}
                  class="w-full align-middle rounded-t-lg"
                />
              
              </div>
            </div> */}
  <div class="w-full md:w-6/12 px-4">
              <div class="flex flex-wrap">
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col mt-4">
                    <div class="px-4 py-5 flex-auto">
                    <img
                  alt="..."
                  src={selectRow[0]?.File1}
                  class="w-full align-middle rounded-t-lg"
                />
                    </div>
                  </div>
                  <div class="relative flex flex-col min-w-0">
                    <div class="px-4 py-5 flex-auto">
                    <img
                  alt="..."
                  src={selectRow[0]?.File2}
                  class="w-full align-middle rounded-t-lg"
                />
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col min-w-0 mt-4">
                    <div class="px-4 py-5 flex-auto">
                    <img
                  alt="..."
                  src={selectRow[0]?.File3}
                  class="w-full align-middle rounded-t-lg"
                />
                    </div>
                  </div>
                  <div class="relative flex flex-col mt-4">
                    <div class="px-4 py-5 flex-auto">
                    <img
                  alt="..."
                  src={selectRow[0]?.File4}
                  class="w-full align-middle rounded-t-lg"
                />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 px-4">
              <div class="flex flex-wrap">
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <MdDriveFileRenameOutline />
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Product Name</h6>
                      <p class="mb-4 text-blueGray-500">{selectRow[0]?.ProductName}</p>
                    </div>
                  </div>
                  <div class="relative flex flex-col min-w-0">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <BiSolidCategory />
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Sub-Category</h6>
                      <p class="mb-4 text-blueGray-500">{selectRow[0]?.SubCateogry}</p>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col min-w-0 mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <TbProgressHelp />
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Product Status</h6>
                      <p class="mb-4 text-blueGray-500">{selectRow[0]?.SubCateogry}</p>
                    </div>
                  </div>
                  <div class="relative flex flex-col mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <IoIosPricetag />
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Product Price</h6>
                      <p class="mb-4 text-blueGray-500">${selectRow[0]?.Price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewProduct;
