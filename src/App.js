import './App.css';
import PrivateRoute from "./routes/PrivateRoute";
import {Route, Switch} from "react-router-dom";
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
        <Switch>
            <PrivateRoute path={links.DASHBOARD}>
                <Main>
                    <Dashboard />
                </Main>
            </PrivateRoute>
            <PublicRoute path={links.SIGNUP_CANAL}>
                <SignUp
                    type={CANAL}
                />
            </PublicRoute>
            <PublicRoute path={links.SIGNUP_FORNECEDOR}>
                <SignUp
                    type={FORNECEDOR}
                />
            </PublicRoute>
            <PublicRoute path={links.SIGNIN_CANAL}>
                <SignIn
                    type={CANAL}
                />
            </PublicRoute>
            <PublicRoute path={links.SIGNIN_FORNECEDOR}>
                <SignIn
                    type={FORNECEDOR}
                />
            </PublicRoute>
            <Route component={NotFound} />
        </Switch>
    );
}

export default App;
