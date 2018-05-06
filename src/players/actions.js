import * as types from './actionTypes';

const toAge = (dateOfBirth) => {
  const now = new Date();
  const birthDate = new Date(dateOfBirth);
  const monthDiff = now.getMonth() - birthDate.getMonth();
  let age = now.getFullYear() - birthDate.getFullYear();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const playerMapper = player => ({
  ...player,
  age: toAge(player.dateOfBirth),
});

export const fetchPlayers = () => async (dispatch, getState) => {
  try {
    dispatch(fetchPlayersRequest());

    const response = await fetch(process.env.REACT_APP_API_ENDPOINT);
    const players = await response.json();

    dispatch(fetchPlayersSuccess(players.map(playerMapper)));
  }
  catch(e) {
    dispatch(fetchPlayersError('There was an error on fetching players'));
  }
};

export const fetchPlayersError = (message) => ({
  type: types.FETCH_PLAYERS_ERROR,
  message,
});

export const fetchPlayersRequest = () => ({
  type: types.FETCH_PLAYERS_REQUEST,
});

export const fetchPlayersSuccess = (players) => ({
  type: types.FETCH_PLAYERS_SUCCESS,
  players,
});

export const filterPlayers = (filters) => ({
  type: types.FILTER_PLAYERS,
  filters,
});
