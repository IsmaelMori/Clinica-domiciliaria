import api from "./api";

const obtenerResumen = async () => {

    const response = await api.get("/dashboard");

    return response.data;

};

export default {

    obtenerResumen

};