import Cookies from "js-cookie";
import { server } from "../../Setting/GlobalVariable";
import {
  Vendor_Order_Request,
  Vendor_Order_SUCCESS,
  Vendor_Order_REQUEST_FAIL,
  Vendor_Order_ERROR,
} from "../Variables/VendorOrderVariable";
import { toast } from "react-toastify";
import axios from "axios";

export const fetchAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: Vendor_Order_Request });
    const getToken = Cookies.get("vendorLoginToken");
    const response = await axios.get(`${server}/vendor/assigned-orders`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    console.log(response.data, "orders");
    dispatch({ type: Vendor_Order_REQUEST_FAIL });
    const data = response.data;
    console.log(data, 'data')
    if (!data || response.status === 400) {
      return toast.error(data.message);
    } else {
      dispatch({ type: Vendor_Order_SUCCESS, payload: data });
      toast.success(data.message);
    }
  } catch (error) {
    dispatch({ type: Vendor_Order_ERROR });
    console.log(error.message)

  }
};
