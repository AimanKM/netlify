import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Button, Dialog, Typography } from '@mui/material';
import { login } from 'actions/auth';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form } from 'react-final-form';
import { Flex, Spacer, TextInput } from 'components/atoms';
import { required } from 'components/validations/FormValidations';
import styles from './style.module.css';

const Login = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const onSubmit = useMutation(login, {
    onSuccess: (res) => {
      localStorage.setItem('accessToken', res.data.accessToken);
      history.push('/');
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return (
    <React.Fragment>
      <Form
        initialValues={{}}
        onSubmit={(values) => onSubmit.mutate(values)}
        render={({ handleSubmit }) => (
          <form  onSubmit={handleSubmit} className={styles.formLogen}>
            <Flex gap={7} className={styles.formLogenHeader}>
              <Typography variant="h4" gutterBottom>
                Login
              </Typography>
              <Typography variant="p" gutterBottom>
                Welcome back
              </Typography>
            </Flex>

            <TextInput
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              variant="standard"
              validate={[required]}
              className={styles.textInput}
            />
            <Spacer height={6} />
            <TextInput
              fullWidth
              autoComplete="tel-national username"
              label="Password"
              name="password"
              type="password"
              variant="standard"
              validate={[required]}
              className={styles.textInput}
            />
            <Spacer height={12} />
            <Flex className={styles.formLogenFooter}>
              <LoadingButton
                type="submit"
                color="inherit"
                variant="outlined"
                loading={onSubmit.isLoading}
              >
                Login
              </LoadingButton>

              <Button
                color="inherit"
                size="small"
                variant="text"
                onClick={() => setOpen(true)}
              >
                Forgot your password
              </Button>
            </Flex>
          </form>
        )}
      />
      {/* Forgot your password */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Form
          // onSubmit={forgotPassword}
          onSubmit={() => {}}
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
    </React.Fragment>
  );
};

export default Login;
