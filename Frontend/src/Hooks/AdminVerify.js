import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loading from '../Layout/Loading/Loading';
import { LogedinUser } from '../Redux/Action/UserAction';
import AdminLoading from '../Layout/Loading/AdminLoading';

const AdminVerify = ({children}) => {
    // const user =  useSelector((state)=> state.user.user);
    // const isAuthantication =  useSelector((state)=> state.user.isAuthantication);
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(LogedinUser());
    //   }, []);
 
    // if(Object.keys(user).length > 0){
        
    //     if(isAuthantication && user.role === 1){
    //         return <>{children}</>
    //     }else{
    //         return <Navigate replace to={"/"}/>
    //     }
    // }else{
    //     return <AdminLoading/>
    // }

    return <>{children}</>
 
}

export default AdminVerify