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
      let response = await baseAxios.get(`/api/notifications`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
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
      state.pagination = action.payload.data;
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
