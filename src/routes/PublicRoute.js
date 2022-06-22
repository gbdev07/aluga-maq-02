import React, {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Navigate, Route} from "react-router-dom";
import LoadingAction from "../themes/LoadingAction/LoadingAction";
import * as links from "../utils/links";
function PrivateRoute({children, ...rest}) {
    const {
        authInfo,
        loading
    } = useContext(AuthContext)

    const {
        isAuthenticated
    } = authInfo;
    // console.log(isAuthenticated)
    if (loading) {
        return <LoadingAction />
    }
    // if (!isAuthenticated) {
    //     return <Route {...rest} element={rest.children}/>
    // }
    // return <Navigate
    //     to={links.DASHBOARD}
    // />
    if (!isAuthenticated) {
        return children;
    }
    return <Navigate to={links.DASHBOARD} />
    // return (
    //     <Route
    //         {...rest}
    //         render={() => !isAuthenticated
    //             ? children
    //             : <Navigate to={links.DASHBOARD} />
    //         }
    //     />
    // );
}

export default PrivateRoute;
