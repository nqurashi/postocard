import React from 'react'
import Sidebar from '../Layout/Sidebar'
import Navebar from '../Layout/Navebar'
import OrderDetail from '../Components/SingleOrder/OrderDetail'

const SingleOrder = () => {
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
     <OrderDetail/>
    </div>
  </div>
  )
}

export default SingleOrder