import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid
} from "@mui/material";

import {
    LocalizationProvider
} from "@mui/x-date-pickers/LocalizationProvider";

import {
    AdapterDayjs
} from "@mui/x-date-pickers/AdapterDayjs";

import {
    DatePicker
} from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import {
    useForm,
    Controller
} from "react-hook-form";

import { obtenerPacientes } from "../../services/pacienteService";
import { obtenerMedicos } from "../../services/medicoService";

export default function CitaForm({

    open,
    onClose,
    onGuardar,
    cita

}) {

    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);

    const {

    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }

} = useForm({

        defaultValues: {

            fecha: "",
            hora: "",
            observaciones: "",

            paciente: {
                id: ""
            },

            medico: {
                id: ""
            }

        }

    });

    useEffect(() => {

        cargarDatos();

    }, []);

    const cargarDatos = async () => {

        try {

            const pacientesData = await obtenerPacientes();
            setPacientes(pacientesData?.content ?? []);

            const medicosData = await obtenerMedicos();
            setMedicos(medicosData ?? []);

        } catch (error) {

            console.error(error);

            setPacientes([]);
            setMedicos([]);

        }

    };

    useEffect(() => {

        if (cita) {

            reset({

                fecha: cita.fecha ?? "",
                hora: cita.hora ?? "",
                observaciones: cita.observaciones ?? "",

                paciente: {
                    id: cita.pacienteId ?? ""
                },

                medico: {
                    id: cita.medicoId ?? ""
                }

            });

        } else {

            reset({

                fecha: "",
                hora: "",
                observaciones: "",

                paciente: {
                    id: ""
                },

                medico: {
                    id: ""
                }

            });

        }

    }, [cita, reset]);

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                {cita ? "Editar Cita" : "Nueva Cita"}

            </DialogTitle>

            <form onSubmit={handleSubmit(onGuardar)}>

                <DialogContent>

                    <Grid container spacing={2} sx={{ mt: 1 }}>

                        <Grid item xs={12} md={6}>

                            <TextField
                                select
                                fullWidth
                                label="Paciente"
                                defaultValue=""
                                {...register("paciente.id", {
                                    required: "Seleccione un paciente"
                                })}
                                error={!!errors.paciente?.id}
                                helperText={errors.paciente?.id?.message}
                            >

                                {pacientes.map((p) => (

                                    <MenuItem
                                        key={p.id}
                                        value={p.id}
                                    >
                                        {p.nombre} {p.apellido}
                                    </MenuItem>

                                ))}

                            </TextField>

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                select
                                fullWidth
                                label="Médico"
                                defaultValue=""
                                {...register("medico.id", {
                                    required: "Seleccione un médico"
                                })}
                                error={!!errors.medico?.id}
                                helperText={errors.medico?.id?.message}
                            >

                                {medicos.map((m) => (

                                    <MenuItem
                                        key={m.id}
                                        value={m.id}
                                    >
                                        {m.nombre} {m.apellido}
                                    </MenuItem>

                                ))}

                            </TextField>

                        </Grid>

                        <Grid item xs={12} md={6}>

    <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Controller
            name="fecha"
            control={control}
            rules={{
                required: "Seleccione una fecha"
            }}
            render={({ field }) => (

                <DatePicker
                    label="Fecha"
                    disablePast
                    shouldDisableDate={(date) => date.day() === 0}
                    format="YYYY-MM-DD"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(value) => {
                        field.onChange(
                            value ? value.format("YYYY-MM-DD") : ""
                        );
                    }}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            error: !!errors.fecha,
                            helperText: errors.fecha?.message
                        }
                    }}
                />

            )}
        />

    </LocalizationProvider>

</Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                fullWidth
                                type="time"
                                label="Hora"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                {...register("hora", {
                                    required: "Seleccione una hora"
                                })}
                                error={!!errors.hora}
                                helperText={errors.hora?.message}
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Observaciones"
                                {...register("observaciones")}
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