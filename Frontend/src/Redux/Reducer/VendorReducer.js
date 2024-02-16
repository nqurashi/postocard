import { createReducer } from "@reduxjs/toolkit"
import { ASSIGNED_VENDOR_ERROR, ASSIGNED_VENDOR_REQUEST, ASSIGNED_VENDOR_REQUEST_FAIL, ASSIGNED_VENDOR_SUCCESS, CREATE_VENDOR_ERROR, CREATE_VENDOR_REQUEST, CREATE_VENDOR_REQUEST_FAIL, CREATE_VENDOR_SUCCESS, GET_VENDOR_ERROR, GET_VENDOR_REQUEST, GET_VENDOR_REQUEST_FAIL, GET_VENDOR_SUCCESS, UPDATE_VENDOR_ERROR, UPDATE_VENDOR_REQUEST, UPDATE_VENDOR_REQUEST_FAIL, UPDATE_VENDOR_SUCCESS } from "../Variables/Vindor"


const initialValue = {
    loading : false,
    allVendor : []
}


export const VendorReducerA = createReducer(initialValue , (builder)=>{
    builder
    .addCase(CREATE_VENDOR_REQUEST, (state)=>{
        state.loading = true
    })
    .addCase(CREATE_VENDOR_REQUEST_FAIL, (state)=>{
        state.loading = false
    })
    .addCase(CREATE_VENDOR_SUCCESS, (state)=>{
        state.loading = false
    })
    .addCase(CREATE_VENDOR_ERROR, (state)=>{
        state.loading = false
    })
    // --------- get all vendor 
    .addCase(GET_VENDOR_REQUEST, (state)=>{
        state.loading = true
    })
    .addCase(GET_VENDOR_REQUEST_FAIL, (state)=>{
        state.loading = false
    })
    .addCase(GET_VENDOR_SUCCESS, (state,action)=>{
        state.loading = false;
        state.allVendor = action.payload;
    })
    .addCase(GET_VENDOR_ERROR, (state)=>{
        state.loading = false
    })
    // --------- assigned 
    .addCase(ASSIGNED_VENDOR_REQUEST, (state)=>{
        state.loading = true
    })
    .addCase(ASSIGNED_VENDOR_REQUEST_FAIL, (state)=>{
        state.loading = false
    })
    .addCase(ASSIGNED_VENDOR_SUCCESS, (state)=>{
        state.loading = false
    })
    .addCase(ASSIGNED_VENDOR_ERROR, (state)=>{
        state.loading = false
    })
    // --------- update role 
    .addCase(UPDATE_VENDOR_REQUEST, (state)=>{
        state.loading = true
    })
    .addCase(UPDATE_VENDOR_REQUEST_FAIL, (state)=>{
        state.loading = false
    })
    .addCase(UPDATE_VENDOR_SUCCESS, (state)=>{
        state.loading = false
    })
    .addCase(UPDATE_VENDOR_ERROR, (state)=>{
        state.loading = false
    })
})