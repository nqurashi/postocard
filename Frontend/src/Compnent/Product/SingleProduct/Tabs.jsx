import React from 'react'

const Tabs = ({active,setActive}) => {
  return (
    <div className='w-full py-2 px-1 flex justify-center place-items-center gap-[20px]'>
        <p className={`${active === 1 ? "text-black font-bold border-b-2 border-[#F49E3F]" : ""} cursor-pointer text-[gray] text-[16px] font-[400] px-2 `} onClick={()=> setActive(1)}>Description</p>
        <p className={`${active === 2 ? "text-black font-bold border-b-2 border-[#F49E3F]" : ""} cursor-pointer text-[gray] text-[16px] font-[400] px-2`} onClick={()=> setActive(2)}>Reviews(0)</p>
    </div>
  )
}

export default Tabs