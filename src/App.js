import './App.css';
import PrivateRoute from "./routes/PrivateRoute";
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignIn from "./components/Auth/SignIn/SignIn";
import PublicRoute from "./routes/PublicRoute";
import Main from "./components/Layout/Main/Main";
import Dashboard from "./components/Main/Dashboard/Dashboard";
import {DASHBOARD} from "./utils/links";
import * as links from "./utils/links"
import {CANAL, FORNECEDOR} from "./utils/constants";
function App() {
    return (
        <Routes>
            <Route
                path={links.DASHBOARD}
                element={
                    <PrivateRoute>
                        <Main>
                            <Dashboard />
                        </Main>
                    </PrivateRoute>
                }
            />
            <Route
                path={links.SIGNUP_CANAL}
                element={
                    <PublicRoute>
                        <SignUp
                            type={CANAL}
                        />
                    </PublicRoute>
                }
            />
            <Route
                path={links.SIGNUP_FORNECEDOR}
                element={
                    <PublicRoute>
                        <SignUp
                            type={FORNECEDOR}
                        />
                    </PublicRoute>
                }
            />
            <Route
                path={links.SIGNIN_CANAL}
                element={
                    <PublicRoute>
                        <SignIn
                            type={CANAL}
                        />
                    </PublicRoute>
                }
            />
            <Route
                path={links.SIGNIN_FORNECEDOR}
                element={
                    <PublicRoute>
                        <SignIn
                            type={FORNECEDOR}
                        />
                    </PublicRoute>
                }
            />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default App;
