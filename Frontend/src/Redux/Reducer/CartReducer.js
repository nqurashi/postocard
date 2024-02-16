

import { createReducer } from "@reduxjs/toolkit"
import { CREATE_CART_PRODUCT_ERROR, CREATE_CART_PRODUCT_REQUEST, CREATE_CART_PRODUCT_REQUEST_FAIL, CREATE_CART_PRODUCT_SUCCESS, GET_CART_PRODUCT_ERROR, GET_CART_PRODUCT_REQUEST, GET_CART_PRODUCT_REQUEST_FAIL, GET_CART_PRODUCT_SUCCESS } from "../Variables/CartVariable"


const Initialvalue ={
    isloading : false,
    cart : {},
    ERROR : ""
}

export const CartReducer = createReducer(Initialvalue ,(builder)=>{
    builder
    .addCase(CREATE_CART_PRODUCT_REQUEST,(state)=>{
        state.isloading = true
    })
    .addCase(CREATE_CART_PRODUCT_REQUEST_FAIL ,(state)=>{
        state.isloading = false
    })
    .addCase (CREATE_CART_PRODUCT_SUCCESS,(state,action)=>{
        state.isloading = false;
        state.cart = action.payload;
    })
    .addCase(CREATE_CART_PRODUCT_ERROR, (state,action)=>{
        state.isloading = false;
        state.ERROR = action.payload
    })
    // -------- get card 
    builder
    .addCase(GET_CART_PRODUCT_REQUEST,(state)=>{
        state.isloading = true
    })
    .addCase(GET_CART_PRODUCT_REQUEST_FAIL ,(state)=>{
        state.isloading = false
    })
    .addCase (GET_CART_PRODUCT_SUCCESS,(state,action)=>{
        state.isloading = false;
        state.cart = action.payload;
    })
    .addCase(GET_CART_PRODUCT_ERROR, (state,action)=>{
        state.isloading = false;
        state.ERROR = action.payload
    })
})