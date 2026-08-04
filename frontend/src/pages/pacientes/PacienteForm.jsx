import { useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid
} from "@mui/material";

import { useForm } from "react-hook-form";

export default function PacienteForm({

    open,
    onClose,
    onGuardar,
    paciente

}) {

    const {

        register,
        handleSubmit,
        reset,
        formState: { errors }

    } = useForm({

        defaultValues: {

            nombre: "",
            apellido: "",
            cedula: "",
            telefono: "",
            direccion: ""

        }

    });

    useEffect(() => {

        if (paciente) {

            reset(paciente);

        } else {

            reset({

                nombre: "",
                apellido: "",
                cedula: "",
                telefono: "",
                direccion: ""

            });

        }

    }, [paciente, reset]);

    const guardar = (data) => {

        onGuardar(data);

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>

                {paciente ? "Editar Paciente" : "Nuevo Paciente"}

            </DialogTitle>

            <form onSubmit={handleSubmit(guardar)}>

                <DialogContent>

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={6}>

                            <TextField
                                label="Nombre"
                                fullWidth
                                {...register("nombre", {
                                    required: "Ingrese el nombre"
                                })}
                                error={!!errors.nombre}
                                helperText={errors.nombre?.message}
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                label="Apellido"
                                fullWidth
                                {...register("apellido", {
                                    required: "Ingrese el apellido"
                                })}
                                error={!!errors.apellido}
                                helperText={errors.apellido?.message}
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                label="Cédula"
                                fullWidth
                                {...register("cedula", {
                                    required: "Ingrese la cédula",
                                    minLength: {
                                        value: 10,
                                        message: "Debe tener 10 dígitos"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Debe tener 10 dígitos"
                                    }
                                })}
                                error={!!errors.cedula}
                                helperText={errors.cedula?.message}
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                label="Teléfono"
                                fullWidth
                                {...register("telefono", {
                                    required: "Ingrese el teléfono"
                                })}
                                error={!!errors.telefono}
                                helperText={errors.telefono?.message}
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField
                                label="Dirección"
                                fullWidth
                                {...register("direccion", {
                                    required: "Ingrese la dirección"
                                })}
                                error={!!errors.direccion}
                                helperText={errors.direccion?.message}
                            />

                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>

                    <Button onClick={onClose}>

                        Cancelar

                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                    >

                        Guardar

                    </Button>

                </DialogActions>

            </form>

        </Dialog>

    );

}