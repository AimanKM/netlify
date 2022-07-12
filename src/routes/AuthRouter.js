import React from 'react';
import { Route, Redirect, Switch, withRouter, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { logout } from 'actions/auth';
import { gitUser } from 'actions/auth';
import Users from 'components/Page/Auth/Users';
import Loading from 'components/Page/Public/Loading';
import styles from './style.module.css';

const AuthRouter = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { status, data } = useQuery('user', gitUser, {
    onError: () => toast.error('Internal Server Error'),
  });
  const userData = data?.data.user;

  const onClicklogout = useMutation(logout, {
    onSuccess: () => {
      queryClient.removeQueries('user', { exact: true });
      localStorage.removeItem('accessToken');
      history.push('/');
    },
  });

  return (
    <>
      {status === 'loading' && <Loading />}
      <div className={styles.authRouter}>
        <div className={styles.authRouterHeader}>
          <p>{userData?.email}</p>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button
              size="small"
              variant="text"
              disabled={onClicklogout.isLoading}
              onClick={() => onClicklogout.mutate()}
            >
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
    </>
  );
};

export default withRouter(AuthRouter);
