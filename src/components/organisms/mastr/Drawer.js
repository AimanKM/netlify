import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DrawerMUI from '@mui/material/Drawer';
import { Box, Avatar } from '@mui/material';
import { ReactComponent as CloseIcon } from 'components/atoms/icon/x-close.svg';
import { ReactComponent as HouseIcon } from 'components/atoms/icon/house.svg';
import { ReactComponent as SettingsIcon } from 'components/atoms/icon/settings.svg';
import { ReactComponent as AboutIcon } from 'components/atoms/icon/about.svg';

const style = {
  drawerMUI: {
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
    },
  },

  box: {
    px: '10px',
    backgroundColor: '#1976d2',
    height: '100%',
  },

  boxHeader: {
    py: '7px',
    px: '10px',
    mt: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'solid 1px #fff',
    borderRadius: '5px',
    boxShadow: '0 0 4px 0',
  },
  boxBody: {
    p: '10px',
    mt: '20px',
    display: 'flex',
    justifyContent: 'end',
    border: 'solid 1px #fff',
    borderRadius: '5px',
    flexDirection: 'column',
    gap: '20px',
    boxShadow: '0 0 4px 0',
  },
};

const Drawer = ({ onClick, open }) => {
  return (
    <DrawerMUI
      sx={style.drawerMUI}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box sx={style.box}>
        <Box sx={style.boxHeader}>
          <Avatar aria-label="recipe">A</Avatar>
          <CloseIcon
            style={{ fill: '#fff', cursor: 'pointer', width: 24, height: 24 }}
            onClick={onClick}
          />
        </Box>
        <Box sx={style.boxBody}>
          <Link style={{ color: '#fff', textDecoration: 'none' }} to="/">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HouseIcon style={{ width: 24, height: 24 }} />
              Home
            </Box>
          </Link>

          <Link style={{ color: '#fff', textDecoration: 'none' }} to="login">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <SettingsIcon style={{ width: 24, height: 24 }} />
              Settings
            </Box>
          </Link>

          <Link style={{ color: '#fff', textDecoration: 'none' }} to="login">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AboutIcon style={{ width: 24, height: 24 }} />
              login
            </Box>
          </Link>

          <Link style={{ color: '#fff', textDecoration: 'none' }} to="signup">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AboutIcon style={{ width: 24, height: 24 }} />
              Signup
            </Box>
          </Link>

          <Link style={{ color: '#fff', textDecoration: 'none' }} to="/">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AboutIcon style={{ width: 24, height: 24 }} />
              About
            </Box>
          </Link>
        </Box>
      </Box>
    </DrawerMUI>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Drawer;
