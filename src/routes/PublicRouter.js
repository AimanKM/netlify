import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Login from 'components/Page/Public/Login';

const PublicRouter = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default withRouter(PublicRouter);
