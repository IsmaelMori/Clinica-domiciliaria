import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

import {
    Box,
    Paper,
    TextField,
    Typography,
    Button,
    Alert
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            navigate("/dashboard", { replace: true });

        }

    }, [navigate]);

    const iniciarSesion = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const data = await authService.login(username, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", data.username);
            localStorage.setItem("rol", data.rol);

            navigate("/dashboard", { replace: true });

        } catch (err) {

            setError("Usuario o contraseña incorrectos");

        }

    };

    return (

        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg,#ffffff,#dbeafe,#bfdbfe,#93c5fd)",
                overflow: "hidden",
                position: "relative"
            }}
        >

            <Box
                sx={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "#60A5FA",
                    filter: "blur(180px)",
                    top: -100,
                    left: -100
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: 450,
                    height: 450,
                    borderRadius: "50%",
                    background: "#2563EB",
                    filter: "blur(160px)",
                    bottom: -100,
                    right: -100
                }}
            />

            <Paper
                elevation={0}
                sx={{
                    width: 420,
                    p: 5,
                    borderRadius: 6,
                    backdropFilter: "blur(25px)",
                    background: "rgba(255,255,255,.35)",
                    border: "1px solid rgba(255,255,255,.5)",
                    boxShadow: "0 25px 45px rgba(0,0,0,.15)"
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2
                    }}
                >

                    <LocalHospitalIcon
                        sx={{
                            fontSize: 70,
                            color: "#2563EB"
                        }}
                    />

                </Box>

                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                >

                    Clínica Médica

                </Typography>

                <Typography
                    align="center"
                    color="text.secondary"
                    mb={4}
                >

                    Sistema de Gestión

                </Typography>

                {error && (

                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>

                )}

                <form onSubmit={iniciarSesion}>

                    <TextField
                        fullWidth
                        label="Usuario"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 4,
                            height: 55,
                            borderRadius: 3,
                            fontSize: 17,
                            fontWeight: 600,
                            textTransform: "none",
                            background:
                                "linear-gradient(90deg,#2563EB,#3B82F6)",
                            boxShadow:
                                "0 10px 25px rgba(37,99,235,.35)",
                            transition: ".3s",

                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow:
                                    "0 18px 35px rgba(37,99,235,.45)",
                                background:
                                    "linear-gradient(90deg,#1D4ED8,#2563EB)"
                            }
                        }}
                    >

                        Iniciar Sesión

                    </Button>

                </form>

            </Paper>

        </Box>

    );

}