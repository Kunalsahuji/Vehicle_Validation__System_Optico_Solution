import API from "./axiosConfig";

const getAdmins = async () => {
  const res = await API.get("/admins");
  return res.data;
};

const getAdmin = async (id) => {
  const res = await API.get(`/admins/${id}`);
  return res.data;
};

const updateAdmin = async (id, payload) => {
  const res = await API.put(`/admins/${id}`, payload);
  return res.data;
};

const deleteAdmin = async (id) => {
  const res = await API.delete(`/admins/${id}`);
  return res.data;
};

// register admin is already in authService.register
export default { getAdmins, getAdmin, updateAdmin, deleteAdmin };
