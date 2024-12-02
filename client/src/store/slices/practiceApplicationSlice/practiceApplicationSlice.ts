import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import practiceApplication from "@/api/practiceApplication.service";
import { initialState } from "./state";
import { setError, setLoading } from "../errorSlice/errorSlice";

type PracticeApplicationBody = {
    count: number;
    companyId: number;
    practiceId: number;
};

export const getPracticiesTypes = createAsyncThunk(
    "practice-applications/getPracticiesTypes",
    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await practiceApplication.getPracticiesTypes();
            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (e) {
            thunkApi.dispatch(setError("Не удалось получить практики"));
            return thunkApi.rejectWithValue("Не удалось получить практики");
        }
    }
);

export const createPracticeApplication = createAsyncThunk(
    "practice-applications/create",
    async (data: PracticeApplicationBody, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await practiceApplication.create(data);
            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (e) {
            thunkApi.dispatch(setError("Не удалось отправить приглашение"));
            return thunkApi.rejectWithValue("Не удалось отправить приглашение");
        }
    }
);

const practiceApplicationSlice = createSlice({
    name: "practiceApplicationSlice",
    initialState,
    reducers: {},
    extraReducers: {
        [getPracticiesTypes.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = "";
            state.practicies = action.payload;
        },
        [getPracticiesTypes.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getPracticiesTypes.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [createPracticeApplication.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = "";
        },
        [createPracticeApplication.pending.type]: (state) => {
            state.isLoading = true;
        },
        [createPracticeApplication.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default practiceApplicationSlice.reducer;
