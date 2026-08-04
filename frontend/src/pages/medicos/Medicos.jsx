import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    Button,
    Typography,
    IconButton
} from "@mui/material";


import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


import { MaterialReactTable } from "material-react-table";

import Swal from "sweetalert2";


import MedicoForm from "./MedicoForm";


import {
    obtenerMedicos,
    eliminarMedico,
    guardarMedico,
    actualizarMedico
} from "../../services/medicoService";



export default function Medicos(){


    const [medicos,setMedicos] = useState([]);

    const [open,setOpen] = useState(false);

    const [medicoEditar,setMedicoEditar] = useState(null);



    const cargar = async()=>{

        try{

            const data = await obtenerMedicos();

            console.log(data);

            setMedicos(data);


        }catch(error){

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudieron cargar los médicos",
                "error"
            );

        }

    };



    useEffect(()=>{

        cargar();

    },[]);




    const nuevo = ()=>{

        setMedicoEditar(null);

        setOpen(true);

    };




    const editar = (medico)=>{


        setMedicoEditar(medico);

        setOpen(true);


    };





    const guardar = async(data)=>{


        try{


            if(medicoEditar){


                await actualizarMedico(
                    medicoEditar.id,
                    data
                );


                Swal.fire(
                    "Actualizado",
                    "Médico actualizado correctamente",
                    "success"
                );


            }else{


                await guardarMedico(data);


                Swal.fire(
                    "Guardado",
                    "Médico registrado correctamente",
                    "success"
                );


            }


            setOpen(false);

            cargar();



        }catch(error){


            console.error(error);


            Swal.fire(
                "Error",
                "No se pudo guardar",
                "error"
            );


        }


    };





    const eliminar = async(id)=>{


        const confirmar = await Swal.fire({

            title:"¿Eliminar médico?",

            text:"Esta acción no se puede deshacer",

            icon:"warning",

            showCancelButton:true,

            confirmButtonText:"Eliminar",

            cancelButtonText:"Cancelar"


        });



        if(confirmar.isConfirmed){


            try{


                await eliminarMedico(id);


                Swal.fire(
                    "Eliminado",
                    "Médico eliminado correctamente",
                    "success"
                );


                cargar();


            }catch(error){


                Swal.fire(
                    "Error",
                    "No se pudo eliminar",
                    "error"
                );


            }


        }



    };





    const columnas = useMemo(()=>[


        {
            accessorKey:"id",
            header:"ID"
        },


        {
            accessorKey:"nombre",
            header:"Nombre"
        },


        {
            accessorKey:"apellido",
            header:"Apellido"
        },


        {
            accessorKey:"cedula",
            header:"Cédula"
        },


        {
            accessorKey:"telefono",
            header:"Teléfono"
        },


        {
            accessorKey:"correo",
            header:"Correo"
        },


        {
            accessorKey:"especialidadNombre",
            header:"Especialidades"
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





    return(


        <DashboardLayout>



            <Typography
                variant="h4"
                sx={{
                    mb:3,
                    fontWeight:"bold"
                }}
            >

                Médicos

            </Typography>




            <Button

                variant="contained"

                startIcon={<AddIcon/>}

                sx={{
                    mb:3
                }}

                onClick={nuevo}

            >

                Nuevo Médico

            </Button>




            <MaterialReactTable

                columns={columnas}

                data={medicos}

            />




            <MedicoForm

                open={open}

                onClose={()=>setOpen(false)}

                onGuardar={guardar}

                medico={medicoEditar}

            />



        </DashboardLayout>



    );

}