import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    Typography,
    Button,
    IconButton
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { MaterialReactTable } from "material-react-table";

import Swal from "sweetalert2";

import UsuarioForm from "./UsuarioForm";

import {
    obtenerUsuarios,
    guardarUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../../services/usuarioService";


export default function Usuarios() {


    const [usuarios, setUsuarios] = useState([]);

    const [open, setOpen] = useState(false);

    const [usuarioEditar, setUsuarioEditar] = useState(null);



    const cargar = async () => {

        try {

            const data = await obtenerUsuarios();

            console.log("Usuarios:", data);

            setUsuarios(data ?? []);

        } catch(error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudieron cargar los usuarios",
                "error"
            );

        }

    };



    useEffect(()=>{

        cargar();

    },[]);



    const nuevo = () => {

        setUsuarioEditar(null);

        setOpen(true);

    };



    const editar = (usuario) => {

        setUsuarioEditar(usuario);

        setOpen(true);

    };



    const guardar = async(datos)=>{


        try{


            if(usuarioEditar){


                await actualizarUsuario(
                    usuarioEditar.id,
                    datos
                );


                Swal.fire(
                    "Actualizado",
                    "Usuario actualizado correctamente",
                    "success"
                );


            }else{


                await guardarUsuario(datos);


                Swal.fire(
                    "Guardado",
                    "Usuario registrado correctamente",
                    "success"
                );


            }


            setOpen(false);

            cargar();



        }catch(error){


            console.error(error);


            Swal.fire(
                "Error",
                error.response?.data?.message ||
                "No se pudo guardar el usuario",
                "error"
            );


        }


    };



    const eliminar = async(id)=>{


        const confirmar = await Swal.fire({


            title:"¿Eliminar usuario?",

            text:"El usuario será desactivado",

            icon:"warning",

            showCancelButton:true,

            confirmButtonText:"Eliminar",

            cancelButtonText:"Cancelar"


        });



        if(!confirmar.isConfirmed)
            return;



        try{


            await eliminarUsuario(id);



            Swal.fire(

                "Eliminado",

                "Usuario eliminado correctamente",

                "success"

            );


            cargar();



        }catch(error){


            console.error(error);


            Swal.fire(

                "Error",

                "No se pudo eliminar",

                "error"

            );


        }


    };



    const columnas = useMemo(()=>[



        {

            accessorKey:"id",

            header:"ID"

        },


        {

            accessorKey:"username",

            header:"Usuario"

        },


        {

            accessorKey:"rol",

            header:"Rol"

        },


        {

            accessorKey:"activo",

            header:"Estado",

            Cell:({cell})=>(

                cell.getValue()

                ? "Activo"

                : "Inactivo"

            )

        },


        {


            header:"Acciones",


            Cell:({row})=>(


                <>


                    <IconButton

                        color="primary"

                        onClick={()=>editar(row.original)}

                    >

                        <EditIcon/>

                    </IconButton>



                    <IconButton

                        color="error"

                        onClick={()=>eliminar(row.original.id)}

                    >

                        <DeleteIcon/>

                    </IconButton>


                </>


            )


        }


    ],[]);





    return (

        <DashboardLayout>


            <Typography

                variant="h4"

                sx={{

                    mb:3,

                    fontWeight:"bold"

                }}

            >

                Usuarios

            </Typography>



            <Button

                variant="contained"

                startIcon={<AddIcon/>}

                sx={{mb:3}}

                onClick={nuevo}

            >

                Nuevo Usuario

            </Button>



            <MaterialReactTable

                columns={columnas}

                data={usuarios}

            />



            <UsuarioForm

                open={open}

                onClose={()=>setOpen(false)}

                onGuardar={guardar}

                usuario={usuarioEditar}

            />


        </DashboardLayout>

    );

}