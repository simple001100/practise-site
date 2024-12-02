import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectsService from "@/api/projects.service";
import { initialState } from "./state";
import { setError, setLoading } from "../errorSlice/errorSlice";

export const getProjects = createAsyncThunk(
    "games/getAllGames",
    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await projectsService.getAll();
            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (e) {
            thunkApi.dispatch(setError("Не удалось загрузить продукты"));
            return thunkApi.rejectWithValue("Не удалось загрузить продукты");
        }
    }
);

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: {
        [getProjects.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = "";
            state.projects = action.payload;
        },
        [getProjects.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getProjects.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default projectsSlice.reducer;
