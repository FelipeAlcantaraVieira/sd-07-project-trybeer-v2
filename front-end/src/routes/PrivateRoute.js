import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';

export default function PrivateRoute(props) {
  const [privateRoutProps] = useState(props);
  const { userIsLogged } = useContext(TrybeerContext);
  const { component: Component, ...rest } = privateRoutProps;
  return (
    <Route
      { ...rest }
      render={ (renderProps) => (userIsLogged() ? (
        <Component { ...renderProps } />
      ) : (
        <Redirect to="/login" />
      )) }
    />
  );
}
