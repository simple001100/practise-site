import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import authService from "@/api/auth.service";
import Cookies from "js-cookie";
import { setError, setLoading } from "../errorSlice/errorSlice";

type RegisterData = {
    email: string;
    password: string;
    responsiblePerson: string;
    name: string;
    phone: string;
    address: string;
};

type LoginData = {
    email: string;
    password: string;
};

export const signup = createAsyncThunk(
    "auth/register",
    async (data: RegisterData, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await authService.signup(data);
            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (e) {
            thunkApi.dispatch(setError("Зарегистрироваться не удалось!"));
            return thunkApi.rejectWithValue("Зарегистрироваться не удалось!");
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data: LoginData, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading(true));
            const response = await authService.signin(data);
            thunkApi.dispatch(setLoading(false));

            return response;
        } catch (e) {
            thunkApi.dispatch(unAuthorize());
            thunkApi.dispatch(setError("Неверный логин или пароль"));
            return thunkApi.rejectWithValue("Неверный логин или пароль");
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
    try {
        thunkApi.dispatch(setLoading(true));
        const response = await authService.logout();
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        thunkApi.dispatch(unAuthorize());
        thunkApi.dispatch(setLoading(false));
        return response;
    } catch (e) {
        thunkApi.dispatch(setError("Неверный логин или пароль"));
        return thunkApi.rejectWithValue("Ошибка!");
    }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkApi) => {
    try {
        thunkApi.dispatch(setLoading(true));
        const response = await authService.refresh();

        if (!response.email) throw new Error();
        thunkApi.dispatch(setLoading(false));

        return response;
    } catch (e) {
        thunkApi.dispatch(unAuthorize());
        thunkApi.dispatch(setError("Неверный логин или пароль"));
        return thunkApi.rejectWithValue("Не удалось войти в учётную запись!(");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        unAuthorize(state) {
            state.isAuth = false;
        },
    },
    extraReducers: {
        [signup.fulfilled.type]: (state, action) => {
            state.isAuth = true;
            const { email, responsiblePerson, name, phone, address, id } =
                action;
            state.role = '';
            state.id = id;
            state.responsiblePerson = responsiblePerson;
            state.email = email;
            state.name = name;
            state.phone = phone;
            state.address = address;
        },
        [signup.pending.type]: (state) => {},
        [signup.rejected.type]: (state, action) => {},
        [login.fulfilled.type]: (state, action) => {
            state.isAuth = true;
            const { email, role, responsiblePerson, name, phone, address, id } =
                action.payload;
            state.role = role;
            state.id = id;
            state.responsiblePerson = responsiblePerson;
            state.email = email;
            state.name = name;
            state.phone = phone;
            state.address = address;
        },
        [login.pending.type]: (state) => {},
        [login.rejected.type]: (state, action) => {
            state.isAuth = false;
            state.role = "";
        },
        [logout.fulfilled.type]: (state, action) => {
            state.isAuth = false;
            state.role = "";
        },
        [logout.pending.type]: (state) => {},
        [logout.rejected.type]: (state, action) => {},
        [refresh.fulfilled.type]: (state, action) => {
            state.isAuth = true;
            const { email, role, responsiblePerson, name, phone, address, id } =
                action.payload;
            state.role = role;
            state.id = id;
            state.responsiblePerson = responsiblePerson;
            state.email = email;
            state.name = name;
            state.phone = phone;
            state.address = address;
        },
        [refresh.pending.type]: (state) => {},
        [refresh.rejected.type]: (state, action) => {
            state.isAuth = false;
            state.role = "";
        },
    },
});

export const { unAuthorize } = authSlice.actions;
export default authSlice.reducer;
