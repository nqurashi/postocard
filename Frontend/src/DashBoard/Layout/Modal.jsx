import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { CreateProductFunc } from "../../Redux/Action/CategoryAction";
import { useNavigate } from "react-router-dom";
import Loading from "../../Layout/Loading/Loading";

const Modal = ({ setModal }) => {
  const [category, setCategory] = useState("");
  const [parentCategory , setParentCategory] = useState(0)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createcategory = () => {
    dispatch(CreateProductFunc(category,parentCategory, navigate));
  };

  const isLoading = useSelector((state)=> state.category.isLoading)

  return (
    <div>
      <div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
          <div class="w-full ">
            <RxCross1
              className="text-3xl my-3 mx-4 cursor-pointer p-1"
              onClick={() => setModal(false)}
            />
           {
            isLoading ? <Loading/> : <div className="inputs px-5 py-5">
            <div className="create_product_input">
              <label htmlFor="productname">Category Name</label>
              <input
                type="text"
                name="CategoryName"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="productname">Select parent category</label>
              <select className="my-1 outline-none bg-[whitesmoke]" onChange={(e)=> setParentCategory(e.target.value)}>
                <option value="">Select parent category</option>
                <option value={1}>Occasions</option>
                <option value={2}>Holiday</option>
              </select>
              <button
                className="bg-[#4B4BCC] w-full mt-2 text-white p-3"
                onClick={createcategory}
              >
                Create
              </button>
            </div>
          </div>
           }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
