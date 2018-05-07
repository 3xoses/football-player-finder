import * as types from './actionTypes';

const initialState = {
  filters: {
    age: null,
    name: null,
    position: null,
  },
  modalMessage: '',
  modalVisible: false,
  players: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CLOSE_MODAL:
      return {
        ...state,
        modalMessage: '',
        modalVisible: false,
      };
    case types.FETCH_PLAYERS_ERROR:
      return {
        ...state,
        modalMessage: action.message,
        modalVisible: true,
      };
    case types.FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.players
      };
    case types.FILTER_PLAYERS:
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
