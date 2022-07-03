import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';
import auth, { db } from 'utils/firebase';
import Loading from 'components/Page/Public/Loading';
import AuthRouter from './AuthRouter';
import PublicRouter from './PublicRouter';

const RootRouter = () => {
  const [loading, setLoading] = useState(true);
  const qc = useQueryClient();
  // const userData = qc.getQueryData('user');

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            const docRef = doc(db, 'users', currentUser.uid);
            try {
              getDoc(docRef).then((docSnap) => {
                sessionStorage.setItem('accessToken', currentUser.accessToken);
                qc.setQueryData('user', {
                  email: currentUser.email,
                  photoURL: currentUser.photoURL,
                  phoneNumber: currentUser.phoneNumber,
                  displayName: currentUser.displayName,
                  ...docSnap.data(),
                });
                setLoading(false);
              });
            } catch (e) {
              console.log('Error console: ', e);
            }
          } else {
            qc.cancelQueries('user');
            setLoading(false);
          }
        });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log('error', error);
      });
  }, [auth]);

  return (
    <>
      {loading && <Loading />}
      {!loading && auth.currentUser && <AuthRouter />}
      {!loading && !auth.currentUser && <PublicRouter />}
    </>
  );
};

export default withRouter(RootRouter);
