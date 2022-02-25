import React from 'react';
import SignupTemplates from 'components/Templates/Signup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from 'utils/firebase';

const Signup = () => {
  const onSubmit = async ({ email, password }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', user);
    } catch (error) {
      console.log('error.me', error.message);
    }
  };

  return <SignupTemplates onSubmit={onSubmit} />;
};

export default Signup;
