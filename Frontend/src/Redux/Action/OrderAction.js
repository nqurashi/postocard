import { toast } from "react-toastify";
import { download, server } from "../../Setting/GlobalVariable";
import {
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST_FAIL,
  CREATE_ORDER_SUCCESS,
  DOWNLOAD_FILE_ERROR,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_REQUEST_FAIL,
  DOWNLOAD_FILE_SUCCESS,
  GET_ALL_ORDER_ERROR,
  GET_ALL_ORDER_REQUEST,
  GET_ALL_ORDER_REQUEST_FAIL,
  GET_ALL_ORDER_SUCCESS,
  ORDER_FAIL,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  TRANSCATION_ERROR,
  TRANSCATION_REQUEST,
  TRANSCATION_REQUEST_FAIL,
  TRANSCATION_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST_FAIL,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "../Variables/Order";
import Cookies from "js-cookie";
import {
  GET_ORDERS_USER_ERROR,
  GET_ORDERS_USER_FAIL,
  GET_ORDERS_USER_REQUEST,
  GET_ORDERS_USER_SUCCESS,
} from "../Variables/UserVariables";
import axios from "axios";
export const OrderCreateFunction = (orderdata, url, navigate) => async (dispatch) => {
  
  try {
    
    dispatch({ type: CREATE_ORDER_REQUEST });
    // console.log(orderdata, "ok");
    console.log("ok3");
    const res = await fetch(`${server}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(orderdata),
    });
    dispatch({ type: CREATE_ORDER_REQUEST_FAIL });
    const data = await res.json();
    console.log(data);
    console.log(res.status, "this");
    if (!data || res.status === 400) {
      dispatch({ type: ORDER_FAIL });
      toast.error(data.message);
      if(url === "guest/cart/order/success"){
        navigate("/conformOrder");
      }
      console.log(res.status, "this");
      console.log(url, "this");
      return 
    } else {
      dispatch({ type: CREATE_ORDER_SUCCESS });
      if (data.message === "success") {
        dispatch({ type: ORDER_SUCCESS });
        // if(url === "guest/cart/order/success"){
          navigate("/conformOrder");
      // }
      } else if (data.message === "failed") {
        dispatch({ type: ORDER_FAIL });
        // if(url){
          navigate("/conformOrder");
      // }
      }
    }
    toast.success(data.message);
    
  } catch (error) {
    dispatch({ type: CREATE_ORDER_ERROR });
    console.log(error);
  }
};

// =====  verify the payment subscription in packages
export const SubscriptionInPackages =
  (orderid, GetId, GetPrice) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_REQUEST });

      console.log(orderid);

      const response = await fetch(
        `${server}/cart/paypal/order/PaymentVerified/${orderid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
          },
        }
      );

      const responseData = await response.json();
      if (response.status === 400) {
        return dispatch({ type: ORDER_FAIL });
      }
      if (response.status === 200) {
        if (responseData.message === "success") {
          dispatch({ type: ORDER_SUCCESS });
          await createSubscription(GetId, GetPrice);
        } else if (responseData.message === "failed") {
          return dispatch({ type: ORDER_FAIL });
        }
      }

      console.log(responseData, "verify response");

      // Additional logic based on the response status, if needed
      // if (response.status === 200) {
      //   // Additional actions
      // }
    } catch (error) {
      console.log(error.message);
      dispatch({ type: ORDER_FAIL });
    }
  };

const createSubscription = async (GetId, GetPrice) => {
  try {
    const token = Cookies.get("ApiLoginToken");
    console.log("call");
    if (!GetId || !GetPrice) {
      return toast.error("An Error accured.");
    } else {
      const url = `${server}/upgrade-package/${GetId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}), // empty data object if you don't have any data to send
      });

      // Assuming you want to parse the JSON response
      const responseData = await response.json();
      console.log(responseData, "response");
      if (response.status === 400) {
        return toast.error(responseData.message);
      } else {
        toast.success(responseData.message);
      }
    }
  } catch (error) {
    console.log(error.message);
    // toast.error(error.message);
  }
};
// =========== get all orders

export const GetAllOrdersFunc = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ORDER_REQUEST });
    const res = await fetch(`${server}/admin/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_ALL_ORDER_REQUEST_FAIL });
    const data = await res.json();
    console.log(data, "orders")
    if (!data || res.status === 400) {
      return;
    } else {
      dispatch({ type: GET_ALL_ORDER_SUCCESS, payload: data.orders });
    }
  } catch (error) {
    dispatch({ type: GET_ALL_ORDER_ERROR });
  }
};

