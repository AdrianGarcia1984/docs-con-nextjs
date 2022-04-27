import { configureStore } from "@reduxjs/toolkit";
//reducer
import users from './slice/user'

export default configureStore({
    reducer:{
        users
    }
})