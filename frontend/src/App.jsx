import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

import Pacientes from "./pages/pacientes/Pacientes";
import Medicos from "./pages/medicos/Medicos";
import Especialidades from "./pages/especialidades/Especialidades";
import Citas from "./pages/citas/Citas";
import Usuarios from "./pages/usuarios/Usuarios";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* DASHBOARD */}

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                {/* PACIENTES */}

                <Route
                    path="/pacientes"
                    element={
                        <PrivateRoute>
                            <Pacientes />
                        </PrivateRoute>
                    }
                />

                {/* MEDICOS */}

                <Route
                    path="/medicos"
                    element={
                        <PrivateRoute>
                            <Medicos />
                        </PrivateRoute>
                    }
                />

                {/* ESPECIALIDADES */}

                <Route
                    path="/especialidades"
                    element={
                        <PrivateRoute>
                            <Especialidades />
                        </PrivateRoute>
                    }
                />

                {/* CITAS */}

                <Route
                    path="/citas"
                    element={
                        <PrivateRoute>
                            <Citas />
                        </PrivateRoute>
                    }
                />

                {/* USUARIOS */}

                <Route
                    path="/usuarios"
                    element={
                        <PrivateRoute>
                            <Usuarios />
                        </PrivateRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;