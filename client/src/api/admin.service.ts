import api from ".";

const makeDistribution = async () => {
    const response = await api.get(`/admin/distribution/make`);

    return response.data;
};

const addEmail = async (data: any) => {
    const response = await api.post(`/admin/distribution/add`, data);

    return response.data;
};

const getEmails = async () => {
    const response = await api.get(`/admin/distribution/getAll`);

    return response.data;
};

const removeEmail = async (id: number) => {
    const response = await api.delete(`/admin/distribution/remove/${id}`);

    return response.data;
};

export default { makeDistribution, addEmail, getEmails, removeEmail };
