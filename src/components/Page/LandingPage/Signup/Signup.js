import React, { useState } from 'react';
import auth, { db, errorMessage } from 'utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
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
  const [error, setError] = useState({});

  const passwordConfirm = (password) => (value) =>
    password && password !== value ? 'Password does not match' : undefined;

  const onSubmit = async ({ email, password, password_confirm }) => {
    if (password_confirm === password) {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          ({ user }) => {
            setDoc(doc(db, 'users', user.uid), {
              role: 0,
            }).then(() => history.push('/'));
          }
        );
      } catch (error) {
        setLoading(false);
        if (error.code === 'auth/weak-password') {
          setError({
            password: 'password weak, Please enter another password',
          });
        }
        if (error.code === 'auth/email-already-in-use') {
          setError({ email: 'Email already in use' });
        }
        errorMessage(error.code);
      }
    } else {
      setError({ password: 'Password does not match' });
      errorMessage('password-does-match');
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
              error={!!error?.email}
              errorMessage={error?.email}
              placeholder="E-mail"
            />
            <Spacer height={16} />
            <TextInput
              finalForm
              name="password"
              type="password"
              error={!!error?.password}
              errorMessage={error?.password}
              onChange={() => setError()}
              validate={[required]}
              placeholder="password"
            />
            <Spacer height={16} />
            <TextInput
              finalForm
              name="password_confirm"
              type="password"
              onCen
              validate={[required, passwordConfirm(values.password)]}
              placeholder="Password Confirm"
            />
            <Spacer height={64} />

            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              disabled={pristine}
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
