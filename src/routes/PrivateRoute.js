import React, {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Navigate, Route} from "react-router-dom";
import LoadingAction from "../themes/LoadingAction/LoadingAction";
import * as links from "../utils/links";

function PrivateRoute({ children, ...rest }) {
    const {
        authInfo,
        loading
    } = useContext(AuthContext)
    const {
        isAuthenticated
    } = authInfo;
    // console.log('authInfo')
    if (loading) {
        return <LoadingAction />
    }
    // console.log(rest.children)
    // if (isAuthenticated) {
    //     return <Route {...rest} element={rest.children}/>
    // }
    // return <Navigate
    //     to={links.SIGNIN_CANAL}
    // />
    if (isAuthenticated) {
        return children;
    }
    return <Navigate to={links.SIGNIN_CANAL} />
}

export default PrivateRoute;
