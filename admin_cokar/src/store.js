
import { configureStore ,DevToolsEnhancerOptions} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/dataSlice"
const store =configureStore({
    reducer:{
        auth:authReducer,
        data:userReducer
    },
})

export default store