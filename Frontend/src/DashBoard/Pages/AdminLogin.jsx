import React, { useEffect } from 'react';
import AdminuserCom from "../Accounts/AdminLogin"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminVerify from '../../Hooks/AdminVerify';

const AdminLogin = () => {
    const isAuthanticated = useSelector((state)=> state.user.isAuthanticated);
    const user = useSelector((state)=> state.user.user)
   
     const navigate =useNavigate()
     // -------------check isAuthanticated and redirect  
     useEffect(()=>{
        if(isAuthanticated && user.IsAdmin === 1){
          navigate("/admin/dashboard")
        }
     },[isAuthanticated,user])
     console.log(user, "user");
  return (
    <div className='w-[100%] flex justify-center place-items-center'>
         <AdminuserCom/>
    </div>
  )
}

export default AdminLogin