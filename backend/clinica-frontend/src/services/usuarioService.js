import api from "./api";

export const obtenerUsuarios = async () => {

    const response = await api.get("/usuarios");

    return response.data;

};

export const guardarUsuario = async (usuario) => {

    const response = await api.post("/usuarios", usuario);

    return response.data;

};

export const actualizarUsuario = async (id, usuario) => {

    const response = await api.put(`/usuarios/${id}`, usuario);

    return response.data;

};

export const eliminarUsuario = async (id) => {

    await api.delete(`/usuarios/${id}`);

};