import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectApplicationService from "@/api/projectApplication.service";
import { initialState } from "./state";
import { setError, setLoading } from "../errorSlice/errorSlice";

type ProjectApplicationBody = {
    companyId: number;
    name: string;
    description: string;
    endDate: Date;
};

export const createProjectApplication = createAsyncThunk(
    "project-applications/create",
    async (data: ProjectApplicationBody, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await projectApplicationService.create(data);
            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (e) {
            thunkApi.dispatch(setError("Не удалось отправить заявку"));
            return thunkApi.rejectWithValue("Не удалось отправить заявку");
        }
    }
);

const projectApplicationSlice = createSlice({
    name: "projectApplication",
    initialState,
    reducers: {},
    extraReducers: {
        [createProjectApplication.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = "";
        },
        [createProjectApplication.pending.type]: (state) => {
            state.isLoading = true;
        },
        [createProjectApplication.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default projectApplicationSlice.reducer;
