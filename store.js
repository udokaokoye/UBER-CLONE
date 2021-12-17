import {configureStore} from "@reduxjs/toolkit";

import navReducer from './slices/navSlice'
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        nav: navReducer,
        user: userSlice
    }
})