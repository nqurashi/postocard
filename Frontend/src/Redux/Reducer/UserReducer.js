import { createReducer } from "@reduxjs/toolkit";
import {
  ACTIVE_DEACTIVE_USER_ERROR,
  ACTIVE_DEACTIVE_USER_FAIL,
  ACTIVE_DEACTIVE_USER_REQUEST,
  ACTIVE_DEACTIVE_USER_SUCCESS,
  ANALYTICS_USER_ERROR,
  ANALYTICS_USER_FAIL,
  ANALYTICS_USER_REQUEST,
  ANALYTICS_USER_SUCCESS,
  CREATE_ADDRESS_ERROR,
  CREATE_ADDRESS_FAIL,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_ERROR,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  GET_ADDRESS_ERROR,
  GET_ADDRESS_FAIL,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADMIN_ALL_ERROR,
  GET_ADMIN_ALL_FAIL,
  GET_ADMIN_ALL_REQUEST,
  GET_ADMIN_ALL_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  PACKAGE_CREATE_ERROR,
  PACKAGE_CREATE_FAIL,
  PACKAGE_CREATE_REQUEST,
  PACKAGE_CREATE_SUCCESS,
  PASSWORD_UPDATE_ERROR,
  PASSWORD_UPDATE_FAIL,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  REGISTRATION_USER_ERROR,
  REGISTRATION_USER_FAIL,
  REGISTRATION_USER_REQUEST,
  REGISTRATION_USER_SUCCESS,
  UPDATE_ADDRESS_ERROR,
  UPDATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  VALID_USER_ERROR,
  VALID_USER_FAIL,
  VALID_USER_REQUEST,
  VALID_USER_SUCCESS,
} from "../Variables/UserVariables";

const initialState = {
  loading: false,
  isAuthantication: false,
  user: {},
  ERROR: null,
  valid: false,
  userAddress: [],
  AdminUsers: [],
  UserAnalytics: [],
  isPackageLodings: false,
};

export const UserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOGIN_USER_REQUEST, (state) => {
      state.loading = true;
      state.isAuthantication = false;
    })
    .addCase(LOGIN_USER_FAIL, (state) => {
      state.loading = false;
      state.isAuthantication = false;
    })
    .addCase(LOGIN_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthantication = true;
    })
    .addCase(LOGIN_USER_ERROR, (state, action) => {
      state.loading = false;
      state.ERROR = action.payload;
      state.isAuthantication = false;
    })
    // -------------- registration
    .addCase(REGISTRATION_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(REGISTRATION_USER_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(REGISTRATION_USER_SUCCESS, (state, action) => {
      state.loading = false;
    })
    .addCase(REGISTRATION_USER_ERROR, (state, action) => {
      state.loading = false;
      state.ERROR = action.payload;
    })
    // ====== logout
    .addCase(LOGOUT_USER_REQUEST, (state) => {
      state.loading = true;
      state.isAuthantication = false;
    })
    .addCase(LOGOUT_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.isAuthantication = false;
      state.user = {};
    })
    //  ---------------- valid user request
    .addCase(VALID_USER_REQUEST, (state) => {
      state.loading = true;
      state.isAuthantication = false;
    })
    .addCase(VALID_USER_FAIL, (state) => {
      state.loading = false;
      state.isAuthantication = false;
    })
    .addCase(VALID_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthantication = true;
      state.valid = true;
    })
    .addCase(VALID_USER_ERROR, (state, action) => {
      state.loading = false;
      state.ERROR = action.payload;
      state.isAuthantication = false;
    })
    // ------------------- create adddress
    .addCase(CREATE_ADDRESS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(CREATE_ADDRESS_ERROR, (state) => {
      state.loading = false;
    })
    .addCase(CREATE_ADDRESS_SUCCESS, (state, action) => {
      state.loading = false;
    })
    .addCase(CREATE_ADDRESS_FAIL, (state, action) => {
      state.loading = false;
    })
    // ---- GET ADDRESS
    .addCase(GET_ADDRESS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_ADDRESS_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(GET_ADDRESS_SUCCESS, (state, action) => {
      state.loading = false;
      state.userAddress = action.payload;
    })
    .addCase(GET_ADDRESS_ERROR, (state, action) => {
      state.loading = false;
    })
    // ------ update user addres
    .addCase(UPDATE_ADDRESS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(UPDATE_ADDRESS_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(UPDATE_ADDRESS_SUCCESS, (state, action) => {
      state.loading = false;
    })
    .addCase(UPDATE_ADDRESS_ERROR, (state, action) => {
      state.loading = false;
    })
    // ----- delete address
    .addCase(DELETE_ADDRESS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(DELETE_ADDRESS_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(DELETE_ADDRESS_SUCCESS, (state, action) => {
      state.loading = false;
    })
    .addCase(DELETE_ADDRESS_ERROR, (state, action) => {
      state.loading = false;
    })
    // ---- admin all users
    .addCase(GET_ADMIN_ALL_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_ADMIN_ALL_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(GET_ADMIN_ALL_SUCCESS, (state, action) => {
      state.loading = false;
      state.AdminUsers = action.payload;
    })
    .addCase(GET_ADMIN_ALL_ERROR, (state, action) => {
      state.loading = false;
    })
    // ---- admin all users
    .addCase(ACTIVE_DEACTIVE_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ACTIVE_DEACTIVE_USER_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(ACTIVE_DEACTIVE_USER_SUCCESS, (state) => {
      state.loading = false;
    })
    .addCase(ACTIVE_DEACTIVE_USER_ERROR, (state, action) => {
      state.loading = false;
    })
    // ----- analytics user
    .addCase(ANALYTICS_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ANALYTICS_USER_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(ANALYTICS_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.UserAnalytics = action.payload;
    })
    .addCase(ANALYTICS_USER_ERROR, (state) => {
      state.loading = false;
    })
    // ----- update user password
    .addCase(PASSWORD_UPDATE_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(PASSWORD_UPDATE_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(PASSWORD_UPDATE_SUCCESS, (state, action) => {
      state.loading = false;
    })
    .addCase(PASSWORD_UPDATE_ERROR, (state) => {
      state.loading = false;
    })
    // ===========
    // ----- update user email name
    .addCase(PROFILE_UPDATE_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(PROFILE_UPDATE_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(PROFILE_UPDATE_SUCCESS, (state, action) => {
      state.loading = false;
    })
    .addCase(PROFILE_UPDATE_ERROR, (state) => {
      state.loading = false;
    })
    // ----- Create Package
    .addCase(PACKAGE_CREATE_REQUEST, (state) => {
      state.isPackageLodings = true;
    })
    .addCase(PACKAGE_CREATE_FAIL, (state) => {
      state.isPackageLodings = false;
    })
    .addCase(PACKAGE_CREATE_SUCCESS, (state, action) => {
      state.isPackageLodings = false;
    })
    .addCase(PACKAGE_CREATE_ERROR, (state) => {
      state.isPackageLodings = false;
    });
});
