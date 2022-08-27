import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card as CardUi, CardContent, CardHeader } from '@mui/material';

const Card = ({ src, name, birthDate, action, children }) => (
  <CardUi sx={{ maxWidth: 345 }} variant="outlined">
    <CardHeader
      avatar={<Avatar alt="Remy Sharp" src={src} />}
      action={action}
      title={name}
      subheader={birthDate}
    />
    <CardContent>{children}</CardContent>
  </CardUi>
);

Card.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  birthDate: PropTypes.string,
  children: PropTypes.node,
  action: PropTypes.node,
};

export default Card;
