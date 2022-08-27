import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { updateUser } from 'actions/auth';
import { Avatar, IconButton, Typography } from '@mui/material';
import { Flex, Menu } from 'components/atoms';
import { useTheme } from '@emotion/react';
import { ThemeContext } from 'routes/rootRouter';
import { ReactComponent as LightMode } from 'components/atoms/icon/light-mode.svg';
import { ReactComponent as DarkMode } from 'components/atoms/icon/dark-mode.svg';
import styles from './style.module.css';

const SideInfo = ({ userData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { toggleColorMode } = useContext(ThemeContext);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Flex className={styles.authRouterHeader}>
      <Flex gap={6}>
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
        <IconButton onClick={handleClick} size="small">
          <Avatar src={userData?.photoURL} sx={{ width: 32, height: 32 }}>
            {userData?.display_name[0].toUpperCase()}
          </Avatar>
        </IconButton>
      </Flex>
      <Menu openAnchorEl={anchorEl} onClose={handleClose}>
        <Flex gap={12} style={{ flexDirection: 'column', padding: '5px 10px' }}>
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: 'bold' }}
          >
            Display Name:&nbsp;
            <Typography variant="body2" component="span">
              {userData?.display_name}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: 'bold' }}
          >
            E-mail:&nbsp;
            <Typography variant="body2" component="span">
              {userData?.email}
            </Typography>
          </Typography>
        </Flex>
      </Menu>
    </Flex>
  );
};

SideInfo.propTypes = {
  userData: PropTypes.shape(),
};

export default SideInfo;
