import React, { useContext } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import { logout, updateUser } from 'actions/auth';
import { gitUser } from 'actions/auth';
import { Flex, Spacer } from 'components/atoms';
import Users from 'components/Page/Auth/Users';
import Loading from 'components/Page/Public/Loading';
import { ThemeContext } from './rootRouter';
import { ReactComponent as LightMode } from 'components/atoms/icon/light-mode.svg';
import { ReactComponent as DarkMode } from 'components/atoms/icon/dark-mode.svg';
import styles from './style.module.css';
import SideNavigation from './components/Auth/SideNavigation';

const AuthRouter = () => {
  const theme = useTheme();
  const { toggleColorMode, setColorMode } = useContext(ThemeContext);
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
          <Flex style={{ flexDirection: 'column',width: '100%' }}>
            <div className={styles.authRouterHeader}>
              <p>{userData?.email}</p>
              <div style={{ display: 'flex', gap: 6 }}>
                <IconButton
                  size="small"
                  onClick={() => {
                    toggleColorMode();
                    updateUser({
                      mode: theme.palette.mode === 'light' ? 'dark' : 'light',
                    });
                  }}
                >
                  {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
                <Avatar aria-label="recipe">A</Avatar>
              </div>
            </div>
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
