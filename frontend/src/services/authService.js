import API from "./axiosConfig";

const login = async ({ mobile, password, role }) => {
    const res = await API.post("/auth/login", { mobile, password, role });
    // response contains token and user info
    localStorage.setItem("vvs_user", JSON.stringify(res.data));
    return res.data;
};

const register = async (payload) => {
    // this endpoint required superadmin token; used from admin panel
    const res = await API.post("/auth/register", payload);
    return res.data;
};

const logout = () => {
    localStorage.removeItem("vvs_user");
};

export default { login, register, logout };
