import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Input } from 'components/atoms';

const SearchField = () => {
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      <Input name="search" type="search" />
      <Button label="search" type="submit" size="small" />
    </div>
  );
};

// SearchField.propTypes = {

// };

export default SearchField;
