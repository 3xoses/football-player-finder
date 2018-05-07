import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PlayerFinderPage } from './players';
import setupStore from './setupStore';

import 'bootstrap/dist/css/bootstrap.css';

const store = setupStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PlayerFinderPage />
      </Provider>
    );
  }
}

export default App;
