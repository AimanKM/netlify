import React from 'react';
import PropTypes from 'prop-types';
import CardUi from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';

const Card = ({ src, name, birthDate, action, children }) => {
  return (
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
};

Card.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  birthDate: PropTypes.string,
  children: PropTypes.node,
  action: PropTypes.node,
};

export default Card;
