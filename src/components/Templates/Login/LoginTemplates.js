import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/atoms';
import { Form } from 'react-final-form';
import { required } from 'components/validations/FormValidations';
import TextInput from 'components/organisms/TextInput';

const LoginTemplates = ({ onSubmit }) => {
  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit} style={{ padding: 20 }}>
            <h2>Login</h2>
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
                placeholder="First Name"
              />

              <TextInput
                finalForm
                name="password"
                type="password"
                validate={[required]}
                placeholder="password"
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

LoginTemplates.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginTemplates;
