import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import * as types from './actionTypes';
import { NAME } from './constants';

const mockStore = configureMockStore([thunk]);

describe('players actions', () => {
  it('should create an action to throw the error', () => {
    const message = 'Finish docs'
    const expectedAction = {
      type: types.FETCH_PLAYERS_ERROR,
      message,
    };

    expect(actions.fetchPlayersError(message)).toEqual(expectedAction);
  });

  it('should create an action to set the players', () => {
    const players = [
      {},
      {},
    ];
    const expectedAction = {
      type: types.FETCH_PLAYERS_SUCCESS,
      players,
    };

    expect(actions.fetchPlayersSuccess(players)).toEqual(expectedAction);
  });

  it('should create and action to add players filters', () => {
    const filters = [
      name: 'romero',
    ];
    const expectedAction = {
      type: types.FILTER_PLAYERS,
      filters,
    };

    expect(actions.filterPlayers(filters)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', async () => {
    const baseTime = new Date(2018, 4, 5);
    const OriginalDate = Date;

    jest.spyOn(global, 'Date').mockImplementation((...args) => {
      if (!args.length) {
        return baseTime;
      }

      return new OriginalDate(...args);
    });

    fetchMock
      .getOnce(process.env.REACT_APP_API_ENDPOINT, {
        body: [
          {
            "contractUntil" : "2022-06-30",
            "dateOfBirth" : "1993-05-03",
            "jerseyNumber" : 9,
            "name" : "Romelu Lukaku",
            "nationality" : "Belgium",
            "position" : "Centre-Forward"
          },
          {
            "contractUntil" : "2019-06-30",
            "dateOfBirth" : "1990-11-07",
            "jerseyNumber" : 1,
            "name" : "David de Gea",
            "nationality" : "Spain",
            "position" : "Keeper"
          },
        ],
        headers: {
          'content-type': 'application/json',
        },
      });

    const expectedActions = [
      {
        type: types.FETCH_PLAYERS_REQUEST,
      },
      {
        type: types.FETCH_PLAYERS_SUCCESS,
        players: [
          {
            "age": 25,
            "contractUntil" : "2022-06-30",
            "dateOfBirth" : "1993-05-03",
            "jerseyNumber" : 9,
            "name" : "Romelu Lukaku",
            "nationality" : "Belgium",
            "position" : "Centre-Forward"
          }, {
            "age": 27,
            "contractUntil" : "2019-06-30",
            "dateOfBirth" : "1990-11-07",
            "jerseyNumber" : 1,
            "name" : "David de Gea",
            "nationality" : "Spain",
            "position" : "Keeper"
          }
        ],
      }
    ];

    const store = mockStore({
      [NAME]: {
        players: [],
      },
    });

    await store.dispatch(actions.fetchPlayers());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
