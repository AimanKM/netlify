import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ApiUtils } from 'utils/apiUtils';
import {
  Stack,
  Pagination,
  Grid,
  Typography,
  Button,
  Dialog,
} from '@mui/material';
import { Card } from 'components/molecules';
import { Spacer, TextInput } from 'components/atoms';
import styles from './style.module.css';
import { Form } from 'react-final-form';
import { required } from 'components/validations/FormValidations';
import { LoadingButton } from '@mui/lab';
// import auth from 'utils/firebase';
// import axios from 'axios';

const Home = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  // const [accessToken, setAccessToken] = useState('');

  function fetchData() {
    return ApiUtils('character', { page: page });
  }

  const { data, status } = useQuery(['characters', page], fetchData);

  // auth.currentUser
  //   .getIdToken()
  //   .then((accessToken) => setAccessToken(accessToken));

  // React.useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/api/users', {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'Access-Token': accessToken,
  //       },
  //     })
  //     .then((response) => {
  //       console.log('response', response);
  //     });
  // }, [accessToken]);
  return (
    <>
      {status === 'error' && (
        <Typography variant="h6">Internal Server Error</Typography>
      )}
      {status === 'loading' && (
        <Typography variant="h6">loading......</Typography>
      )}
      {status === 'success' && (
        <div className={styles.container}>
          <Spacer height={12} />
          <Button size="small" onClick={() => setOpen(true)} variant="text">
            Add User
          </Button>
          <Spacer height={12} />
          <div
            style={{ overflowY: 'scroll', height: window.innerHeight - 170 }}
          >
            <Grid container spacing={1}>
              {data?.data?.results.map((item, key) => (
                <Grid item xs={12} sm={6} md={4} xl={2} key={key}>
                  <Card key={key} name={item?.name}>
                    <p>{item?.name}</p>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>

          <Spacer height={16} />
          <Stack>
            <Pagination
              count={data?.data?.info.pages}
              onChange={(_, e) => setPage(e)}
              color="primary"
              page={page}
            />
          </Stack>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Form
              onSubmit={(first) => console.log('first', first)}
              initialValues={{}}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.forgotPassword}>
                  <Typography variant="h6" gutterBottom>
                    Forgot your password
                  </Typography>
                  <Spacer height={16} />
                  <TextInput
                    fullWidth
                    label="E-mail"
                    name="email"
                    type="email"
                    validate={[required]}
                  />
                  <Spacer height={32} />
                  <LoadingButton
                    type="submit"
                    // loading={loading}
                    variant="contained"
                  >
                    Send
                  </LoadingButton>
                </form>
              )}
            />
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Home;
