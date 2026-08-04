import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    Typography,
    Button,
    IconButton
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { MaterialReactTable } from "material-react-table";

import Swal from "sweetalert2";

import EspecialidadForm from "./EspecialidadForm";

import {

    obtenerEspecialidades,
    guardarEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad

} from "../../services/especialidadService";

export default function Especialidades() {

    const [especialidades, setEspecialidades] = useState([]);

    const [open, setOpen] = useState(false);

    const [especialidadEditar, setEspecialidadEditar] = useState(null);

    const cargar = async () => {

        try {

            const data = await obtenerEspecialidades();

            console.log(data);

            setEspecialidades(data.content ?? []);

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudieron cargar las especialidades",
                "error"
            );

        }

    };

    useEffect(() => {

        cargar();

    }, []);

    const nuevo = () => {

        setEspecialidadEditar(null);

        setOpen(true);

    };

    const editar = (especialidad) => {

        setEspecialidadEditar(especialidad);

        setOpen(true);

    };

    const guardar = async (datos) => {

    try {

        console.log("Datos enviados:", datos);

        if (especialidadEditar) {

            await actualizarEspecialidad(
                especialidadEditar.id,
                datos
            );

            Swal.fire(
                "Actualizado",
                "Especialidad actualizada correctamente",
                "success"
            );

        } else {

            await guardarEspecialidad(datos);

            Swal.fire(
                "Guardado",
                "Especialidad registrada correctamente",
                "success"
            );

        }

        setOpen(false);

        cargar();

    } catch (error) {

        console.error(error);

        console.log(error.response);

        console.log(error.response?.data);

        Swal.fire(
            "Error",
            error.response?.data?.message || "No se pudo guardar",
            "error"
        );

    }

};

    const eliminar = async (id) => {

        const confirmar = await Swal.fire({

            title: "¿Eliminar especialidad?",

            text: "Esta acción no se puede deshacer",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Eliminar",

            cancelButtonText: "Cancelar"

        });

        if (!confirmar.isConfirmed) return;

        try {

            await eliminarEspecialidad(id);

            Swal.fire(
                "Eliminada",
                "Especialidad eliminada correctamente",
                "success"
            );

            cargar();

        } catch (error) {

            Swal.fire(
                "Error",
                "No se pudo eliminar",
                "error"
            );

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
            accessorKey: "descripcion",
            header: "Descripción"
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
                sx={{
                    mb: 3,
                    fontWeight: "bold"
                }}
            >

                Especialidades

            </Typography>

            <Button

                variant="contained"

                startIcon={<AddIcon />}

                sx={{
                    mb: 3
                }}

                onClick={nuevo}

            >

                Nueva Especialidad

            </Button>

            <MaterialReactTable

                columns={columnas}

                data={especialidades}

            />

            <EspecialidadForm

                open={open}

                onClose={() => setOpen(false)}

                onGuardar={guardar}

                especialidad={especialidadEditar}

            />

        </DashboardLayout>

    );

}