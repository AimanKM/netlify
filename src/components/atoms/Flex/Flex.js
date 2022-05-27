import React from 'react';
import PropTypes from 'prop-types';

const Flex = ({ gap, children }) => (
  <div style={{ display: 'flex', gap }}>{children}</div>
);

Flex.propTypes = {
  gap: PropTypes.node,
  children: PropTypes.node,
};

export default Flex;
