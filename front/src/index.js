import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ScrollToTop from './components/layout/ScrollToTop';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById('root')
);
