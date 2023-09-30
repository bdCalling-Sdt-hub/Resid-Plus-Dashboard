import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import baseAxios from '../../Config';

const initialState = {
    Error: false,
    Success: false,
    Loading: false,
    data: {}
}

let token = localStorage.getItem("token");

export const DashboardHomeData = createAsyncThunk(
    "DashboardData",
    async (value, thunkAPI) => {
        try {
            let response = await baseAxios.get(
                `/api/bookings/dashboard/ratio`,
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

export const dashboardHomeSlice = createSlice({

    name: "dashboardHome",
    initialState,
    reducers: {
        reset: (state) => {
            state.Loading = false;
            state.Success = false;
            state.Error = false;
            (state.data = {})
        },
    },
    extraReducers: {
        [DashboardHomeData.pending]: (state, action) => {
            state.Loading = true;
        },
        [DashboardHomeData.fulfilled]: (state, action) => {
            state.Loading = false;
            state.Success = true;
            state.Error = false;
            (state.bookings = action?.payload?.data?.attributes)
        },
        [DashboardHomeData.rejected]: (state, action) => {
            state.Loading = false;
            state.Success = false;
            state.Error = true;
            (state.data = {})
        },
    },
})

// Action creators are generated for each case reducer function
export const { reset } = dashboardHomeSlice.actions

export default dashboardHomeSlice.reducer