import { Box, Toolbar } from "@mui/material";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {

    return (

        <Box sx={{ display: "flex" }}>

            <Navbar />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#f5f5f5",
                    minHeight: "100vh",
                    p: 3
                }}
            >

                <Toolbar />

                {children}

            </Box>

        </Box>

    );

}