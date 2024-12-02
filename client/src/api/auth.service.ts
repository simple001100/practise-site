import api from ".";

const signup = async (data: any) => {
    const response = await api.post(`/auth/signup`, data);

    return response.data;
};

const signin = async (data: any) => {
    const response = await api.post(`/auth/signin`, data);

    return response.data;
};

const logout = async () => {
    const response = await api.post(`/auth/logout`, {});

    return response.data;
};

const refresh = async () => {
    const response = await api.post(`/auth/refresh`);

    return response.data;
};

export default { signin, logout, refresh, signup };
