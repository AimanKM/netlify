import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion/dist/framer-motion';
import './button.css';

export const Button = ({ primary, size, label, ...props }) => {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: '0 0 5px 2px #bdbdbd',
      transition: { duration: 0.5 },
    },
  };
  const mode = primary ? 'button--primary' : 'button--secondary';
  return (
    <motion.button
      whileHover="hover"
      variants={buttonVariants}
      className={['button', `button--${size}`, mode].join(' ')}
      {...props}
    >
      {label}
    </motion.button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
