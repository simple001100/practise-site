import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const errorSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {},
});

export const { setError, setLoading } = errorSlice.actions;
export default errorSlice.reducer;
