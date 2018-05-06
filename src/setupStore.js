import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
