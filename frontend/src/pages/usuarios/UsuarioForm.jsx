import { useEffect } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem
} from "@mui/material";

import { useForm } from "react-hook-form";

export default function UsuarioForm({

    open,
    onClose,
    onGuardar,
    usuario

}) {

    const {

        register,
        handleSubmit,
        reset,
        formState: { errors }

    } = useForm({

        defaultValues: {

            username: "",
            password: "",
            rol: "ADMIN"

        }

    });

    useEffect(() => {

        if (usuario) {

            reset({

                username: usuario.username,
                password: "",
                rol: usuario.rol

            });

        } else {

            reset({

                username: "",
                password: "",
                rol: "ADMIN"

            });

        }

    }, [usuario, reset]);

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {

                    usuario

                        ? "Editar Usuario"

                        : "Nuevo Usuario"

                }

            </DialogTitle>

            <form onSubmit={handleSubmit(onGuardar)}>

                <DialogContent>

                    <Grid container spacing={2} sx={{ mt: 1 }}>

                        <Grid item xs={12}>

                            <TextField

                                fullWidth

                                label="Usuario"

                                {...register("username", {

                                    required: "Ingrese el usuario"

                                })}

                                error={!!errors.username}

                                helperText={errors.username?.message}

                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField

                                fullWidth

                                type="password"

                                label="Contraseña"

                                helperText={

                                    usuario

                                        ? "Déjelo vacío para conservar la contraseña"

                                        : errors.password?.message

                                }

                                {...register("password", {

                                    required: usuario

                                        ? false

                                        : "Ingrese una contraseña"

                                })}

                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField

                                select

                                fullWidth

                                label="Rol"

                                defaultValue="ADMIN"

                                {...register("rol", {

                                    required: true

                                })}

                            >

                                <MenuItem value="ADMIN">

                                    ADMIN

                                </MenuItem>

                                <MenuItem value="MEDICO">

                                    MEDICO

                                </MenuItem>

                                <MenuItem value="RECEPCIONISTA">

                                    RECEPCIONISTA

                                </MenuItem>

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