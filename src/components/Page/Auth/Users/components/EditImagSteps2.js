import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { AvatarEditImag, Flex } from 'components/atoms';
import { ReactComponent as UploadIcon } from 'components/atoms/icon/upload.svg';
import styles from '../style.module.css';

const EditImagSteps2 = ({ fetching, onUpload }) => {
  const [formData, setFormData] = useState();
  return (
    <Flex gap={7} className={clsx(styles.formAddUser, styles.avatarCenter)}>
      <Typography variant="h6">Update photo</Typography>
      <AvatarEditImag
        avatarWidthHeight={120}
        insideAvatar={<UploadIcon className={styles.uploadIcon} />}
        onUpload={(file) => setFormData(file)}
      />
      <LoadingButton
        onClick={() => onUpload(formData)}
        disabled={fetching || !formData}
        variant="contained"
      >
        Update
      </LoadingButton>
    </Flex>
  );
};

EditImagSteps2.propTypes = {
  fetching: PropTypes.bool,
  onUpload: PropTypes.node,
};

export default EditImagSteps2;
