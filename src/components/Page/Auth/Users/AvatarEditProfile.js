import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Cropper } from 'react-advanced-cropper';
import { Avatar, Button } from '@mui/material';
import { Dialog } from 'components/atoms';
import 'react-advanced-cropper/dist/style.css';
import 'react-advanced-cropper/dist/themes/compact.css';

const AvatarEditProfile = ({ onUpload }) => {
  const inputRef = useRef();
  const [image, setImage] = useState();
  const [open, setOpen] = useState();
  const [cropper, setCropper] = useState();
  const [cropData, setCropData] = useState('#');

  const onChangeInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setOpen(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onChangeCropper = (instance) => setCropper(instance);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      const formData = new FormData();
      const canvas = cropper?.getCanvas();
      setCropData(cropper.getCanvas().toDataURL());
      canvas.toBlob((blob) => {
        if (blob) {
          const { name, type } = inputRef.current.files[0];
          const file = new File([blob], name, { type });
          formData.append('file', file);
          onUpload(formData);
        }
      });
    }
    setOpen(false);
  };

  //   const onUpload = () => {
  //     const canvas = cropperRef.current?.getCanvas();
  //     if (canvas) {
  //         const form = new FormData();
  //         canvas.toBlob((blob) => {
  //             if (blob) {
  //                 form.append('file', blob);
  //                 fetch('http://example.com/upload/', {
  //                     method: 'POST',
  //                     body: form,
  //                 });
  //             }
  //         }, 'image/jpeg');
  //     }
  // };

  return (
    <div className="App">
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={onChangeInput}
        style={{ display: 'none' }}
      />
      <div className="Crop-Controls">
        <Avatar
          style={{ cursor: 'pointer' }}
          src={cropData}
          aria-label="recipe"
          onClick={() => inputRef.current?.click()}
        ></Avatar>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div>
          <Cropper
            src={image}
            onChange={onChangeCropper}
            className={'cropper'}
          />
        </div>
        <Button
          fullWidth
          size="medium"
          variant="text"
          onClick={() => getCropData()}
        >
          Save
        </Button>
      </Dialog>
    </div>
  );
};

AvatarEditProfile.propTypes = {
  onUpload: PropTypes.func,
};

export default AvatarEditProfile;
