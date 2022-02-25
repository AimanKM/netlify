import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Avatar, Box } from '@mui/material';
import { HeaderAppBar } from 'components/molecules';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import auth from 'utils/firebase';
import { motion } from 'framer-motion/dist/framer-motion';
import { Button } from 'components/atoms';
import { ReactComponent as MenuIcon } from 'components/atoms/icon/menu.svg';

const Header = ({ open, onClick }) => {
  const history = useHistory();
  const [user, setUser] = useState({});

  const logout = async () => signOut(auth).then(() => history.push('/login'));

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser({});
      }
    });
  }, [auth]);

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
          {user.accessToken && (
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