// ========= update order status
export const updateOrderStatusfun = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    const res = await fetch(`${server}/admin/orders/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS });
      toast.success(data.message);
    }
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_STATUS_ERROR });
  }
};

// ======= download file
export const downloadfileFunc = (CardOrderId) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_FILE_REQUEST });
    const res = await fetch(`${server}/admin/order/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify({ CardOrderId }),
    });
    dispatch({ type: DOWNLOAD_FILE_REQUEST_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      dispatch({ type: DOWNLOAD_FILE_SUCCESS, payload: data.data });
      const files = data.data;
      toast.success(data.message);
      const file1 = download + files?.image1;
      const file2 = download + files?.image2;
      console.log(files);
      const downloadFile2 = async () => {
        if (file2) {
          await initiateDownload(file2, "image2.jpg");
          console.log(file2, "file 2");
        }
      };

      const downloadFile1 = async () => {
        if (file1) {
          await initiateDownload(file1, "image1.jpg");
          console.log(file1, "file 1");
        }
      };

      const initiateDownload = (url, filename) => {
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      // Call the download functions here
      await downloadFile1();
      await downloadFile2();
      // ======================================
      // const downloadFile = async (file, filename) => {
      //   const url = `${download}${file}`;
      //   try {
      //     const response = await fetch(url);
      //     const blob = await response.blob();
      //     const link = document.createElement("a");
      //     link.href = window.URL.createObjectURL(blob);
      //     link.download = filename;
      //     link.click();
      //   } catch (error) {
      //     console.error("Error downloading file:", error);
      //   }
      // };

      // // Call the download functions sequentially
      // await downloadFile(files?.image1, "image1.jpg");
      // await downloadFile(files?.image2, "image2.jpg");
    }
  } catch (error) {
    dispatch({ type: DOWNLOAD_FILE_ERROR });
  }
};

// ========= update status
export const UpdateOrderStatusFunc =
  (OrderItemId, ItemStatus) => async (dispatch) => {
    try {
      dispatch({ type: DOWNLOAD_FILE_REQUEST });
      const res = await fetch(`${server}/admin/order/status/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify({ OrderItemId, ItemStatus }),
      });
      dispatch({ type: DOWNLOAD_FILE_REQUEST_FAIL });
      const data = await res.json();
      console.log(data);
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else {
        dispatch({ type: DOWNLOAD_FILE_SUCCESS });
        toast.success(data.message);
      }
    } catch (error) {
      dispatch({ type: DOWNLOAD_FILE_ERROR });
    }
  };
// ========= update status
export const GetUserOrder = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_USER_REQUEST });
    const res = await fetch(`${server}/user/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_ORDERS_USER_FAIL });
    const data = await res.json();
    console.log(data);
    if (!data || res.status === 400) {
      return;
    } else {
      dispatch({ type: GET_ORDERS_USER_SUCCESS, payload: data.orders });
    }
  } catch (error) {
    dispatch({ type: GET_ORDERS_USER_ERROR });
  }
};

// ------ transcations
export const getTranscations = () => async (dispatch) => {
  try {
    dispatch({ type: TRANSCATION_REQUEST });
    const res = await fetch(`${server}/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: TRANSCATION_REQUEST_FAIL });
    const data = await res.json();
    console.log(data);
    if (!data || res.status === 400) {
      return;
    } else {
      dispatch({ type: TRANSCATION_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: TRANSCATION_ERROR });
  }
};
