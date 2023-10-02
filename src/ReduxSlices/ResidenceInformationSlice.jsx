import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  ResidenceInfoList: [],
  pagination: {},
};

let token = localStorage.getItem("token");

export const ResidenceInformationData = createAsyncThunk(
  "ResidenceInfo",
  async (value, thunkAPI) => {
    try {
      let response = await baseAxios.get(
        `/api/residences/dashboard/status?limit=5&page=${value.page}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

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

export const ResidenceInformationSlice = createSlice({
  name: "residenceinfo",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      (state.ResidenceInfoList = []), (state.pagination = {});
    },
  },
  extraReducers: {
    [ResidenceInformationData.pending]: (state, action) => {
      state.Loading = true;
    },
    [ResidenceInformationData.fulfilled]: (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      state.ResidenceInfoList = action.payload.data.attributes.residences;
      state.pagination = action.payload.data.attributes.pagination;
      state.status = action.payload.data.attributes.status;
    },
    [ResidenceInformationData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
      (state.ResidenceInfoList = []), (state.pagination = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = ResidenceInformationSlice.actions;

export default ResidenceInformationSlice.reducer;
