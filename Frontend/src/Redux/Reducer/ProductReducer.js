import { createReducer } from "@reduxjs/toolkit";
import {
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DISCOUNT_PRODUCT_ERROR,
  DISCOUNT_PRODUCT_FAIL,
  DISCOUNT_PRODUCT_REQUEST,
  DISCOUNT_PRODUCT_SUCCESS,
  GET_ADMIN_PRODUCT_ERROR,
  GET_ADMIN_PRODUCT_FAIL,
  GET_ADMIN_PRODUCT_REQUEST,
  GET_ADMIN_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
} from "../Variables/UserVariables";

const initialState = {
  isLoading: false,
  singleProductLoad: false,
  allProduct: [],
  allproductforAdmin: [],
  singleproduct: {},
};

export const ProductReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_PRODUCT_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(CREATE_PRODUCT_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(CREATE_PRODUCT_SUCCESS, (state) => {
      state.isLoading = false;
    })
    .addCase(CREATE_PRODUCT_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })
    // ---------------- GET ALL PRODUCT
    .addCase(GET_PRODUCT_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_PRODUCT_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_PRODUCT_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allProduct = action.payload;
    })
    .addCase(GET_PRODUCT_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })
    // ---------------- GET ALL PRODUCT FOR ADMIN
    .addCase(GET_ADMIN_PRODUCT_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_ADMIN_PRODUCT_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_ADMIN_PRODUCT_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allproductforAdmin = action.payload;
    })
    .addCase(GET_ADMIN_PRODUCT_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })
    // ---------- get single product
    .addCase(GET_SINGLE_PRODUCT_REQUEST, (state) => {
      state.singleProductLoad = true;
    })
    .addCase(GET_SINGLE_PRODUCT_FAIL, (state) => {
      state.singleProductLoad = false;
    })
    .addCase(GET_SINGLE_PRODUCT_SUCCESS, (state, action) => {
      state.singleProductLoad = false;
      state.singleproduct = action.payload;
    })
    .addCase(GET_SINGLE_PRODUCT_ERROR, (state, action) => {
      state.singleProductLoad = false;
      state.ERROR = action.payload;
    })
    // ---------- product discount
    .addCase(DISCOUNT_PRODUCT_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(DISCOUNT_PRODUCT_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(DISCOUNT_PRODUCT_SUCCESS, (state, action) => {
      state.isLoading = false;
    })
    .addCase(DISCOUNT_PRODUCT_ERROR, (state, action) => {
      state.isLoading = false;
    });
});
