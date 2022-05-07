import React from 'react';
// import { Link } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
// import { Stack, Button } from '@mui/material';
import Login from 'components/Page/LandingPage/Login';
// import Signup from 'components/Page/LandingPage/Signup';
import styles from './style.module.css';

const LandingPage = () => (
  <div className={styles.container}>
    <div className={styles.header}>
      {/* <Stack spacing={2} direction="row">
        <Link to="login">
          <Button variant="outlined">Login</Button>
        </Link>
        <Link to="signup">
          <Button variant="contained">Signup</Button>
        </Link>
      </Stack> */}
    </div>

    <div className={styles.body}>
      <div className={styles.bodyContainer}>
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path="/signup" component={Signup} /> */}
          <Redirect to="/login" />
        </Switch>
      </div>
    </div>

    <div className={styles.fotar}>
      <p>Fotar</p>
    </div>
  </div>
);

export default LandingPage;
