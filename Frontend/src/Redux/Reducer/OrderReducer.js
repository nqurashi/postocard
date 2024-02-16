import { createReducer } from "@reduxjs/toolkit";
import {
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST_FAIL,
  CREATE_ORDER_SUCCESS,
  DOWNLOAD_FILE_ERROR,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_REQUEST_FAIL,
  DOWNLOAD_FILE_SUCCESS,
  GET_ALL_ORDER_REQUEST,
  GET_ALL_ORDER_REQUEST_FAIL,
  GET_ALL_ORDER_SUCCESS,
  ORDER_FAIL,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  STATUS_UPDATE_ERROR,
  STATUS_UPDATE_REQUEST,
  STATUS_UPDATE_REQUEST_FAIL,
  STATUS_UPDATE_SUCCESS,
  TRANSCATION_ERROR,
  TRANSCATION_REQUEST,
  TRANSCATION_REQUEST_FAIL,
  TRANSCATION_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST_FAIL,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "../Variables/Order";
import {
  GET_ORDERS_USER_ERROR,
  GET_ORDERS_USER_FAIL,
  GET_ORDERS_USER_REQUEST,
  GET_ORDERS_USER_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
} from "../Variables/UserVariables";

const initialValue = {
  loading: false,
  isSuccess: false,
  isFailed: false,
  allorder: [],
  files: {},
  UserOrders: [],
  Transcations: [],
};

export const OrderReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(CREATE_ORDER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(CREATE_ORDER_REQUEST_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(ORDER_REQUEST, (state) => {
      state.loading = true;
      state.isFailed = false;
      state.isSuccess = false;
    })
    .addCase(ORDER_FAIL, (state) => {
      state.loading = false;
      state.isFailed = true;
      state.isSuccess = false;
    })
   
    .addCase(ORDER_SUCCESS, (state) => {
      state.loading = false;
      state.isSuccess = true;
      state.isFailed = false;
    })
    .addCase(CREATE_ORDER_SUCCESS, (state) => {
      state.loading = false;
    })
    .addCase(CREATE_ORDER_ERROR, (state) => {
      state.loading = false;
    })
    // ======= get all orders
    .addCase(GET_ALL_ORDER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_ALL_ORDER_REQUEST_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(GET_ALL_ORDER_SUCCESS, (state, action) => {
      state.loading = false;
      state.allorder = action.payload;
    })
    .addCase(GET_SINGLE_PRODUCT_FAIL, (state) => {
      state.loading = false;
    })
    // ======= upadte order status
    .addCase(UPDATE_ORDER_STATUS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(UPDATE_ORDER_STATUS_REQUEST_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(UPDATE_ORDER_STATUS_SUCCESS, (state) => {
      state.loading = false;
    })
    .addCase(UPDATE_ORDER_STATUS_ERROR, (state) => {
      state.allorder = false;
    })
    // ======== download file
    .addCase(DOWNLOAD_FILE_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(DOWNLOAD_FILE_REQUEST_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(DOWNLOAD_FILE_SUCCESS, (state, action) => {
      state.loading = false;
      state.files = action.payload;
    })
    .addCase(DOWNLOAD_FILE_ERROR, (state) => {
      state.loading = false;
    })
    // =========== update status
    .addCase(STATUS_UPDATE_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(STATUS_UPDATE_REQUEST_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(STATUS_UPDATE_SUCCESS, (state, action) => {
      state.loading = false;
    })
    .addCase(STATUS_UPDATE_ERROR, (state) => {
      state.loading = false;
    })
    // ==== user orders
    // =========== update status
    .addCase(GET_ORDERS_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_ORDERS_USER_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(GET_ORDERS_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.UserOrders = action.payload;
    })
    .addCase(GET_ORDERS_USER_ERROR, (state) => {
      state.loading = false;
    })
    // ------ transcations
    .addCase(TRANSCATION_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(TRANSCATION_REQUEST_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(TRANSCATION_SUCCESS, (state, action) => {
      state.loading = false;
      state.Transcations = action.payload;
    })
    .addCase(TRANSCATION_ERROR, (state) => {
      state.loading = false;
    });
});
