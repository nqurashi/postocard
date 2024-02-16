import { createReducer } from "@reduxjs/toolkit";
import {
  Vendor_Order_Request,
  Vendor_Order_SUCCESS,
  Vendor_Order_REQUEST_FAIL,
  Vendor_Order_ERROR,
} from "../Variables/VendorOrderVariable";

const initialValue = {
  loading: false,
  allOrders: [],
};

export const AllordersReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(Vendor_Order_Request, (state) => {
      state.loading = true;
    })
    .addCase(Vendor_Order_REQUEST_FAIL, (state) => {
      state.loading = false;
    })
    .addCase(Vendor_Order_SUCCESS, (state, action) => {
      state.loading = false;
      state.allOrders = action.payload;

    })
    .addCase(Vendor_Order_ERROR, (state) => {
      state.loading = false;
    });
});

