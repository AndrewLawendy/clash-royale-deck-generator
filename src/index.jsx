/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';

import './scss/main.scss';

const title = 'React with Webpack and Babel';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app'),
);

module.hot.accept();
