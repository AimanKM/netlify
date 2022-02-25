import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

/**
 * Primary UI component for user interaction
 */
export const Input = ({ type, name, size }) => {
  return (
    <input
      className={`storybook-input storybook-input--${size}`}
      type={type}
      name={name}
      size={size}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  size: 'medium',
  type: 'text',
};
