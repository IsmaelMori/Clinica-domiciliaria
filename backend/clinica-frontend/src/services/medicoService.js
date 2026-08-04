import api from "./api";

export const obtenerMedicos = async () => {

    const response = await api.get("/medicos");

    return response.data;

};

export const obtenerMedico = async (id) => {

    const response = await api.get(`/medicos/${id}`);

    return response.data;

};

export const guardarMedico = async (medico) => {

    const response = await api.post("/medicos", medico);

    return response.data;

};

export const actualizarMedico = async (id, medico) => {

    const response = await api.put(`/medicos/${id}`, medico);

    return response.data;

};

export const eliminarMedico = async (id) => {

    await api.delete(`/medicos/${id}`);

};