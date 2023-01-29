import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";
import { cacheService } from "../services/cacheService";
export const ProtectedRoute = (props) => {
  const { component: Component, ...restOfProps } = props;
  const loggedin = cacheService.getItem('kwUser');
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        loggedin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
