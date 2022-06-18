import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import { Avatar } from '@mui/material';
import { Dialog } from 'components/atoms';
import 'cropperjs/dist/cropper.css';

const AvatarEditProfile = () => {
  const inputRef = useRef();
  const [image, setImage] = useState();
  const [open, setOpen] = useState();
  const [cropper, setCropper] = useState();
  // const [cropData, setCropData] = useState('#');

  const onChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setOpen(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // const getCropData = () => {
  //   if (typeof cropper !== 'undefined') {
  //     setCropData(cropper.getCroppedCanvas().toDataURL());
  //   }
  // };

  return (
    <div className="App">
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <div className="Crop-Controls">
        <Avatar
        style={{cursor: 'pointer'}}
          src={cropper?.getCroppedCanvas()?.toDataURL()}
          aria-label="recipe"
          onClick={() => inputRef.current?.click()}
        ></Avatar>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div>
        <Cropper
          guides
          responsive
          src={image}
          viewMode={1}
          zoomTo={0.5}
          autoCropArea={1}
          background={false}
          minCropBoxWidth={10}
          minCropBoxHeight={10}
          initialAspectRatio={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          // style={{ height: 400, width: '100%' }}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
        </div>
        {/* <button style={{ float: "right" }} onClick={getCropData}>
          Crop Image
        </button> */}
      </Dialog>
    </div>
  );
};
export default AvatarEditProfile;
