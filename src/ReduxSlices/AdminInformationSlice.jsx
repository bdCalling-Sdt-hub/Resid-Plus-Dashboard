import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  AdminInfoList: [],
  pagination: {},
};

let token = localStorage.getItem("token");

export const AdminInformationData = createAsyncThunk(
  "AdminInfo",
  async (value, thunkAPI) => {
    try {
      let response = await baseAxios.get(
        `/api/users?userType=admin&userAccountStatus=accepted&limit=5&page=${value.page}&search=${value.search}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (
        "You are not authorised to sign in now" === error.response.data.message || "Error authorization" === error.response.data.message
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("yourInfo");
      }
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const AdminInformationSlice = createSlice({
  name: "admininfo",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      (state.AdminInfoList = []), (state.pagination = {});
    },
  },
  extraReducers: {
    [AdminInformationData.pending]: (state, action) => {
      state.Loading = true;
    },
    [AdminInformationData.fulfilled]: (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      state.AdminInfoList = action.payload.data.attributes.users;
      state.pagination = action.payload.data.attributes.pagination;
    },
    [AdminInformationData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
      (state.AdminInfoList = []), (state.pagination = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = AdminInformationSlice.actions;

export default AdminInformationSlice.reducer;
