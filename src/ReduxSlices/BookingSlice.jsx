import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  data: {},
  pagination: {},
};

let token = localStorage.getItem("token");
// console.log(token)

export const BookingData = createAsyncThunk(
  "BookingData",
  async (value, thunkAPI) => {
    try {
      let response = await baseAxios.get(
        `/api/bookings/?limit=5&page=${value.page}&checkingMonth=${value.search}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {

      // give console status code
      console.log(error.response.status);
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

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      (state.data = {}), (state.pagination = {});
    },
  },
  extraReducers: {
    [BookingData.pending]: (state, action) => {
      state.Loading = true;
    },
    [BookingData.fulfilled]: (state, action) => {
      // console.log("Payload", action.payload.data.attributes?.bookings)
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      (state.bookings = action?.payload?.data?.attributes?.bookings),
        (state.pagination = action.payload.data?.attributes?.pagination);
    },
    [BookingData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
      (state.data = {}), (state.pagination = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = bookingSlice.actions;

export default bookingSlice.reducer;
