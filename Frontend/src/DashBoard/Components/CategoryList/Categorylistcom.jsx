import React, { useEffect, useState } from 'react'
import Header from '../AllProductsComponent/Layout/Header'
import ListofProducts from '../AllProductsComponent/Layout/ListofProducts'
import Modal from '../../Layout/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCategoryActiveFunc, getallCategory } from '../../../Redux/Action/CategoryAction';
import Loading from '../../../Layout/Loading/Loading';


const name4 = "Category Name";
const name1 = "ID";

const Categorylistcom = () => {

    const [moadl , setModal] = useState(false)
    const [Cid , setCid] = useState(null)

    const allcategory = useSelector((state)=> state.category.allcategory)
    
    const dispatch = useDispatch()


    useEffect(()=>{
       dispatch(getallCategory())
    },[])
   const updatethecategoryactive = (id)=>{
    // dispatch(UpdateCategoryActiveFunc)
    console.log(id);
   }



  return (
    <div className='AllProductscomp_admin'>
    <Header title={"Add Category"} category={true}  setModal={setModal} functioncall={()=> dispatch(getallCategory())} />
    {/* ================== list all product  */}
    {/* {
      isLoading ?  <Loading/> :    <ListofProducts name1={name1} clo2={true} name4={name4} category={true} allProduct={allcategory} />

    } */}
    <ListofProducts name1={name1} clo2={true} name4={name4} category={true} allProduct={allcategory} setCid={setCid} updateactive={updatethecategoryactive}/>
   {
    moadl && <Modal setModal={setModal}/>
   }
 </div>
  )
}

export default Categorylistcom