import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import TextField from '@mui/material/TextField';
import { composeValidators } from 'components/validations/FormValidations';

const TextInput = ({
  name,
  validate = [],
  label,
  onBlur,
  onChange,
  errorMessage,
  ...props
}) => (
  <Field
    label={label}
    name={name}
    validate={composeValidators(...validate)}
    render={({ input, meta }) => (
      <TextField
        label={label}
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
        error={errorMessage || (meta.touched && meta.error)}
        helperText={errorMessage || (meta.touched && meta.error)}
      />
    )}
  />
);
TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  validate: PropTypes.array,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default TextInput;
