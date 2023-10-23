import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  HostInfoList: [],
  pagination: {},
};

let token = localStorage.getItem("token");

export const HostInformationData = createAsyncThunk(
  "HostInfo",
  async (value, thunkAPI) => {
    try {
      let response = await baseAxios.get(
        `/api/users?userType=host&limit=5&page=${value.page}&search=${value.search}&requestType=accepted`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);
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

export const HostInformationSlice = createSlice({
  name: "hostinfo",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      (state.HostInfoList = []), (state.pagination = {});
    },
  },
  extraReducers: {
    [HostInformationData.pending]: (state, action) => {
      state.Loading = true;
    },
    [HostInformationData.fulfilled]: (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      state.HostInfoList = action.payload.data.attributes.users;
      state.pagination = action.payload.data.attributes.pagination;
    },
    [HostInformationData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
      (state.HostInfoList = []), (state.pagination = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = HostInformationSlice.actions;

export default HostInformationSlice.reducer;
