import api from "../api/axios";

const login = async (username, password) => {

    const response = await api.post("/auth/login", {
        username,
        password
    });

    return response.data;
};

export default {
    login
};