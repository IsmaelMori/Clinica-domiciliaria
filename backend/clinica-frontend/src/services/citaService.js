import api from "./api";

export const obtenerCitas = async () => {

    const response = await api.get("/citas");

    return response.data;

};

export const guardarCita = async (cita) => {

    const response = await api.post("/citas", cita);

    return response.data;

};

export const actualizarCita = async (id, cita) => {

    const response = await api.put(`/citas/${id}`, cita);

    return response.data;

};

export const eliminarCita = async (id) => {

    await api.delete(`/citas/${id}`);

};