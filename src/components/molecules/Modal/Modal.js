import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ModalMui from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';

const Modal = ({ open, onClose, children }) => {
  const style = {
    borderRadius: 2,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  return (
    <ModalMui
      disableAutoFocus
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={style}>{children}</Box>
    </ModalMui>
  );
};

Modal.defaultProps = {
  open: false,
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
