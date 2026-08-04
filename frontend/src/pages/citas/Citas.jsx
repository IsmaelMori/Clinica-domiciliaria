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

import CitaForm from "./CitaForm";

import {
    obtenerCitas,
    guardarCita,
    actualizarCita,
    eliminarCita
} from "../../services/citaService";
export default function Citas() {

    const [citas, setCitas] = useState([]);

    const [open, setOpen] = useState(false);

    const [citaEditar, setCitaEditar] = useState(null);

    const cargar = async () => {

        try {

            const data = await obtenerCitas();

            console.log(data);

            setCitas(data);

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudieron cargar las citas",
                "error"
            );

        }

    };

    useEffect(() => {

        cargar();

    }, []);    const nuevo = () => {

        setCitaEditar(null);

        setOpen(true);

    };

    const editar = (cita) => {

        setCitaEditar(cita);

        setOpen(true);

    };

    const guardar = async (datos) => {

        try {

            if (citaEditar) {

                await actualizarCita(
                    citaEditar.id,
                    datos
                );

                Swal.fire(
                    "Actualizada",
                    "La cita fue actualizada",
                    "success"
                );

            } else {

                await guardarCita(datos);

                Swal.fire(
                    "Guardada",
                    "La cita fue registrada",
                    "success"
                );

            }

            setOpen(false);

            cargar();

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                error.response?.data?.message ??
                "No se pudo guardar",
                "error"
            );

        }

    };    const eliminar = async (id) => {

        const confirmar = await Swal.fire({

            title: "¿Eliminar cita?",

            text: "Esta acción no se puede deshacer.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Eliminar",

            cancelButtonText: "Cancelar"

        });

        if (!confirmar.isConfirmed) return;

        try {

            await eliminarCita(id);

            Swal.fire(
                "Eliminada",
                "La cita fue eliminada",
                "success"
            );

            cargar();

        } catch (error) {

            console.error(error);

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
            accessorKey: "fecha",
            header: "Fecha"
        },

        {
            accessorKey: "hora",
            header: "Hora"
        },

        {
            accessorKey: "pacienteNombre",
            header: "Paciente"
        },

        {
            accessorFn: (row) =>
                `${row.medicoNombre ?? ""} ${row.medicoApellido ?? ""}`,
            header: "Médico"
        },

        {
            accessorKey: "observaciones",
            header: "Observaciones"
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

    ], []);    return (

        <DashboardLayout>

            <Typography

                variant="h4"

                sx={{

                    mb: 3,

                    fontWeight: "bold"

                }}

            >

                Gestión de Citas

            </Typography>

            <Button

                variant="contained"

                startIcon={<AddIcon />}

                sx={{ mb: 3 }}

                onClick={nuevo}

            >

                Nueva Cita

            </Button>

            <MaterialReactTable

                columns={columnas}

                data={citas}

            />

            <CitaForm

                open={open}

                onClose={() => setOpen(false)}

                onGuardar={guardar}

                cita={citaEditar}

            />

        </DashboardLayout>

    );

}