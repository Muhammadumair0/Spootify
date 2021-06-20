import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';
import { DiscoverProvider } from './contexts/DiscoverContext';
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <CoreLayout>
      <DiscoverProvider>
        <Routes />
      </DiscoverProvider>
    </CoreLayout>
  </React.StrictMode>,
  document.getElementById('root')
);
