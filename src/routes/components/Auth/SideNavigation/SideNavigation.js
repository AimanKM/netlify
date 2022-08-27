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
    <Flex className={styles.links}>
      <Flex style={{ flexDirection: 'column' }}>
      <Link to="/">
        <Button startIcon={<IconHouse />} color="inherit" variant="text">
          hoem
        </Button>
      </Link>
      <Link to="/aaa">
        <Button startIcon={<IconHouse />} color="inherit" variant="text">
          test
        </Button>
      </Link>
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
  </Flex>
);

SideNavigation.propTypes = {
  funcLogout: PropTypes.func,
  disabledLogout: PropTypes.func,
};
export default SideNavigation;
