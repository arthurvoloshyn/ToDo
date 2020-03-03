import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../src/components/button/button';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Button />, div);
  ReactDOM.unmountComponentAtNode(div);
});
