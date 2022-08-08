import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Login from 'components/Page/Public/Login';
import styles from './style.module.css';

const PublicRouter = () => {
  return (
    <div className={styles.publicRouter}>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

export default withRouter(PublicRouter);
