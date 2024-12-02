import api from ".";

export const getAll = async () => {
    const response = await api.get(`/projects/getAll`);

    return response.data;
};

const getOne = async (id: number) => {
    const response = await api.post(`/prjects/getOne/${id}`);

    return response.data;
};

const update = async (data: number) => {
    const response = await api.patch(`/projects/update`, data);

    return response.data;
};

const create = async (data: number) => {
    const response = await api.post(`/projects/create`, data);

    return response.data;
};

const remove = async (id: number) => {
    const response = await api.post(`/projects/create/${id}`);

    return response.data;
};

export default { getAll, getOne, update, create, remove };
