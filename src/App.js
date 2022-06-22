import './App.css';
import React from 'react';
import PrivateRoute from "./routes/PrivateRoute";
import {Route, Routes} from "react-router-dom";
import NotFound from  "./components/NotFound/NotFound";
import {useContext} from "react";
import {AuthContext} from "./contexts/AuthContext";
import Dashboard from "./components/Main/Dashboard/Dashboard";
// import SignUp from "./components/Auth/SignUp/SignUp";
// import SignIn from "./components/Auth/SignIn/SignIn";
// import PublicRoute from "./routes/PublicRoute";
// import Main from "./components/Layout/Main/Main";
// import Dashboard from "./components/Main/Dashboard/Dashboard";
// import * as links from "./utils/links"
// import {CANAL, FORNECEDOR} from "./utils/constants";
import Main from "./components/Layout/Main/Main";
// const App = (props) => {
//     return (
//         <div>
//             App 1.4
//         </div>
//     )
// }
const App = (props) => {
    const {
        authInfo,
        // loading
    } = useContext(AuthContext)
    console.log(authInfo)
    // return (
    //     <div>
    //         Test 1.4
    //         <NotFound />
    //     </div>
    // )
    return (
        <Routes>
            {/*<Route path='*' element={<Dashboard />} />*/}
            <Route
                path='/'
                element={
                    <PrivateRoute>
                        <Main>
                            <Dashboard />
                        </Main>
                    </PrivateRoute>
                }
            />
            {/*<Route*/}
            {/*    path='/signup-canal'*/}
            {/*    element={*/}
            {/*        <SignUp*/}
            {/*            type={'CANAL'}*/}
            {/*        />*/}
            {/*    }*/}
            {/*/>*/}
            {/*<Route*/}
            {/*    path={links.SIGNUP_FORNECEDOR}*/}
            {/*    element={*/}
            {/*        <PublicRoute>*/}
            {/*            <SignUp*/}
            {/*                type={FORNECEDOR}*/}
            {/*            />*/}
            {/*        </PublicRoute>*/}
            {/*    }*/}
            {/*/>*/}
            {/*<Route*/}
            {/*    path={links.SIGNIN_CANAL}*/}
            {/*    element={*/}
            {/*        <PublicRoute>*/}
            {/*            <SignIn*/}
            {/*                type={CANAL}*/}
            {/*            />*/}
            {/*        </PublicRoute>*/}
            {/*    }*/}
            {/*/>*/}
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
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}
export default App;
