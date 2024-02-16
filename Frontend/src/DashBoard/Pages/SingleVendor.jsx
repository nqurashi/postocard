import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../Layout/Sidebar';
import Navebar from '../Layout/Navebar';
import { useSelector } from 'react-redux';
import "../Components/Styles/VendorDetail.css"

const SingleVendor = () => {
    const {id} = useParams()
    const allVendor = useSelector((state) => state.vendor.allVendor);
    const filterVendor = allVendor?.filter((item)=> item.id == id)
  return (
    <div className='dashboard_common'>
    {/* ==================== sidebard dashboard  */}
    <div className='dashboard_sidebar'>
     <Sidebar/>
    </div>
    {/* ======================= navebar and content  */}
    <div className='navebar_content_dashbaord'>
        {/* ============== naviabr  */}
        <Navebar/>
        {/* =================== content  */}
        <div className='content_dashboard'>
          <div className='single_vendor_detailes'>
               <h1>Vendor Detail</h1>
               <div className='vendor_detail'>
                <h2 className='text-[23px] mb-1'>ID: #{filterVendor[0]?.id}</h2>
               </div>
               <div className='vendor_detail_box'>
                <p>VendorName : </p>
                <span>{filterVendor[0].VendorName}</span>
               </div>
               <div className='vendor_detail_box'>
                <p>Address : </p>
                <span>{filterVendor[0].Address}</span>
               </div>
               <div className='vendor_detail_box'>
                <p>BankAccountNo : </p>
                <span>{filterVendor[0].BankAccountNo}</span>
               </div>
               <div className='vendor_detail_box'>
                <p>ContactNumber : </p>
                <span>{filterVendor[0].ContactNumber}</span>
               </div>
               <div className='vendor_detail_box'>
                <p>Email : </p>
                <span>{filterVendor[0].Email}</span>
               </div>
               <div className='vendor_detail_box'>
                <p>Rate : </p>
                <span>{filterVendor[0].Rate}</span>
               </div>
               <div className='vendor_detail_box'>
                <p>IsActive : </p>
                <span>{filterVendor[0].IsActive == 1 ? "false" : "true" }</span>
               </div>
          </div>
        </div>
    </div>

</div>
  )
}

export default SingleVendor;



