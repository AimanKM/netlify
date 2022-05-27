import React from 'react';
import PropTypes from 'prop-types';
import CardUi from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import { ReactComponent as EyeIcon } from 'components/atoms/icon/eye.svg';

const Card = ({ src, name, birthDate, icon, onClick, children }) => {
  return (
    <CardUi sx={{ maxWidth: 345 }} variant="outlined">
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src={src} />
        }
        action={
          icon && (
            <div style={{ cursor: 'pointer', margin: '5px 0 0 10px' }}>
              <EyeIcon
                onClick={onClick}
                style={{ fill: '#a4b3c3', width: 20, height: 20 }}
              />
            </div>
          )
        }
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
  onClick: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.bool,
};

export default Card;
