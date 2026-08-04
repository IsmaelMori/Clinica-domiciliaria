import api from "./api";


export const obtenerEspecialidades = async () => {

    const response = await api.get("/especialidades?page=0&size=100");

    return response.data.data;

};



export const guardarEspecialidad = async (especialidad) => {

    const response = await api.post(
        "/especialidades",
        especialidad
    );

    return response.data.data;

};



export const actualizarEspecialidad = async (id, especialidad) => {

    const response = await api.put(
        `/especialidades/${id}`,
        especialidad
    );

    return response.data.data;

};



export const eliminarEspecialidad = async (id) => {

    await api.delete(`/especialidades/${id}`);

};