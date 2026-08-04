import {

Typography,

Box

} from "@mui/material";

export default function DashboardHeader(){

const usuario=

localStorage.getItem("usuario");

return(

<Box sx={{mb:5}}>

<Typography

variant="h4"

fontWeight="bold"

>

Bienvenido,

{usuario}

👋

</Typography>

<Typography

color="text.secondary"

>

Sistema de Gestión Clínica

</Typography>

</Box>

);

}