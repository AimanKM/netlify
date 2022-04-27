import React from 'react';
import PropTypes from 'prop-types';
import { HeaderMain } from 'components/molecules';
import { Spacer } from 'components/atoms';

const Body = ({ open, children }) => {
  return (
    <HeaderMain open={open}>
      <Spacer height={64} />
      {children}
    </HeaderMain>
  );
};

Body.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
};

export default Body;
