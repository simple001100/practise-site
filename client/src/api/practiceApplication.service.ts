import api from ".";

const create = async (data: any) => {
    const response = await api.post(`/practice-applications/create`, data);

    return response.data;
};

const getPracticiesTypes = async () => {
    const response = await api.get(`/practices/getall`);

    return response.data;
};

export default { create, getPracticiesTypes };
