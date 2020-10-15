import React, { useContext } from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';

import AuthContext from '../Context/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return authContext.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        );
      }}
    />
  );
};

export default withRouter(PrivateRoute);
