import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import {
  onAuthStateChanged,
  // setPersistence,
  // browserSessionPersistence,
} from 'firebase/auth';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import auth from 'utils/firebase';
import MastarTemplates from 'components/Templates/MastarTemplates';

import LandingPage from 'components/Page/LandingPage';
import Home from 'components/Page/home';
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
            <Redirect to="/" />
          </Switch>
        </MastarTemplates>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

PublicPage.propTypes = {
  children: PropTypes.node,
};

export default withRouter(PublicPage);
