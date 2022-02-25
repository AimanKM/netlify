import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Header from 'components/organisms/mastr/Header';
import Drawer from 'components/organisms/mastr/Drawer';
import Body from 'components/organisms/mastr/Body';

const MastarTemplates = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(
    JSON.parse(localStorage.getItem('open_drawer'))
  );

  const DrawerlocalStorage = (value) => {
    localStorage.setItem('open_drawer', value);
    setOpenDrawer(value);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={openDrawer} onClick={() => DrawerlocalStorage(true)} />
      <Drawer open={openDrawer} onClick={() => DrawerlocalStorage(false)} />
      <Body open={openDrawer}>{children}</Body>
    </Box>
  );
};

MastarTemplates.propTypes = {
  minNav: PropTypes.arrayOf(PropTypes.shape),
  children: PropTypes.node,
};

export default MastarTemplates;
