import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthRouter from './AuthRouter';
import PublicRouter from './PublicRouter';

const RootRouter = () => {
  const isLogin = localStorage.getItem('accessToken');

  return (
    <>
      {isLogin && <AuthRouter />}
      {!isLogin && <PublicRouter />}
    </>
  );
};

export default withRouter(RootRouter);
