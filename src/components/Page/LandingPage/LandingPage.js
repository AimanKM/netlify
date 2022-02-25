/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderAppBar } from 'components/molecules';
import LoginTemplates from 'components/Templates/Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from 'utils/firebase';
import { Grid, Stack, Button, Box } from '@mui/material';

const LandingPage = () => {
  const history = useHistory();
  const onSubmit = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() =>
        history.push('/')
      );
    } catch (error) {
      console.log('error.me', error.message);
    }
  };

  return (
    <dev>
      <Box
        sx={{
          p: '10px',
          display: 'flex',
          justifyContent: 'end',
          borderBottom: '1px solid #1976d2',
          boxShadow: '0px 0px 6px 0px #1976d2',
        }}
      >
        <Stack spacing={2} direction="row">
          <Button variant="outlined">Login</Button>
          <Button variant="contained">Signup</Button>
        </Stack>
      </Box>
      <div>
        <h3>body</h3>
      </div>
    </dev>
  );
};

export default LandingPage;
