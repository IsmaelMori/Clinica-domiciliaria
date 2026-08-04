import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
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

    const token = localStorage.getItem("token");

    return (

        <BrowserRouter>

            <Routes>

                {/* Página principal */}

                <Route
                    path="/"
                    element={
                        token
                            ? <Navigate to="/dashboard" replace />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* Login */}

                <Route
                    path="/login"
                    element={
                        token
                            ? <Navigate to="/dashboard" replace />
                            : <Login />
                    }
                />

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                {/* Pacientes */}

                <Route
                    path="/pacientes"
                    element={
                        <PrivateRoute>
                            <Pacientes />
                        </PrivateRoute>
                    }
                />

                {/* Médicos */}

                <Route
                    path="/medicos"
                    element={
                        <PrivateRoute>
                            <Medicos />
                        </PrivateRoute>
                    }
                />

                {/* Especialidades */}

                <Route
                    path="/especialidades"
                    element={
                        <PrivateRoute>
                            <Especialidades />
                        </PrivateRoute>
                    }
                />

                {/* Citas */}

                <Route
                    path="/citas"
                    element={
                        <PrivateRoute>
                            <Citas />
                        </PrivateRoute>
                    }
                />

                {/* Usuarios */}

                <Route
                    path="/usuarios"
                    element={
                        <PrivateRoute>
                            <Usuarios />
                        </PrivateRoute>
                    }
                />

                {/* Ruta inexistente */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;