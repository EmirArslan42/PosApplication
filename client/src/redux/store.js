import {configureStore} from "@reduxjs/toolkit"
import cardSlice from "./CardSlice"

export default configureStore({
    reducer:{
        card:cardSlice
    }
})