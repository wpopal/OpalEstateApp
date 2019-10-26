import React from 'react';

import './config/ReactotronConfig';

import {Provider} from 'react-redux';
import store from './store';

import Routes from './routes/index.js';


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
