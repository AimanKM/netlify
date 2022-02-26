import React, { useState } from 'react';
import auth from 'utils/firebase';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from 'react-final-form';
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Spacer } from 'components/atoms';
import { required } from 'components/validations/FormValidations';
import TextInput from 'components/organisms/TextInput';
import styles from './style.module.css';

const Signup = () => {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const onSubmit = async ({ email, password, password_confirm }) => {
    if (password_confirm === password) {
      setError();
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(() =>
          history.push('/')
        );
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    } else {
      setError('Password does not match');
    }
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, pristine, values }) => (
          <form onSubmit={handleSubmit} className={styles.container}>
            <Typography variant="h5" gutterBottom>
              Signup
            </Typography>
            <Spacer height={16} />

            <TextInput
              finalForm
              name="email"
              type="email"
              validate={[required]}
              placeholder="E-mail"
            />
            <Spacer height={16} />
            <TextInput
              finalForm
              name="password"
              type="password"
              validate={[required]}
              placeholder="password"
            />
            <Spacer height={16} />
            <TextInput
              finalForm
              name="password_confirm"
              type="password"
              validate={[required]}
              placeholder="Password Confirm"
              error={
                error ||
                (values.password_confirm &&
                  values.password !== values.password_confirm)
                  ? 'Password does not match'
                  : null
              }
            />
            <Spacer height={64} />

            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              disabled={pristine || values.password !== values.password_confirm}
            >
              Signup
            </LoadingButton>
          </form>
        )}
      />
    </React.Fragment>
  );
};

export default Signup;
