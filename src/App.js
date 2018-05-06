import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PlayerFinderPage } from './players';
import rootReducer from './rootReducer';
import setupStore from './setupStore';

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
