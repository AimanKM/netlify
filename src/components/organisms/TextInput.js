import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import composeValidators from 'components/validations/composeValidators';
import TextField from '@mui/material/TextField';

const TextInput = ({ finalForm, name, validate, label, onBlur, ...props }) =>
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
          error={meta.touched && meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
TextInput.propTypes = {
  finalForm: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  validate: PropTypes.array,
  onBlur: PropTypes.func,
};

export default TextInput;
