import './App.css';
import PrivateRoute from "./routes/PrivateRoute";
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignIn from "./components/Auth/SignIn/SignIn";
import PublicRoute from "./routes/PublicRoute";
import Main from "./components/Layout/Main/Main";
import DashboardCanal from "./components/Main/Dashboard/DashboardCanal";
import * as links from "./utils/links"
import {CANAL, FORNECEDOR} from "./utils/constants";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import ActiveUser from "./components/Auth/ActiveUser/ActiveUser";
import DashboardFornecedor from "./components/Main/Dashboard/DashboardFornecedor";
import {MAIN, SIGNIN} from "./utils/links";
import MainSite from "./components/Main/Main/MainSite";
function App() {
    return (
        <Routes>
            <Route
                path={links.DASHBOARD_CANAL}
                element={
                    <PrivateRoute>
                        <Main>
                            <DashboardCanal />
                        </Main>
                    </PrivateRoute>
                }
            />
            <Route
                path={links.DASHBOARD_FORNECEDOR}
                element={
                    <PrivateRoute>
                        <Main>
                            <DashboardFornecedor />
                        </Main>
                    </PrivateRoute>
                }
            />
            <Route
                path={links.MAIN}
                element={
                    <MainSite />

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
                path={links.SIGNIN}
                element={
                    <PublicRoute>
                        <SignIn />
                    </PublicRoute>
                }
            />
            {/*<Route*/}
            {/*    path={links.SIGNIN_FORNECEDOR}*/}
            {/*    element={*/}
            {/*        <PublicRoute>*/}
            {/*            <SignIn*/}
            {/*                type={FORNECEDOR}*/}
            {/*            />*/}
            {/*        </PublicRoute>*/}
            {/*    }*/}
            {/*/>*/}
            <Route
                path={links.FORGOTPASSWORD}
                element={
                    <ForgotPassword />

                }
            />
            <Route
                path={links.RESETPASSWORD}
                element={
                    <ResetPassword />

                }
            />
            <Route
                path={links.ACTIVEUSER}
                element={
                    <ActiveUser />
                }
            />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default App;
