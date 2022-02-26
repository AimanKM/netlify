import React, { useState } from 'react';
import auth from 'utils/firebase';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form } from 'react-final-form';
import { Spacer } from 'components/atoms';
import { required } from 'components/validations/FormValidations';
import TextInput from 'components/organisms/TextInput';
import styles from './style.module.css';

const Login = () => {
  const [loading, setLoading] = useState();
  const history = useHistory();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() =>
        history.push('/')
      );
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
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
              finalForm
              name="email"
              type="email"
              validate={[required]}
              placeholder="First Name"
            />
            <Spacer height={16} />
            <TextInput
              finalForm
              name="password"
              type="password"
              validate={[required]}
              placeholder="password"
            />

            <Spacer height={64} />
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
            >
              Login
            </LoadingButton>
          </form>
        )}
      />
    </React.Fragment>
  );
};

export default Login;
