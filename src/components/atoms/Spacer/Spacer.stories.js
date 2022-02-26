import React from 'react';

import Spacer from './Spacer';

export default {
  title: 'Auxiliary/Spacer',
  component: Spacer,
};

const Template = (args) => <Spacer {...args} />;

export const Width = Template.bind({});
Width.args = {
  width: '7px',
};
