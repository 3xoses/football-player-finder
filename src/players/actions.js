import { FETCH_PLAYERS_ERROR, FETCH_PLAYERS_SUCCESS, FILTER_PLAYERS } from './actionTypes';

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
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT);
    const players = await response.json();

    dispatch(fetchPlayersSuccess(players.map(playerMapper)));
  }
  catch(e) {
    dispatch(fetchPlayersError('There was an error on fetching players'));
  }
};

export const fetchPlayersError = (players) => ({
  type: FETCH_PLAYERS_ERROR,
  players,
});

export const fetchPlayersSuccess = (players) => ({
  type: FETCH_PLAYERS_SUCCESS,
  players,
});

export const filterPlayers = (filters) => ({
  type: FILTER_PLAYERS,
  filters,
});
