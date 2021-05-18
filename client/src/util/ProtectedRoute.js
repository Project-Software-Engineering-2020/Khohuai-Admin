import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...rest }) {
    const auth = useSelector(state => state.auth);

    //status user login

    return (
        <Route
            {...rest}
            component={(props) => {
     
                if (auth.status === true) {
                    return <Component {...props} />
                }
                else {
                    return <Redirect to="/login" />
                }
            }}
        />

    )
}

export default ProtectedRoute
