import React from 'react';
import { Typography } from '@mui/material';
import { Flex } from 'components/atoms';
import styles from './style.module.css';

const InternalServerError = () => (
  <Flex className={styles.pageError}>
    <Typography sx={{ color: 'red' }} variant="h6">
      Internal Server Error
    </Typography>
  </Flex>
);

export default InternalServerError;
