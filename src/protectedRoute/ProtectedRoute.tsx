import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../store/store";

export type ProtectedRouteProps = {
    component: React.ComponentType<RouteProps>;
  } & RouteProps;
  


export const ProtectedRoute: React.FC<ProtectedRouteProps>= ({
    component: Component ,
    ...rest
}: {
  component: React.ComponentType<RouteProps>;
}) => {

    const isAuth = useAppSelector((state) => state.auth.isAuthenticated)

    return (
        <Route
            {...rest}
            render={props => {
                if (isAuth) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};
