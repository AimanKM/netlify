import React from 'react';
import PropTypes from 'prop-types';
import { Dialog as DialogMui, Typography } from '@mui/material';
import { ReactComponent as CloseIcon } from 'components/atoms/icon/x-close.svg';
import styles from './style.module.css';

const Dialog = ({ open, onClose, title, children }) => (
  <DialogMui
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <>
      {title && (
        <div className={styles.header}>
          <Typography variant="h5">{title}</Typography>
          <CloseIcon className={styles.closeIcon} onClick={onClose} />
        </div>
      )}

      <div className={styles.container}>{children}</div>
    </>
  </DialogMui>
);

Dialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Dialog;
