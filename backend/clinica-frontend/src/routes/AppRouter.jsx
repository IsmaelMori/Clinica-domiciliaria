import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import PrivateRoute from "./routes/PrivateRoute";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Pacientes from "./pages/pacientes/Pacientes";


function App(){

    return(

        <BrowserRouter>

            <Routes>


                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard/>
                        </PrivateRoute>
                    }
                />


                <Route
                    path="/pacientes"
                    element={
                        <PrivateRoute>
                            <Pacientes/>
                        </PrivateRoute>
                    }
                />


            </Routes>


        </BrowserRouter>

    );

}


export default App;