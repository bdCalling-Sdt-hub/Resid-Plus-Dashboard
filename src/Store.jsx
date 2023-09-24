import { configureStore } from "@reduxjs/toolkit";
import SigninReducer from "./ReduxSlices/SigninSlice";
import BookingDataReducer from "./ReduxSlices/BookingSlice";

export const Store = configureStore({
  reducer: {
    UserData: SigninReducer,
    BookingData: BookingDataReducer,
  },
});
