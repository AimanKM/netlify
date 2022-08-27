import React from 'react';
import PropTypes from 'prop-types';
import { Menu as MenuUi } from '@mui/material';

const Menu = ({ openAnchorEl, onClose, children }) => (
  <MenuUi
    anchorEl={openAnchorEl}
    open={!!openAnchorEl}
    onClose={onClose}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1,
        ml: '3px',
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
  >
    {children}
  </MenuUi>
);

Menu.propTypes = {
  openAnchorEl: PropTypes.node,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Menu;
