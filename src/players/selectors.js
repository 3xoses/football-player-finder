import { createSelector } from 'reselect';
import { NAME } from './constants';

const getVisibilityFilters = (state) => state[NAME].filters;
const getPlayers = (state) => state[NAME].players;

const includesWords = (string, substring) => {
  return substring.split(/ +/).every(word => {
    return string.toLowerCase().includes(word.toLowerCase());
  });
};

export const getVisiblePlayers = createSelector(
  [
    getVisibilityFilters,
    getPlayers,
  ],
  (filters, players) => {
    return players.filter(player => {
      return (!filters.age || player.age === filters.age) &&
        (!filters.name || includesWords(player.name, filters.name)) &&
        (!filters.position || player.position === filters.position);
    });
  }
);
