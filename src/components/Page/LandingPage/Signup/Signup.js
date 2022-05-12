import React, { useState } from 'react';
import auth, { db, errorMessage } from 'utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from 'react-final-form';
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Spacer } from 'components/atoms';
import { required } from 'components/validations/FormValidations';
import TextInput from 'components/organisms/TextInput';
import styles from './style.module.css';

const Signup = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState({});

  const onSubmit = async (
    { email, password, password_confirm },
    { change }
  ) => {
    if (password_confirm === password) {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          ({ user }) => {
            setDoc(doc(db, 'users', user.uid), {
              id:user.uid,
              email: email,
              role: 0,
            });
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
        if (error.code === 'auth/invalid-email') {
          setError({ email: 'Thrown if the email address is not valid' });
        }
        errorMessage(error.code);
      }
    } else {
      change('password_confirm', '');
      setError({ password: 'Password does not match' });
      errorMessage('password-does-match');
    }
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit} className={styles.container}>
            <Typography variant="h5" gutterBottom>
              Signup
            </Typography>
            <Spacer height={16} />

            <TextInput
              label="E-mail"
              name="email"
              type="email"
              validate={[required]}
              error={!!error?.email}
              errorMessage={error?.email}
            />
            <Spacer height={16} />
            <TextInput
              label="password"
              name="password"
              type="password"
              error={!!error?.password}
              errorMessage={error?.password}
              onChange={() => setError()}
              validate={[required]}
            />
            <Spacer height={16} />
            <TextInput
              label="Password Confirm"
              name="password_confirm"
              type="password"
              validate={[required]}
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
