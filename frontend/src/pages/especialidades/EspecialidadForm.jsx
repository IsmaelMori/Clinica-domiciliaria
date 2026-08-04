import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from "@mui/material";

export default function EspecialidadForm({

    open,
    onClose,
    onGuardar,
    especialidad

}) {

    const [nombre, setNombre] = useState("");

    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {

        if (especialidad) {

            setNombre(especialidad.nombre);

            setDescripcion(especialidad.descripcion);

        } else {

            setNombre("");

            setDescripcion("");

        }

    }, [especialidad]);

    const guardar = () => {

    const datos = {

        nombre,
        descripcion,
        activo: true

    };

    console.log("Enviando:", datos);

    onGuardar(datos);

};

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {

                    especialidad

                        ? "Editar Especialidad"

                        : "Nueva Especialidad"

                }

            </DialogTitle>

            <DialogContent>

                <TextField

                    fullWidth

                    label="Nombre"

                    margin="normal"

                    value={nombre}

                    onChange={(e) => setNombre(e.target.value)}

                />

                <TextField

                    fullWidth

                    label="Descripción"

                    margin="normal"

                    multiline

                    rows={4}

                    value={descripcion}

                    onChange={(e) => setDescripcion(e.target.value)}

                />

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancelar

                </Button>

                <Button
                    variant="contained"
                    onClick={guardar}
                >

                    Guardar

                </Button>

            </DialogActions>

        </Dialog>

    );

}