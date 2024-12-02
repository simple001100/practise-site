import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { setError, setLoading } from "../errorSlice/errorSlice";
import adminService from "@/api/admin.service";

type AddEmailBody = {
    email: string;
};

export const makeDistribution = createAsyncThunk(
    "distribution/make",
    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await adminService.makeDistribution();

            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (err: any) {
            thunkApi.dispatch(setError("Рассылка не прошла"));
            return thunkApi.rejectWithValue("Рассылка не прошла");
        }
    }
);

export const addEmail = createAsyncThunk(
    "distribution/addEmail",
    async (data: AddEmailBody, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await adminService.addEmail(data);
            thunkApi.dispatch(getEmails());

            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (err: any) {
            thunkApi.dispatch(setError("Почта не добавилась"));
            return thunkApi.rejectWithValue("Почта не добавилась");
        }
    }
);

export const getEmails = createAsyncThunk(
    "distribution/getAll",
    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await adminService.getEmails();

            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (err: any) {
            thunkApi.dispatch(setError("Почта не добавилась"));
            return thunkApi.rejectWithValue("Почта не добавилась");
        }
    }
);

export const removeEmail = createAsyncThunk(
    "distribution/removeEmail",
    async (data: { id: number }, thunkApi) => {
        try {
            const { id } = data;
            thunkApi.dispatch(setLoading(true));
            const response = await adminService.removeEmail(id);

            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (err: any) {
            thunkApi.dispatch(setError("Почта не добавилась"));
            return thunkApi.rejectWithValue("Почта не добавилась");
        }
    }
);

const adminSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [getEmails.fulfilled.type]: (state, action) => {
            state.emails = action.payload;
        },
        [removeEmail.fulfilled.type]: (state, action) => {
            const { id } = action.payload;
            const filterArray = state.emails.filter((el) => el.id !== id);

            state.emails = filterArray;
        },

    },
});

export default adminSlice.reducer;
