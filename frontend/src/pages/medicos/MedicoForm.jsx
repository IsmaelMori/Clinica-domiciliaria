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

import { useForm } from "react-hook-form";

import { obtenerEspecialidades } from "../../services/especialidadService";

export default function MedicoForm({

    open,
    onClose,
    onGuardar,
    medico

}) {

    const [especialidades, setEspecialidades] = useState([]);

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
            correo: "",
            especialidad: {

                id: ""

            }

        }

    });

    useEffect(() => {

        cargarEspecialidades();

    }, []);

    const cargarEspecialidades = async () => {

    try {

        const data = await obtenerEspecialidades();

        console.log("Especialidades:", data);

        if (Array.isArray(data)) {

            setEspecialidades(data);

        } else if (Array.isArray(data.content)) {

            setEspecialidades(data.content);

        } else {

            setEspecialidades([]);

        }

    } catch (e) {

        console.error(e);

        setEspecialidades([]);

    }

};

    useEffect(() => {

        if (medico) {

            reset({

                nombre: medico.nombre,

                apellido: medico.apellido,

                cedula: medico.cedula,

                telefono: medico.telefono,

                correo: medico.correo,

                especialidad: {

                    id: medico.especialidadId

                }

            });

        } else {

            reset({

                nombre: "",

                apellido: "",

                cedula: "",

                telefono: "",

                correo: "",

                especialidad: {

                    id: ""

                }

            });

        }

    }, [medico]);

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                {medico ? "Editar Médico" : "Nuevo Médico"}

            </DialogTitle>

            <form onSubmit={handleSubmit(onGuardar)}>

                <DialogContent>

                    <Grid container spacing={2}>

                        <Grid item xs={6}>

                            <TextField

                                label="Nombre"

                                fullWidth

                                {...register("nombre", {

                                    required: true

                                })}

                                error={!!errors.nombre}

                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField

                                label="Apellido"

                                fullWidth

                                {...register("apellido", {

                                    required: true

                                })}

                                error={!!errors.apellido}

                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField

                                label="Cédula"

                                fullWidth

                                {...register("cedula", {

                                    required: true

                                })}

                                error={!!errors.cedula}

                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField

                                label="Teléfono"

                                fullWidth

                                {...register("telefono", {

                                    required: true

                                })}

                                error={!!errors.telefono}

                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField

                                label="Correo"

                                fullWidth

                                {...register("correo", {

                                    required: true

                                })}

                                error={!!errors.correo}

                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField

                                select

                                label="Especialidad"

                                fullWidth

                                defaultValue=""

                                {...register("especialidad.id", {

                                    required: true

                                })}

                            >

                                {

                                    (Array.isArray(especialidades) ? especialidades : []).map((e) => (

                                        <MenuItem

                                            key={e.id}

                                            value={e.id}

                                        >

                                            {e.nombre}

                                        </MenuItem>

                                    ))

                                }

                            </TextField>

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