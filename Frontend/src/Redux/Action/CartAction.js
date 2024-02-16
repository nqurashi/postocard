import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { server } from "../../Setting/GlobalVariable";
import {
  CREATE_CART_PRODUCT_ERROR,
  CREATE_CART_PRODUCT_REQUEST,
  CREATE_CART_PRODUCT_REQUEST_FAIL,
  CREATE_CART_PRODUCT_SUCCESS,
  GET_CART_PRODUCT_ERROR,
  GET_CART_PRODUCT_REQUEST,
  GET_CART_PRODUCT_REQUEST_FAIL,
  GET_CART_PRODUCT_SUCCESS,
} from "../Variables/CartVariable";

// -------------- create Cart
export const CreateCartFunction =
  (
    ProductId,
    Message,
    Signature,
    CartCode,
    FullName,
    StreetAddress,
    City,
    State,
    Country,
    MobileNo,
    NewAddress,
    user_address_id
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_CART_PRODUCT_REQUEST });
      console.log(
        ProductId,
        Message,
        Signature,
        CartCode,
        FullName,
        StreetAddress,
        City,
        State,
        Country,
        MobileNo,
        NewAddress,
        user_address_id
      );
      const res = await fetch(`${server}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify({
          ProductId,
          Message,
          Signature,
          CartCode,
          FullName,
          StreetAddress,
          City,
          State,
          Country,
          MobileNo,
          NewAddress,
          user_address_id,
        }),
      });
      dispatch({ type: CREATE_CART_PRODUCT_REQUEST_FAIL });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        dispatch({ type: CREATE_CART_PRODUCT_SUCCESS, payload: data.data });
        toast.success(data.message);
        if (data.data.CartData.CartCode) {
          localStorage.setItem("cartcode", data.data.CartData.CartCode);
        }
      }
    } catch (error) {
      dispatch({
        type: CREATE_CART_PRODUCT_ERROR,
        payload: error.message,
      });
    }
  };

// ----------------- get cart data
export const GetAllCartData = (CartCode) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_PRODUCT_REQUEST });
    const res = await fetch(`${server}/cart/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify({ CartCode }),
    });
    dispatch({ type: GET_CART_PRODUCT_REQUEST_FAIL });
    const data = await res.json();
    if (res.status === 400 || !data) {
      return toast.error(data.message);
    } else {
      dispatch({ type: GET_CART_PRODUCT_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({
      type: GET_CART_PRODUCT_ERROR,
      payload: error.message,
    });
  }
};
