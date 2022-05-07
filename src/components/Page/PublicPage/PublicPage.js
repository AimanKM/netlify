import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { onAuthStateChanged } from 'firebase/auth';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import auth, { db } from 'utils/firebase';
import MastarTemplates from 'components/Templates/MastarTemplates';

import LandingPage from 'components/Page/LandingPage';
import Home from 'components/Page/home';
import Loading from 'components/Page/Loading';
import Signup from '../LandingPage/Signup';
import { doc, getDoc } from 'firebase/firestore';

const PublicPage = () => {
  const [loading, setLoading] = useState(true);
  const qc = useQueryClient();
  const userData= qc.getQueryData('user');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        getDoc(docRef).then((docSnap) => {
          qc.setQueryData('user', {
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            phoneNumber: currentUser.phoneNumber,
            displayName: currentUser.displayName,
            ...docSnap.data(),
          });
          setLoading(false);
          // console.log('getAuth()', getAuth);
         
        });
      } else {
        setLoading(false);
        qc.cancelQueries('user');
      }
    });
  }, [userData===undefined]);

  // console.log('qc.getQueryData("user")', qc.getQueryData('user'));

  return (
    <div>
      {loading ? (
        <Loading />
      ) : auth.currentUser ? (
        <MastarTemplates>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
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
