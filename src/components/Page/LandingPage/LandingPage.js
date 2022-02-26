import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Stack, Button, Box } from '@mui/material';
import Login from 'components/Page/LandingPage/Login';
import Signup from 'components/Page/LandingPage/Signup';
import styles from './style.module.css';

const LandingPage = () => (
  <dev>
    <Box
      sx={{
        p: '10px',
        display: 'flex',
        justifyContent: 'end',
        borderBottom: '1px solid #1976d2',
        boxShadow: '0px 1px 6px 0px #1976d2',
      }}
    >
      <Stack spacing={2} direction="row">
        <Link to="login">
          <Button variant="outlined">Login</Button>
        </Link>
        <Link to="signup">
          <Button variant="contained">Signup</Button>
        </Link>
      </Stack>
    </Box>
    <div className={styles.container}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/login" />
      </Switch>
    </div>
    <Box
      sx={{
        p: '7px',
        display: 'flex',
        justifyContent: 'center',
        borderTop: '1px solid #1976d2',
        boxShadow: '0 -3px 6px 0 #1976d2',
      }}
    >
      <h3>fotar</h3>
    </Box>
  </dev>
);

export default LandingPage;
