import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
    Typography,
    Box
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 280;

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const usuario = localStorage.getItem("usuario") || "Administrador";
    const rol = localStorage.getItem("rol") || "ROLE_ADMIN";

    const cerrarSesion = () => {
        localStorage.clear();
        navigate("/login");
    };

    const menu = [
        {
            texto: "Dashboard",
            icono: <DashboardIcon />,
            ruta: "/"
        },
        {
            texto: "Pacientes",
            icono: <PeopleIcon />,
            ruta: "/pacientes"
        },
        {
            texto: "Médicos",
            icono: <LocalHospitalIcon />,
            ruta: "/medicos"
        },
        {
            texto: "Especialidades",
            icono: <MedicalServicesIcon />,
            ruta: "/especialidades"
        },
        {
            texto: "Citas",
            icono: <EventIcon />,
            ruta: "/citas"
        },
        {
            texto: "Usuarios",
            icono: <PersonIcon />,
            ruta: "/usuarios"
        }
    ];

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: drawerWidth,

                    border: "none",

                    boxSizing: "border-box",

                    overflow: "hidden",

                    background:
                        "linear-gradient(180deg,#07152D 0%,#123B8F 55%,#2563EB 100%)",

                    color: "#fff",

                    display: "flex",

                    flexDirection: "column"

                }

            }}
        >

            {/* CABECERA */}

            <Box
                sx={{
                    pt: 5,
                    pb: 4,
                    px: 2,
                    textAlign: "center"
                }}
            >

                <Avatar
                    sx={{
                        width: 85,
                        height: 85,
                        mx: "auto",
                        mb: 2,
                        bgcolor: "#fff",
                        color: "#2563EB",
                        fontWeight: "bold",
                        fontSize: 34,
                        boxShadow: "0 15px 40px rgba(255,255,255,.25)"
                    }}
                >
                    {usuario.charAt(0).toUpperCase()}
                </Avatar>

                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: 22
                    }}
                >
                    Clínica Médica
                </Typography>

                <Typography
                    sx={{
                        fontSize: 13,
                        opacity: .75,
                        mt: .5
                    }}
                >
                    Sistema de Gestión
                </Typography>

            </Box>

            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,.15)"
                }}
            />

            {/* MENÚ */}

            <List
                sx={{
                    px: 2,
                    mt: 2
                }}
            >

                {menu.map((item) => (

                    <ListItemButton

                        key={item.texto}

                        onClick={() => navigate(item.ruta)}

                        selected={location.pathname === item.ruta}

                        sx={{

                            mb: 1,

                            borderRadius: 4,

                            py: 1.4,

                            transition: ".3s",

                            "&.Mui-selected": {

                                background:
                                    "rgba(255,255,255,.18)",

                                backdropFilter: "blur(20px)",

                                boxShadow:
                                    "0 8px 25px rgba(0,0,0,.18)",

                                "&::before": {

                                    content: '""',

                                    position: "absolute",

                                    left: 0,

                                    width: 5,

                                    height: "70%",

                                    borderRadius: "0 10px 10px 0",

                                    background: "#8FD3FF"

                                }

                            },

                            "&:hover": {

                                background:
                                    "rgba(255,255,255,.10)"

                            }

                        }}

                    >

                        <ListItemIcon
                            sx={{
                                color:
                                    location.pathname === item.ruta
                                        ? "#A5D8FF"
                                        : "#fff",
                                minWidth: 42
                            }}
                        >
                            {item.icono}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.texto}
                            primaryTypographyProps={{
                                fontWeight:
                                    location.pathname === item.ruta
                                        ? 700
                                        : 500
                            }}
                        />

                    </ListItemButton>

                ))}

            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,.15)"
                }}
            />

            {/* USUARIO */}

            <Box sx={{ p: 3 }}>

                <Typography
                    sx={{
                        fontWeight: 700
                    }}
                >
                    {usuario}
                </Typography>

                <Typography
                    sx={{
                        opacity: .7,
                        fontSize: 13,
                        mb: 2
                    }}
                >
                    {rol}
                </Typography>

                <ListItemButton

                    onClick={cerrarSesion}

                    sx={{

                        borderRadius: 4,

                        background:
                            "rgba(255,255,255,.12)",

                        transition: ".3s",

                        "&:hover": {

                            background:
                                "rgba(255,0,0,.20)"

                        }

                    }}

                >

                    <ListItemIcon>

                        <LogoutIcon
                            sx={{
                                color: "#ff7b7b"
                            }}
                        />

                    </ListItemIcon>

                    <ListItemText primary="Cerrar sesión" />

                </ListItemButton>

            </Box>

        </Drawer>

    );

}