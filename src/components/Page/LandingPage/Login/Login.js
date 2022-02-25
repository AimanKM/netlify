import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginTemplates from 'components/Templates/Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from 'utils/firebase';

const Login = () => {
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

  return <LoginTemplates onSubmit={onSubmit} />;
};

export default Login;
