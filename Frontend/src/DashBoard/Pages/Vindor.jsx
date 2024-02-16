import React, { useEffect } from 'react'
import Sidebar from '../Layout/Sidebar'
import Navebar from '../Layout/Navebar'
import VindorList from '../Components/VindorList/VindorList'
import { useDispatch } from 'react-redux'
import { GetAllVendor } from '../../Redux/Action/VendorAction'

const Vindor = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(GetAllVendor())
  },[])
  return (
    <div className="dashboard_common">
    {/* ==================== sidebard dashboard  */}
    <div className="dashboard_sidebar">
      <Sidebar />
    </div>
    {/* ======================= navebar and content  */}
    <div className="navebar_content_dashbaord">
      {/* ============== naviabr  */}
      <Navebar />
      {/* =================== content  */}
     <VindorList/>
    </div>
  </div>
  )
}

export default Vindor