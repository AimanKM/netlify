import React from 'react';
import { withRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AuthRouter from './AuthRouter';
import PublicRouter from './PublicRouter';

export const ThemeContext = React.createContext();

const RootRouter = () => {
  const isLogin = localStorage.getItem('accessToken');
  const [mode, setMode] = React.useState('light');

  const colorMode = React.useMemo(
    () => ({
      setColorMode: (prevMode) => setMode(prevMode),
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <>
      <ThemeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>{isLogin && <AuthRouter />}</ThemeProvider>
      </ThemeContext.Provider>

      {!isLogin && <PublicRouter />}
    </>
  );
};

export default withRouter(RootRouter);
