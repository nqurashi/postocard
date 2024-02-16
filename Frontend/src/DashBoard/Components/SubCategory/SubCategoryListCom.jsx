import React, { useEffect, useState } from 'react'
import Header from '../AllProductsComponent/Layout/Header';
import ListofProducts from '../AllProductsComponent/Layout/ListofProducts';
import SubCategoryModal from '../../Layout/SubCategoryModal';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateSubCategoryActiveFunc, getallSubCategory } from '../../../Redux/Action/CategoryAction';


const name1= "ID";
const name4 = "Subcategory Name";
const name5 = "Parent Category"


const SubCategoryListCom = () => {
   
    const [moadl , setSubMoadl] = useState(false);
    const subCategoryData = useSelector((state) => state.category.allsubcategory);
    const [cid ,setCid] = useState(null)

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getallSubCategory());
    }, []);

    const updatesubcategoryactive = (id)=>{
      // dispatch(UpdateSubCategoryActiveFunc)
      console.log(id);
    }



  return (
    <div className='AllProductscomp_admin'>
    <Header title={"Add Subcategory"} category={true}  setModal={setSubMoadl}  functioncall={() => dispatch(getallSubCategory())} />
    {/* ================== list all product  */}
   <ListofProducts  name1={name1}  name4={name4} name5={name5} category={true} allProduct={subCategoryData} setCid={setCid} updateactive={updatesubcategoryactive} />
  {
    moadl && <SubCategoryModal setModal={setSubMoadl}/>
  }
  
 </div>
  )
}

export default SubCategoryListCom