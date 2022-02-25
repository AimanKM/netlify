/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import {
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import auth from 'utils/firebase';
import MastarTemplates from 'components/Templates/MastarTemplates';

import Login from 'components/Page/Login';
import Home from 'components/Page/home';
import Signup from 'components/Page/Signup';
import Loading from 'components/Page/Loading';

const PublicPage = () => {
  const [statu, setStatus] = useState();

  const { status } = useQuery(
    ['user'],
    onAuthStateChanged(auth, () => {
      if (status === 'success') {
        setStatus(status);
      }
    }),
    { keepPreviousData: false, cacheTime: 0 }
  );
  // useEffect(() => {
  //  setPersistence(auth, browserSessionPersistence)
  //     .then(() => {
  //       onAuthStateChanged(auth, () => {
  //         // if (status === 'success') {
  //           setStatus('success');
  //         // }
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('error :>>; ', error);
  //     });
  // });

  return (
    <div>
      {statu !== 'success' ? (
        <Loading />
      ) : auth.currentUser ? (
        <MastarTemplates>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/" />
          </Switch>
        </MastarTemplates>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      )}
    </div>
  );
};

PublicPage.propTypes = {
  children: PropTypes.node,
};

export default withRouter(PublicPage);
