import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/atoms';
import { Form } from 'react-final-form';
import { required } from 'components/validations/FormValidations';
import TextInput from 'components/organisms/TextInput';

const SignupTemplates = ({ onSubmit }) => {
  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit} style={{ padding: 20 }}>
            <h2>Signup</h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 'fit-content',
                gap: 25,
              }}
            >
              <TextInput
                finalForm
                name="email"
                type="email"
                validate={[required]}
                placeholder="E-mail"
              />

              <TextInput
                finalForm
                name="password"
                type="password"
                validate={[required]}
                placeholder="password"
              />

              <TextInput
                finalForm
                name="password_confirm"
                type="password"
                validate={[required]}
                placeholder="Password Confirm"
              />
            </div>
            <br />
            <Button label="submit" disabled={pristine} type="submit" primary />
          </form>
        )}
      />
    </React.Fragment>
  );
};

SignupTemplates.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignupTemplates;
