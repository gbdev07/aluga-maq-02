import React, {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";
import LoadingAction from "../themes/LoadingAction/LoadingAction";
import * as links from "../utils/links";

function PrivateRoute({...rest}) {
    const {
        authInfo,
        loading
    } = useContext(AuthContext)
    const {
        isAuthenticated
    } = authInfo;

    console.log(isAuthenticated)
    if (loading) {
        return <LoadingAction />
    }
    if (isAuthenticated) {
        return <Route {...rest} />
    }
    return <Redirect
        to={links.SIGNIN_CANAL}
    />
}

export default PrivateRoute;
