import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// import { initFacebookSdk } from './initFacebook'

// initFacebookSdk().then(startApp);

// function startApp() {
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// }


