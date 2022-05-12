import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form } from 'react-final-form';
import { Spacer } from 'components/atoms';
import { required } from 'components/validations/FormValidations';
import TextInput from 'components/organisms/TextInput';
import styles from './style.module.css';
import { supabase } from 'utils/supabase';
import { toast } from 'react-toastify';

const Login = () => {
  const history = useHistory();
  const { auth } = supabase;
  const [loading, setLoading] = useState();
  const [open, setOpen] = useState(false);

  const onSubmit = ({ email, password }) => {
    setLoading(true);
    auth.signIn({ email, password }).then(({session,error}) => {
      if (session) history.push('/');
      if (error) toast.error(error.message);
      setLoading(false);
    });
  };

  const forgotPassword = () => {
    setLoading(true);
    // sendPasswordResetEmail(auth, email)
    //   .then(() => {
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log('error', error);
    //     // ..
    //   });
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.container}>
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
              label="password"
              name="password"
              type="password"
              validate={[required]}
            />
            <Spacer height={12} />
            <div style={{ width: '100%' }}>
              <Button size="small" onClick={() => setOpen(true)} variant="text">
                Forgot your password
              </Button>
            </div>

            <Spacer height={64} />
            <LoadingButton
              type="submit"
              loading={loading && !open}
              variant="contained"
            >
              Login
            </LoadingButton>
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
          onSubmit={forgotPassword}
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
                loading={loading}
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
