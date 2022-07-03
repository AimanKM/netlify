import React from 'react';
import { Route, Redirect, Switch, withRouter, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { Avatar, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import auth from 'utils/firebase';
import Users from 'components/Page/Auth/Users';
import styles from './style.module.css';

const AuthRouter = () => {
  const history = useHistory();
  const qc = useQueryClient();
  const userData = qc.getQueryData('user');

  const logout = async () =>
    signOut(auth).then(() => {
      qc.cancelQueries('user');
      history.push('/login');
    });

  return (
    <div className={styles.authRouter}>
      <div className={styles.authRouterHeader}>
        <p>{userData?.email}</p>
        <div style={{ display: 'flex', gap: 6 }}>
          <Button size="small" onClick={logout} variant="text">
            Logout
          </Button>
          <Avatar aria-label="recipe">A</Avatar>
        </div>
      </div>
      <div className={styles.authRouterBody}>
        <div className={styles.authRouterBodyLinks}>
          <div className={styles.authRouterContainerLinks}>
            <Link className={styles.authRouterLink} to="/">
              Users
            </Link>
            <Link className={styles.authRouterLink} to="/aaa">
              aaa
            </Link>
          </div>
        </div>
        <div className={styles.authRouterBodyContainer}>
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/aaa" component={() => <h1>AAA</h1>} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AuthRouter);
