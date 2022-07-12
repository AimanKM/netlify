import React from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Form } from 'react-final-form';
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import { storage } from 'utils/firebase';
import { Spacer, TextInput, Flex } from 'components/atoms';
import { required, email } from 'components/validations/FormValidations';
import AvatarEditProfile from './AvatarEditProfile';
import styles from './style.module.css';

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
          <div>
            <AvatarEditProfile
              onUpload={(formData) => {
                const file = formData.get('file');
                console.log('file', file);
                // const values = [...formData.entries()];
                // console.log(values);
                // const storageRef = ref(storage, `files/${file.name}`);
                // uploadBytesResumable(storageRef, file).then((snapshot) => {
                //   console.log('snapshot', snapshot);
                //   getDownloadURL(snapshot.ref).then((url) => {
                //     console.log('File available at', url);
                //   });
                // });
              }}
            />
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
