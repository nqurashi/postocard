import {configureStore} from "@reduxjs/toolkit";
import { UserReducer } from "./Reducer/UserReducer";
import { ProductReducer } from "./Reducer/ProductReducer";
import { CategoryReducer } from "./Reducer/CategoryReducer";
import { CartReducer } from "./Reducer/CartReducer";
import { OrderReducer } from "./Reducer/OrderReducer";
import { VendorReducerA } from "./Reducer/VendorReducer";
import { AllordersReducer } from "./Reducer/VendorOrderReducer";


export const Store = configureStore({
    reducer : {
        user : UserReducer,
        product : ProductReducer,
        category : CategoryReducer,
        cart : CartReducer,
        order : OrderReducer,
        vendor : VendorReducerA,
        vendorOrders : AllordersReducer
    }
})