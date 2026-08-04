import api from "./api";

// Obtener pacientes paginados
export const obtenerPacientes = async (page = 0, size = 10) => {

    const response = await api.get("/pacientes", {
        params: {
            page,
            size
        }
    });

    return response.data.data;
};

// Obtener un paciente por ID
export const obtenerPaciente = async (id) => {

    const response = await api.get(`/pacientes/${id}`);

    return response.data.data;
};

// Guardar paciente
export const guardarPaciente = async (paciente) => {

    const response = await api.post("/pacientes", paciente);

    return response.data.data;
};

// Actualizar paciente
export const actualizarPaciente = async (id, paciente) => {

    const response = await api.put(`/pacientes/${id}`, paciente);

    return response.data.data;
};

// Eliminar paciente
export const eliminarPaciente = async (id) => {

    const response = await api.delete(`/pacientes/${id}`);

    return response.data;
};