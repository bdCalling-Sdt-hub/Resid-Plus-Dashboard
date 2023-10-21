import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseAxios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  AllNotifications: [],
  pagination: {},
};

let token = localStorage.getItem("token");

export const NotificationsData = createAsyncThunk(
  "notificationsData",
  async (value, thunkAPI) => {
    try {
      console.log("slice page", value);
      let response = await baseAxios.get(
        `/api/notifications?limit=5&page=${value?.page}`,
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
        "You are not authorised to sign in now" === error.response.data.message
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

export const NotificationsSlice = createSlice({
  name: "notificationsdata",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      (state.AllNotifications = []), (state.pagination = {});
    },
  },
  extraReducers: {
    [NotificationsData.pending]: (state, action) => {
      state.Loading = true;
    },
    [NotificationsData.fulfilled]: (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      state.AllNotifications = action.payload.data.attributes;
      //   console.log(state.AllNotifications);
      state.pagination = action.payload.data.attributes.pagination;
    },
    [NotificationsData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
      (state.AllNotifications = []), (state.pagination = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
