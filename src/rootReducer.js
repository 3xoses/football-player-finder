import { combineReducers } from 'redux';
import players from './players';

export default combineReducers({
  [players.constants.NAME]: players.reducer,
});
