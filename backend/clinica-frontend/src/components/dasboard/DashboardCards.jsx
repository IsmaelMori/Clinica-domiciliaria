import {
Paper,
Typography,
Box
} from "@mui/material";

export default function DashboardCard({

titulo,
cantidad,
icono,
color

}){

return(

<Paper

elevation={0}

sx={{

borderRadius:5,

p:3,

height:150,

display:"flex",

justifyContent:"space-between",

alignItems:"center",

background:"#fff",

border:"1px solid #EEF2F7",

transition:".35s",

"&:hover":{

transform:"translateY(-8px)",

boxShadow:"0 20px 40px rgba(0,0,0,.08)"

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

fontSize={40}

>

{cantidad}

</Typography>

</Box>

<Box

sx={{

width:65,

height:65,

borderRadius:"18px",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:color,

color:"#fff"

}}

>

{icono}

</Box>

</Paper>

)

}