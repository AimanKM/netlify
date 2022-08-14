import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Flex } from 'components/atoms';
import { ReactComponent as IconHouse } from 'components/atoms/icon/house.svg';
import { ReactComponent as IconLogout } from 'components/atoms/icon/logout.svg';
import styles from './style.module.css';

const SideNavigation = ({ disabledLogout, funcLogout }) => (
  <Flex gap={64} className={styles.Body}>
    <h3>icon</h3>
    <Flex style={{ flexDirection: 'column' }}>
      <Button startIcon={<IconHouse />} color="inherit" variant="text">
        <Link to="/">hoem</Link>
      </Button>
      <Button variant="text" color="inherit" startIcon={<IconHouse />}>
        <Link to="/aaa">aaa</Link>
      </Button>
    </Flex>
    <Button
      variant="text"
      color="inherit"
      onClick={funcLogout}
      disabled={disabledLogout}
      startIcon={<IconLogout />}
    >
      Log out
    </Button>
  </Flex>
);

SideNavigation.propTypes = {
  funcLogout: PropTypes.func,
  disabledLogout: PropTypes.func,
};
export default SideNavigation;
