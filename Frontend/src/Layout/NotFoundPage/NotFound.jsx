import React from 'react'
import AnimateLoading from '../Loading/AnimateLoading'
import SVG from "../Loading/notfoundpage.json"
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex justify-center place-items-center bg-white flex-col absolute top-0 left-0 w-[100%] h-[100vh] z-50'>
     <AnimateLoading  SVGGET={SVG}/>
     {/* <h2 className='text-[#F49E3F] text-[28px] my-2'>OPPS! Page Not Found</h2> */}
     <p className="text-[#27AAE1] rounded-[7px] py-2 px-3  m-2 text-[27px] font-bold"><span className="text-[28px]">OOPS!</span> Page Not Found.</p>

  <NavLink to="/">
  <button className='bg-[#27AAE1] px-[20px] w-[150px] text-white py-[7px] cursor-pointer my-2 rounded-sm'>Home</button>
  </NavLink>
    </div>
  )
}

export default NotFound