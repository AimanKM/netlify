import React from 'react';
import PropTypes from 'prop-types';

const Spacer = ({
  width, height, style, ...rest
}) => (
  <div {...rest} style={{ ...style, width, height }} />
);

Spacer.defaultProps = {
  width: '4px',
  height: '100%',
};

Spacer.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.shape(),
};

export default Spacer;
