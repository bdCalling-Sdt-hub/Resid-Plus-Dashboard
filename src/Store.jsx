import { configureStore } from "@reduxjs/toolkit";
import SigninReducer from "./ReduxSlices/SigninSlice";
import UserInformationReducer from "./ReduxSlices/UserInformationSlice";
import HostInformationReducer from "./ReduxSlices/HostInformationSlice";
import ResidenceInformationReducer from "./ReduxSlices/ResidenceInformationSlice";

export const Store = configureStore({
  reducer: {
    UserData: SigninReducer,
    UserInformationData: UserInformationReducer,
    HostInformationData: HostInformationReducer,
    ResidenceInformationData: ResidenceInformationReducer,
  },
});
