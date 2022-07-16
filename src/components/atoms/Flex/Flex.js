import React from 'react';
import PropTypes from 'prop-types';

const Flex = ({ gap, className, style, children }) => (
  <div className={className} style={{ display: 'flex', gap, ...style }}>
    {children}
  </div>
);

Flex.propTypes = {
  gap: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape(),
  children: PropTypes.node,
};

export default Flex;
