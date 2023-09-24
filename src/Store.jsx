import { configureStore } from "@reduxjs/toolkit";
import SigninReducer from "./ReduxSlices/SigninSlice";
import UserInformationReducer from "./ReduxSlices/UserInformationSlice";

export const Store = configureStore({
  reducer: {
    UserData: SigninReducer,
    UserInformationData: UserInformationReducer,
  },
});
