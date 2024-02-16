import React, { useState, useEffect } from 'react'
import Header from './Layout/Header';
import "./Styles/AllProductscomp.css"
import ListofProducts from './Layout/ListofProducts';
import { useDispatch, useSelector } from 'react-redux';
import {  getallproductforAdmin } from '../../../Redux/Action/ProductAction';


const name1 = "Product Name";
const name2 = "Product Price";
const artistName = "Artist";
const name3 = "Product Status";
const name5 = "Sub-Category";
const name4 = "Action";


const AllProductscomp = () => {
  const allProduct = useSelector((state)=> state.product.allproductforAdmin)

  const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(getallproductforAdmin())
  },[])

  return (
    <div className='AllProductscomp_admin'>
       <Header title={"Add Item"} link={"/admin/create/product"} functioncall={()=> dispatch(getallproductforAdmin())} />
       {/* ================== list all product  */}
       <ListofProducts name1={name1} name2={name2} name3={name3} name5={name5} name4={name4} artistName={artistName} allProduct={allProduct}/>
    </div>
  )
}

export default AllProductscomp