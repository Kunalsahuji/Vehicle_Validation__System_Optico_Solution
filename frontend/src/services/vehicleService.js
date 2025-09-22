import API from "./axiosConfig";

const getAll = async () => {
    const res = await API.get("/vehicles");
    return res.data;
};

const getById = async (id) => {
    const res = await API.get(`/vehicles/${id}`);
    return res.data;
};

const create = async (payload) => {
    const res = await API.post("/vehicles", payload);
    return res.data;
};

const update = async (id, payload) => {
    const res = await API.put(`/vehicles/${id}`, payload);
    return res.data;
};

const remove = async (id) => {
    const res = await API.delete(`/vehicles/${id}`);
    return res.data;
};

const search = async (query) => {
    const res = await API.get(`/vehicles/search?query=${encodeURIComponent(query)}`);
    return res.data;
};

export default { getAll, getById, create, update, remove, search };

