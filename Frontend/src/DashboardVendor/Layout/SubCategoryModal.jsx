import React, { useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import "../Style/SubCategoryModal.css"
import { CreateSubCategoryFunc, getallCategory } from '../../Redux/Action/CategoryAction';


const SubCategoryModal = ({setModal}) => {
     // ------- allcategory
     const allcategory = useSelector((state)=> state.category.allcategory)


    const [subCategory , setSubCategory] = useState("")
    const [parentCategory , setParentcategory] = useState("")
    const [CopyCategory , setCopyCategory] = useState(allcategory)
    const [categoryID , setCategoryID] =useState(null);
    const [showCategory , setShowCategory] = useState(true)
    

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getallCategory())
     },[]);
     
     useEffect(() => {
         const filteredCategories = allcategory && allcategory.filter(item =>
            item.CategoryName.toLowerCase().includes(parentCategory.toLowerCase())
            );
            setCopyCategory(filteredCategories);
        }, [parentCategory, allcategory]);
        
        // -------------- copycategoryoff
        const copycategoryoff = (id,name)=>{
              setCategoryID(id)
              setParentcategory(name)
              setShowCategory(false)
        }
        
        
        // -----createsubcategory
    const createsubcategory =()=>{
      dispatch(CreateSubCategoryFunc(categoryID,subCategory))
    }

  return (
    <div>
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
          <div className="w-full ">
            <RxCross1
              className="text-3xl my-3 mx-4 cursor-pointer p-1"
              onClick={() => setModal(false)}
            />
            <div className="inputs px-5 py-5 ">
              <div className="create_product_input position-relative">
                <div>
                <label htmlFor="productname">Subcategory Name</label>
                <input
                  type="text"
                  name="SubCategoryName"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                />
                </div>
                {/* -------- parent category input  */}
                <div>
                <input
                  type="text"
                  name="CategoryId"
                  placeholder='Select Category'
                  className='my-2'
                  value={parentCategory}
                  onChange={(e)=> setParentcategory(e.target.value)}
                />
                </div>
                {/* ======= filter the category  */}
                {
                    parentCategory && showCategory && <div className=' overflow-auto bg-white z-10 filter_category'>
                    {
                      CopyCategory && CopyCategory.map((item,index)=>{
                          return (
                              <p onClick={()=> copycategoryoff(item.id, item.CategoryName)} key={index}>{item.CategoryName}</p>
                          )
                      })
                    }
                  </div>
                }
                
            <button className="bg-[#4B4BCC] w-full mt-2 text-white p-3" onClick={createsubcategory}>Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubCategoryModal