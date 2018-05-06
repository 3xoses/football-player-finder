import { FETCH_PLAYERS_SUCCESS, FILTER_PLAYERS } from './actionTypes';

const initialState = {
  filters: {
    age: null,
    name: null,
    position: null,
  },
  players: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.players
      };
    case FILTER_PLAYERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.filters,
        },
      };
    default:
      return state;
  }
};
