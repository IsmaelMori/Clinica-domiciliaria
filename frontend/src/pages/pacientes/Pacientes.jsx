import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PacienteForm from "./PacienteForm";

import {
    Button,
    Typography,
    IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import { MaterialReactTable } from "material-react-table";

import Swal from "sweetalert2";

import {
    obtenerPacientes,
    guardarPaciente,
    actualizarPaciente,
    eliminarPaciente
} from "../../services/pacienteService";

export default function Pacientes() {

    const [pacientes, setPacientes] = useState([]);
    const [open, setOpen] = useState(false);
    const [pacienteEditar, setPacienteEditar] = useState(null);

    const cargar = async () => {

        try {

            const response = await obtenerPacientes();

            console.log(response);

            setPacientes(response?.content ?? []);

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar los pacientes."
            });

        }

    };

    useEffect(() => {

        cargar();

    }, []);

    const nuevo = () => {

        setPacienteEditar(null);

        setOpen(true);

    };

    const editar = (paciente) => {

        setPacienteEditar(paciente);

        setOpen(true);

    };

    const guardar = async (paciente) => {

        try {

            if (pacienteEditar) {

                await actualizarPaciente(
                    pacienteEditar.id,
                    paciente
                );

                await Swal.fire({

                    icon: "success",
                    title: "Actualizado",
                    text: "Paciente actualizado correctamente.",
                    timer: 1500,
                    showConfirmButton: false

                });

            } else {

                await guardarPaciente(paciente);

                await Swal.fire({

                    icon: "success",
                    title: "Registrado",
                    text: "Paciente registrado correctamente.",
                    timer: 1500,
                    showConfirmButton: false

                });

            }

            setOpen(false);

            cargar();

        } catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",
                title: "Error",
                text: "No se pudo guardar el paciente."

            });

        }

    };

    const eliminar = async (id) => {

        const resultado = await Swal.fire({

            title: "¿Eliminar paciente?",

            text: "Esta acción no se puede deshacer.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            confirmButtonText: "Sí, eliminar",

            cancelButtonText: "Cancelar"

        });

        if (!resultado.isConfirmed) return;

        try {

            await eliminarPaciente(id);

            await Swal.fire({

                icon: "success",

                title: "Eliminado",

                text: "Paciente eliminado correctamente.",

                timer: 1500,

                showConfirmButton: false

            });

            cargar();

        } catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "No se pudo eliminar el paciente."

            });

        }

    };

    const columnas = useMemo(() => [

        {
            accessorKey: "id",
            header: "ID"
        },

        {
            accessorKey: "nombre",
            header: "Nombre"
        },

        {
            accessorKey: "apellido",
            header: "Apellido"
        },

        {
            accessorKey: "cedula",
            header: "Cédula"
        },

        {
            accessorKey: "telefono",
            header: "Teléfono"
        },

        {
            accessorKey: "direccion",
            header: "Dirección"
        },

        {
            header: "Acciones",

            Cell: ({ row }) => (

                <>

                    <IconButton
                        color="primary"
                        onClick={() => editar(row.original)}
                    >

                        <EditIcon />

                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() => eliminar(row.original.id)}
                    >

                        <DeleteIcon />

                    </IconButton>

                </>

            )

        }

    ], []);

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                sx={{ mb: 3, fontWeight: "bold" }}
            >

                Gestión de Pacientes

            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mb: 3 }}
                onClick={nuevo}
            >

                Nuevo Paciente

            </Button>

            <MaterialReactTable

                columns={columnas}

                data={pacientes}

                enableColumnFilters

                enableGlobalFilter

                enablePagination

                enableSorting

                enableDensityToggle={false}

                enableFullScreenToggle={false}

                initialState={{

                    pagination: {

                        pageIndex: 0,

                        pageSize: 10

                    }

                }}

            />

            <PacienteForm

                open={open}

                onClose={() => setOpen(false)}

                onGuardar={guardar}

                paciente={pacienteEditar}

            />

        </DashboardLayout>

    );

}