import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Spacer } from 'components/atoms';
import { required } from 'components/validations/FormValidations';
import TextInput from 'components/organisms/TextInput';
import styles from './style.module.css';
import { supabase } from 'utils/supabase';
import { toast } from 'react-toastify';

const Signup = () => {
  const { auth } = supabase;
  const [loading, setLoading] = useState();

  const onSubmit = ({ email, password, password_confirm }) => {
    if (password_confirm === password) {
      setLoading(true);
      auth.signUp({ email, password }).then(({ session, data, error }) => {
        if (session) console.log('on sessinon do udates user name', data);
        if (error) toast.error(error.message);

        // const user = supabase.auth.user();
        // const updates = {
        //   id: user.id,
        //   username:'AAAAAAAAAAA',
        //   updated_at: new Date(),
        // };
        // supabase.from('profiles').upsert(updates).then((e) => console.log('e', e));
        setLoading(false);
      });
    } else toast.error('Password does not match');
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
              // error={!!error?.email}
              // errorMessage={error?.email}
            />
            <Spacer height={16} />
            <TextInput
              label="password"
              name="password"
              type="password"
              // error={!!error?.password}
              // errorMessage={error?.password}
              // onChange={() => setError()}
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
