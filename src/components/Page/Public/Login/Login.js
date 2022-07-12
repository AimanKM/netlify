import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Button, Dialog, Typography } from '@mui/material';
import { login } from 'actions/auth';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form } from 'react-final-form';
import { Spacer, TextInput } from 'components/atoms';
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
          <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <Typography variant="h5" gutterBottom>
                Login
              </Typography>
              <Spacer height={16} />

              <TextInput
                label="E-mail"
                name="email"
                type="email"
                validate={[required]}
              />
              <Spacer height={16} />
              <TextInput
                label="Password"
                name="password"
                type="password"
                validate={[required]}
              />
              <Spacer height={12} />
              <div style={{ width: '100%' }}>
                <Button
                  size="small"
                  onClick={() => setOpen(true)}
                  variant="text"
                >
                  Forgot your password
                </Button>
              </div>

              <Spacer height={64} />
              <LoadingButton
                type="submit"
                loading={onSubmit.isLoading}
                variant="contained"
              >
                Login
              </LoadingButton>
            </form>
          </div>
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
