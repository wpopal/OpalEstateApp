import React from 'react';

import '~/config/ReactotronConfig';

import { Provider } from 'react-redux';
import store from './store';

import Routes from '~/routes/index.js';

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
