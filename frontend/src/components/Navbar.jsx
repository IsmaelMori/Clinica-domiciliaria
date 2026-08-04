import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    Chip
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useEffect, useState } from "react";

export default function Navbar() {

    const usuario = localStorage.getItem("usuario") || "Administrador";
    const rol = localStorage.getItem("rol") || "ROLE_ADMIN";

    const [hora, setHora] = useState(new Date());

    useEffect(() => {

        const intervalo = setInterval(() => {

            setHora(new Date());

        }, 1000);

        return () => clearInterval(intervalo);

    }, []);

    return (

        <AppBar

            position="fixed"

            elevation={0}

            sx={{

                ml: "280px",

                width: "calc(100% - 280px)",

                background: "rgba(255,255,255,.65)",

                backdropFilter: "blur(20px)",

                borderBottom: "1px solid rgba(255,255,255,.35)",

                color: "#0F172A"

            }}

        >

            <Toolbar>

                <Box sx={{ flexGrow: 1 }}>

                    <Typography

                        variant="h5"

                        fontWeight="700"

                    >

                        Sistema de Gestión Clínica

                    </Typography>

                    <Typography color="text.secondary">

                        Bienvenido, {usuario}

                    </Typography>

                </Box>

                <Chip

                    icon={<AccessTimeIcon />}

                    label={hora.toLocaleString()}

                    sx={{

                        mr: 3,

                        bgcolor: "#EFF6FF",

                        color: "#2563EB",

                        fontWeight: 600

                    }}

                />

                <Avatar

                    sx={{

                        bgcolor: "#2563EB",

                        width: 45,

                        height: 45,

                        fontWeight: "bold",

                        mr: 2

                    }}

                >

                    {usuario.charAt(0).toUpperCase()}

                </Avatar>

                <Box>

                    <Typography fontWeight="bold">

                        {usuario}

                    </Typography>

                    <Typography

                        fontSize={12}

                        color="text.secondary"

                    >

                        {rol}

                    </Typography>

                </Box>

            </Toolbar>

        </AppBar>

    );

}