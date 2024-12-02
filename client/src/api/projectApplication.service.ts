import api from ".";

const create = async (data: any) => {
    const response = await api.post(`/project-applications/create`, data);

    return response.data;
};

export default { create };
