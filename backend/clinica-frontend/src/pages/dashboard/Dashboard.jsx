import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    Grid,
    Paper,
    Typography,
    Box
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from "@mui/icons-material/Person";

import dashboardService from "../../services/dashboardService";

function Card({ titulo, cantidad, icono, color }) {

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 5,
                height: 160,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#fff",
                border: "1px solid #E5E7EB",
                transition: ".30s",
                boxShadow: "0 8px 25px rgba(0,0,0,.05)",

                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px rgba(37,99,235,.18)"
                }
            }}
        >

            <Box>

                <Typography
                    color="text.secondary"
                    fontSize={15}
                >
                    {titulo}
                </Typography>

                <Typography
                    fontWeight="bold"
                    fontSize={42}
                >
                    {cantidad}
                </Typography>

            </Box>

            <Box

                sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "22px",
                    background: color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff"
                }}

            >

                {icono}

            </Box>

        </Paper>

    );

}

export default function Dashboard() {

    const [datos, setDatos] = useState({

        usuarios: 0,
        pacientes: 0,
        medicos: 0,
        especialidades: 0,
        citas: 0

    });

    useEffect(() => {

        cargarDashboard();

    }, []);

    const cargarDashboard = async () => {

        try {

            const data = await dashboardService.obtenerResumen();

            setDatos(data);

        } catch (e) {

            console.log(e);

        }

    };

    const usuario = localStorage.getItem("usuario");

    return (

        <DashboardLayout>

            <Paper

                elevation={0}

                sx={{

                    mb: 5,
                    p: 4,
                    borderRadius: 5,
                    background:
                        "linear-gradient(135deg,#2563EB,#1E40AF)",
                    color: "#fff"

                }}

            >

                <Typography
                    fontSize={36}
                    fontWeight="bold"
                >

                    Bienvenido, {usuario} 👋

                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        opacity: .9
                    }}
                >

                    Sistema Integral de Gestión Clínica

                </Typography>

            </Paper>

            <Grid container spacing={3}>

                <Grid item xs={12} md={6} lg={4}>

                    <Card

                        titulo="Usuarios"

                        cantidad={datos.usuarios}

                        color="#2563EB"

                        icono={<PersonIcon sx={{ fontSize: 35 }} />}

                    />

                </Grid>

                <Grid item xs={12} md={6} lg={4}>

                    <Card

                        titulo="Pacientes"

                        cantidad={datos.pacientes}

                        color="#0EA5E9"

                        icono={<PeopleIcon sx={{ fontSize: 35 }} />}

                    />

                </Grid>

                <Grid item xs={12} md={6} lg={4}>

                    <Card

                        titulo="Médicos"

                        cantidad={datos.medicos}

                        color="#14B8A6"

                        icono={<LocalHospitalIcon sx={{ fontSize: 35 }} />}

                    />

                </Grid>

                <Grid item xs={12} md={6} lg={6}>

                    <Card

                        titulo="Especialidades"

                        cantidad={datos.especialidades}

                        color="#7C3AED"

                        icono={<MedicalServicesIcon sx={{ fontSize: 35 }} />}

                    />

                </Grid>

                <Grid item xs={12} md={6} lg={6}>

                    <Card

                        titulo="Citas"

                        cantidad={datos.citas}

                        color="#F59E0B"

                        icono={<EventIcon sx={{ fontSize: 35 }} />}

                    />

                </Grid>

            </Grid>

        </DashboardLayout>

    );

}