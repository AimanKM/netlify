import React, { useContext } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { logout } from 'actions/auth';
import { gitUser } from 'actions/auth';
import { Flex, Spacer } from 'components/atoms';
import Users from 'components/Page/Auth/Users';
import Loading from 'components/Page/Public/Loading';
import { ThemeContext } from './rootRouter';
import SideNavigation from './components/Auth/SideNavigation';
import SideInfo from './components/Auth/SideInfo';
import styles from './style.module.css';

const AuthRouter = () => {
  const { setColorMode } = useContext(ThemeContext);
  const history = useHistory();
  const queryClient = useQueryClient();

  const { status, data } = useQuery('user', gitUser, {
    onSuccess: ({ data: { user } }) => setColorMode(user.mode || 'light'),
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
      {status === 'success' && (
        <Flex style={{ height: '100%' }}>
          <SideNavigation
            disabledLogout={onClicklogout.isLoading}
            funcLogout={() => onClicklogout.mutate()}
          />
          <Spacer width={16} />
          <Flex className={styles.authRouterContent}>
            <SideInfo userData={userData} />
            <div className={styles.authRouterBody}>
              <div className={styles.authRouterBodyContainer}>
                <Switch>
                  <Route exact path="/" component={Users} />
                  <Route exact path="/aaa" component={() => <h1>AAA</h1>} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </div>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default withRouter(AuthRouter);
