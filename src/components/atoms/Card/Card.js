import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card as CardUi, CardContent, CardHeader } from '@mui/material';

const Card = ({ src, title, subTitle, action, children }) => (
  <CardUi sx={{ maxWidth: 345,boxShadow:'0px 2px 8px rgba(0,0,0,0.32)' }} variant="outlined">
    <CardHeader
      avatar={<Avatar alt={title} src={src} />}
      action={action}
      title={title}
      subheader={subTitle}
    />
    <CardContent>{children}</CardContent>
  </CardUi>
);

Card.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node,
  action: PropTypes.node,
};

export default Card;
