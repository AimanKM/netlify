import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Toolbar, Avatar, Box } from '@mui/material';
import auth, { db } from 'utils/firebase';
import { HeaderAppBar } from 'components/molecules';
import { motion } from 'framer-motion/dist/framer-motion';
import { Button } from 'components/atoms';
import { ReactComponent as MenuIcon } from 'components/atoms/icon/menu.svg';

const Header = ({ open, onClick }) => {
  const history = useHistory();
  const qc = useQueryClient();

  const logout = async () =>
    signOut(auth).then(() => {
      qc.cancelQueries('user');
      history.push('/login');
    });

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
        });
      } else {
        qc.cancelQueries('user');
      }
    });
  }, [auth]);
  // console.log('qc.getQueryData("name")', qc.getQueryData('user'));

  return (
    <HeaderAppBar position="fixed" open={open}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Toolbar>
          {!open && (
            <MenuIcon
              style={{ cursor: 'pointer', width: 24, height: 24 }}
              onClick={onClick}
            />
          )}
        </Toolbar>
        <motion.h3
          transition={{ delay: 1, duration: 2 }}
          initial={{ x: '-100vw' }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
          animate={{ x: 0 }}
        >
          welcome
        </motion.h3>
        <Box sx={{ mr: '24px', display: 'flex', gap: '5px' }}>
          <Avatar aria-label="recipe">A</Avatar>
          {auth.currentUser.accessToken && (
            <Button label="Sign Out" primary onClick={logout} />
          )}
        </Box>
      </Box>
    </HeaderAppBar>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  listNav: PropTypes.arrayOf(PropTypes.shape),
  onClick: PropTypes.func,
};

export default Header;
