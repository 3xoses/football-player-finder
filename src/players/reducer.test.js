import reducer from './reducer';
import * as types from './actionTypes';

describe('players reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      filters: {
        age: null,
        name: null,
        position: null,
      },
      players: [],
    });
  });

  it('should handle FETCH_PLAYERS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.FETCH_PLAYERS_SUCCESS,
        players: [
          {
            name:  'Romelu Lukaku',
          },
        ],
      })
    ).toEqual({
      filters: {
        age: null,
        name: null,
        position: null,
      },
      players: [
        {
          name:  'Romelu Lukaku',
        },
      ],
    });

    expect(
      reducer({
        filters: {
          age: null,
          name: null,
          position: null,
        },
        players: [
          {
            name:  'Romelu Lukaku',
          },
          {
            name:  'Romelu Lukaku',
          },
        ],
      }, {
        type: types.FETCH_PLAYERS_SUCCESS,
        players: [
          {
            name:  'David de Gea',
          },
          {
            name:  'Sergio Romero',
          },
        ],
      })
    ).toEqual({
      filters: {
        age: null,
        name: null,
        position: null,
      },
      players: [
        {
          name:  'David de Gea',
        },
        {
          name:  'Sergio Romero',
        },
      ],
    });
  });

  it('should handle FILTER_PLAYERS', () => {
    expect(
      reducer(undefined, {
        type: types.FILTER_PLAYERS,
        filters: {
          age: 24,
        },
      })
    ).toEqual({
      filters: {
        age: 24,
        name: null,
        position: null,
      },
      players: [],
    });

    expect(
      reducer({
        filters: {
          age: 24,
          name: null,
          position: null,
        },
        players: [],
      }, {
        type: types.FILTER_PLAYERS,
        filters: {
          name: 'romero',
        },
      })
    ).toEqual({
      filters: {
        age: 24,
        name: 'romero',
        position: null,
      },
      players: [],
    });

    expect(
      reducer({
        filters: {
          age: 24,
          name: 'romero',
          position: null,
        },
        players: [
          {
            name: 'Sergio Romero'
          }
        ],
      }, {
        type: types.FILTER_PLAYERS,
        filters: {
          name: null,
        },
      })
    ).toEqual({
      filters: {
        age: 24,
        name: null,
        position: null,
      },
      players: [
        {
          name: 'Sergio Romero'
        }
      ],
    });
  });
});
