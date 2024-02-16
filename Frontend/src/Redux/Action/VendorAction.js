import Cookies from "js-cookie";
import { server } from "../../Setting/GlobalVariable";
import { ASSIGNED_VENDOR_ERROR, ASSIGNED_VENDOR_REQUEST, ASSIGNED_VENDOR_REQUEST_FAIL, ASSIGNED_VENDOR_SUCCESS, CREATE_VENDOR_ERROR, CREATE_VENDOR_REQUEST, CREATE_VENDOR_REQUEST_FAIL, CREATE_VENDOR_SUCCESS, GET_VENDOR_ERROR, GET_VENDOR_REQUEST, GET_VENDOR_REQUEST_FAIL, GET_VENDOR_SUCCESS, UPDATE_VENDOR_ERROR, UPDATE_VENDOR_REQUEST, UPDATE_VENDOR_REQUEST_FAIL, UPDATE_VENDOR_SUCCESS } from "../Variables/Vindor";
import { toast } from "react-toastify";


// -------- create 
export const CreateVendor = (vdata) => async (dispatch)=>{
    try {
        dispatch({type : CREATE_VENDOR_REQUEST});
        const res = await fetch(`${server}/admin/vendor/create`, {
            method  :"POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + Cookies.get("ApiLoginToken")

            },
            body : JSON.stringify(vdata)
        });
        dispatch({type : CREATE_VENDOR_REQUEST_FAIL});
        const data = await res.json();
        console.log(data);
         if(!data || res.status === 400 ){
            return toast.error(data.message)
         } else if (res.status === 500){
          toast.error("Internal Server Error")
        //   return toast.error(data.message);
         }
         else{
            dispatch({type : CREATE_VENDOR_SUCCESS})
            toast.success(data.message)
         }
        
    } catch (error) {
          dispatch({type : CREATE_VENDOR_ERROR , payload: error.message})
    }
}

// ---- get all 
export const GetAllVendor = () => async (dispatch) => {
    try {
      dispatch({ type: GET_VENDOR_REQUEST });
      const res = await fetch(`${server}/admin/vendor/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + Cookies.get("ApiLoginToken")
        },
      });
      dispatch({ type: GET_VENDOR_REQUEST_FAIL });
      const data = await res.json();
      if (!data || res.status === 400) {
        return ;
      } else {
        dispatch({ type: GET_VENDOR_SUCCESS , payload:data.data});
       
      }
    } catch (error) {
      dispatch({ type: GET_VENDOR_ERROR });
    }
  };



// =========== assigned 
  export const AssignedVendor = (vdata) => async (dispatch)=>{
    try {
        dispatch({type : ASSIGNED_VENDOR_REQUEST});
        const res = await fetch(`${server}/admin/vendor/assign`, {
            method  :"POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + Cookies.get("ApiLoginToken")

            },
            body : JSON.stringify(vdata)
        });
        dispatch({type : ASSIGNED_VENDOR_REQUEST_FAIL});
        const data = await res.json();
        console.log(data);
         if(!data || res.status === 400 ){
            return toast.error(data.message)
         } else if (res.status === 500){
          toast.error("Internal Server Error")
        //   return toast.error(data.message);
         }
         else{
            dispatch({type : ASSIGNED_VENDOR_SUCCESS})
            toast.success(data.message)
         }
        
    } catch (error) {
          dispatch({type : ASSIGNED_VENDOR_ERROR , payload: error.message})
    }
}

// ===== update active 
export const UpdateVendorActive = (id) => async (dispatch)=>{
  try {
      dispatch({type : UPDATE_VENDOR_REQUEST});
      const res = await fetch(`${server}/admin/vendor/create`, {
          method  :"POST",
          headers : {
              "Content-Type" : "application/json",
              "Authorization" : "Bearer " + Cookies.get("ApiLoginToken")

          },
          body : JSON.stringify({id})
      });
      dispatch({type : UPDATE_VENDOR_REQUEST_FAIL});
      const data = await res.json();
       if(!data || res.status === 400 ){
          return toast.error(data.message)
       } else if (res.status === 500){
        toast.error("Internal Server Error")
      //   return toast.error(data.message);
       }
       else{
          dispatch({type : UPDATE_VENDOR_SUCCESS})
          toast.success(data.message)
       }
      
  } catch (error) {
        dispatch({type : UPDATE_VENDOR_ERROR , payload: error.message})
  }
}