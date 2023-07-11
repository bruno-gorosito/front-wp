import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./reducers/songReducer";

export default configureStore({
    reducer: {
        songs: songReducer
    }
})