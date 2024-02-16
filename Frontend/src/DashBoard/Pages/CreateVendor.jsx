import React from 'react'
import Sidebar from '../Layout/Sidebar'
import Navebar from '../Layout/Navebar'
import CreateVendorCom from '../Components/CreateVendor/CreateVendorCom'

const CreateVendor = () => {
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
     <CreateVendorCom/>
    </div>
    </div>
  )
}

export default CreateVendor