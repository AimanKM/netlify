import React from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Form } from 'react-final-form';
import { Spacer, TextInput, Flex } from 'components/atoms';
import { required, email } from 'components/validations/FormValidations';
import styles from '../style.module.css';

const FormAddUser = ({ fetching = false, onSubmit }) => {
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
              validate={[required, email]}
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
            loading={fetching}
            disabled={pristine || fetching || !!checkPasswordConfirm(values)}
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
  fetching: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default FormAddUser;
