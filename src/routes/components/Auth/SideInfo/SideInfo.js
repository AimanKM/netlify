import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { updateUser } from 'actions/auth';
import { Avatar, IconButton, Typography } from '@mui/material';
import { Flex, Lazyload, Menu } from 'components/atoms';
import { useTheme } from '@emotion/react';
import { ThemeContext } from 'routes/rootRouter';
import { ReactComponent as LightMode } from 'components/atoms/icon/light-mode.svg';
import { ReactComponent as DarkMode } from 'components/atoms/icon/dark-mode.svg';
import styles from './style.module.css';

const SideInfo = ({ userData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [url, setUrl] = useState(userData?.photoURL);
  const theme = useTheme();
  const { toggleColorMode } = useContext(ThemeContext);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUrl('https://storage.googleapis.com/netlify-b4b13.appspot.com/uesr_photoURL%2F3236628f-21f1-4853-b5e5-57f2e986c39f-child.jpg');
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
        <Lazyload url={url} />
        <IconButton onClick={handleClick}>
          <Avatar
            // loading="lazy"
            src={userData?.photoURL}
            sx={{ width: 40, height: 40 }}
          >
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
