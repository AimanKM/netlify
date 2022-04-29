import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import composeValidators from 'components/validations/composeValidators';
import TextField from '@mui/material/TextField';

const TextInput = ({
  finalForm,
  name,
  validate=[],
  label,
  onBlur,
  onChange,
  errorMessage,
  error,
  ...props
}) =>
  !finalForm ? (
    <TextField {...props} label={label} />
  ) : (
    <Field
      label={label}
      name={name}
      validate={composeValidators(...validate)}
      render={({ input, meta }) => (
        <TextField
          id={name}
          {...input}
          {...props}
          onBlur={onBlur}
          onChange={({ target }) => {
            if (onChange) {
              onChange(target.value);
            }
            input.onChange(target.value);
          }}
          error={error || (meta.touched && meta.error)}
          helperText={(error && errorMessage) || (meta.touched && meta.error)}
        />
      )}
    />
  );
TextInput.propTypes = {
  finalForm: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  validate: PropTypes.array,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default TextInput;
