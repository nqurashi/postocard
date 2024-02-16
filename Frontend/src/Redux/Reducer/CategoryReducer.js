import { createReducer } from "@reduxjs/toolkit";
import {
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_SUB_CATEGORY_ERROR,
  CREATE_SUB_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERROR,
  EDIT_CATEGORY_FAIL,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_SUB_CATEGORY_ERROR,
  EDIT_SUB_CATEGORY_FAIL,
  EDIT_SUB_CATEGORY_REQUEST,
  EDIT_SUB_CATEGORY_SUCCESS,
  GET_CATEGORY_ERROR,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_FOR_USER_ERROR,
  GET_CATEGORY_FOR_USER_FAIL,
  GET_CATEGORY_FOR_USER_REQUEST,
  GET_CATEGORY_FOR_USER_SUCCESS,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_SUB_CATEGORY_ERROR,
  GET_SUB_CATEGORY_FAIL,
  GET_SUB_CATEGORY_REQUEST,
  GET_SUB_CATEGORY_SUCCESS,
} from "../Variables/UserVariables";

const initialState = {
  isLoading: false,
  allcategory: [],
  allcategoryforuser: [],
  allsubcategory: [],
};

export const CategoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_CATEGORY_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(CREATE_CATEGORY_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(CREATE_CATEGORY_SUCCESS, (state) => {
      state.isLoading = false;
    })
    .addCase(CREATE_CATEGORY_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })
    // ---- eidt
    .addCase(EDIT_PRODUCT_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(EDIT_PRODUCT_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(EDIT_PRODUCT_SUCCESS, (state) => {
      state.isLoading = false;
    })
    .addCase(EDIT_PRODUCT_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })

    // ---------------- GET ALL CATEGORY
    .addCase(GET_CATEGORY_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_CATEGORY_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_CATEGORY_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allcategory = action.payload;
    })
    .addCase(GET_CATEGORY_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })
    // ---------------- GET ALL CATEGORY for users
    .addCase(GET_CATEGORY_FOR_USER_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(GET_CATEGORY_FOR_USER_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(GET_CATEGORY_FOR_USER_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allcategoryforuser = action.payload;
    })
    .addCase(GET_CATEGORY_FOR_USER_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })

    // -------------------------------------
    // ===========================================
    // sub category
    .addCase(GET_SUB_CATEGORY_REQUEST, (state, action) => {
      state.isLoading = true;
    })
    .addCase(GET_SUB_CATEGORY_FAIL, (state, action) => {
      state.isLoading = false;
    })
    .addCase(GET_SUB_CATEGORY_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allsubcategory = action.payload;
    })
    .addCase(GET_SUB_CATEGORY_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })
    // ======== create sub category
    .addCase(CREATE_SUB_CATEGORY_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(CREATE_SUB_CATEGORY_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(CREATE_SUB_CATEGORY_SUCCESS, (state) => {
      state.isLoading = false;
    })
    .addCase(CREATE_SUB_CATEGORY_ERROR, (state) => {
      state.isLoading = false;
    })
    // ====== update edit category 
    .addCase(EDIT_CATEGORY_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(EDIT_CATEGORY_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(EDIT_CATEGORY_SUCCESS, (state) => {
      state.isLoading = false;
    })
    .addCase(EDIT_CATEGORY_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })
    // ====== update edit sub category 
    .addCase(EDIT_SUB_CATEGORY_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(EDIT_SUB_CATEGORY_FAIL, (state) => {
      state.isLoading = false;
    })
    .addCase(EDIT_SUB_CATEGORY_SUCCESS, (state) => {
      state.isLoading = false;
    })
    .addCase(EDIT_SUB_CATEGORY_ERROR, (state, action) => {
      state.isLoading = false;
      state.ERROR = action.payload;
    })
});
