import { toast } from "react-toastify"
import { server } from "../../Setting/GlobalVariable";
import Cookies from 'js-cookie';





export const CommonPOSTCall = (v1,v2,v3,v4,bodydata,url) => async (dispatch)=>{
  try {
    dispatch({type : v1})
    const res = await fetch(`${server}/${url}`,{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + Cookies.get("ApiLoginToken")

        },
        body : JSON.stringify(bodydata)
        
    })
    dispatch({type : v2})
    const data = await res.json()
    console.log(data);
    if(res.status === 400 || !data){
        return toast.error(data.message)
    }else{
        dispatch({type : v3 , payload : data.data})
        toast.success(data.message)
    }
  } catch (error) {
    dispatch({type : v4})
    toast.error(error.message)
    
  }

}