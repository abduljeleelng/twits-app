import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./";

const PrivateRoute = ({ render: Component, ...rest }) => (
    <Route
        {...rest}
        component={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/auth/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);
export default PrivateRoute;