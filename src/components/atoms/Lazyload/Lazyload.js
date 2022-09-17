import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Lazyload = ({ url }) => {

  return (
    <>
      <div style={{ position: 'relative' }}>
        <LazyLoadImage
          // src={url}
          alt="aaaa"
          width={40}
          height={40}
          effect="blur"
          delayTime={0}
          placeholderSrc={url}
          // beforeLoad={()=> {debugger;} }
          // delayMethod="debounce"
          style={{ zIndex: 9999}}
        />
        <div style={{ position: 'absolute', top: 0 ,zIndex: -1}}>Wait...</div>
      </div>
    </>
  );
};
// lazy-load-image-background blur lazy-load-image-loaded
// lazy-load-image-background blur

// background-image: url("https://storage.googleapis.com/netlify-b4b13.appspot.com/uesr_photoURL%2Fabe9a465-9d24-4744-8774-9ab96423ba2b-wp4723164.jpg"); background-size: 100% 100%; color: transparent; display: inline-block; height: 40px; width: 40px;

Lazyload.propTypes = {
  url: PropTypes.string,
};

export default Lazyload;
