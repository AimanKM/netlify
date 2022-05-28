import React from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Form } from 'react-final-form';
import { Spacer, TextInput, Flex } from 'components/atoms';
import { required } from 'components/validations/FormValidations';
import AvatarEditProfile from './AvatarEditProfile';
import styles from './style.module.css';

const FormAddUser = ({ onSubmit }) => {
  const checkPasswordConfirm = ({ password, password_confirm }) => {
    if (password && password_confirm && password !== password_confirm) {
      return 'Password does not match';
    }
    return false;
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{}}
      render={({ handleSubmit, pristine, values }) => (
        <form onSubmit={handleSubmit} className={styles.formAddUser}>
          <div>
            <AvatarEditProfile />
          </div>
          <Flex gap={8}>
            <TextInput
              label="Display Name"
              name="display_name"
              validate={[required]}
            />
            <TextInput
              label="E-mail"
              name="email"
              type="email"
              validate={[required]}
            />
          </Flex>
          <Spacer height={16} />

          <Flex gap={8}>
            <TextInput
              label="Password"
              name="password"
              type="password"
              validate={[required]}
            />
            <TextInput
              label="Password Confirm"
              name="password_confirm"
              type="password"
              validate={[required]}
              errorMessage={checkPasswordConfirm(values)}
            />
          </Flex>
          <Spacer height={32} />

          <LoadingButton
            type="submit"
            // loading={loading}
            disabled={pristine || !!checkPasswordConfirm(values)}
            variant="contained"
          >
            Send
          </LoadingButton>
        </form>
      )}
    />
  );
};

FormAddUser.propTypes = {
  onSubmit: PropTypes.func,
};

export default FormAddUser;
