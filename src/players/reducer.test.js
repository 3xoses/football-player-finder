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
      modalMessage: '',
      modalVisible: false,
      players: [],
    });
  });

  it('should handle CLOSE_MODAL', () => {
    expect(
      reducer(undefined, {
        type: types.CLOSE_MODAL,
      })
    ).toEqual({
      filters: {
        age: null,
        name: null,
        position: null,
      },
      modalMessage: '',
      modalVisible: false,
      players: [],
    });

    expect(
      reducer({
        filters: {
          age: null,
          name: null,
          position: null,
        },
        modalMessage: 'foo',
        modalVisible: true,
        players: [
          {
            name: 'David de Gea',
          },
          {
            name: 'Sergio Romero',
          },
        ],
      }, {
        type: types.CLOSE_MODAL,
      })
    ).toEqual({
      filters: {
        age: null,
        name: null,
        position: null,
      },
      modalMessage: '',
      modalVisible: false,
      players: [
        {
          name: 'David de Gea',
        },
        {
          name: 'Sergio Romero',
        },
      ],
    });
  });

  it('should handle FETCH_PLAYERS_ERROR', () => {
    expect(
      reducer(undefined, {
        type: types.FETCH_PLAYERS_ERROR,
        message: 'error',
      })
    ).toEqual({
      filters: {
        age: null,
        name: null,
        position: null,
      },
      modalMessage: 'error',
      modalVisible: true,
      players: [],
    });

    expect(
      reducer({
        filters: {
          age: null,
          name: null,
          position: null,
        },
        modalMessage: 'foo',
        modalVisible: true,
        players: [
          {
            name: 'David de Gea',
          },
          {
            name: 'Sergio Romero',
          },
        ],
      }, {
        type: types.FETCH_PLAYERS_ERROR,
        message: 'error',
      })
    ).toEqual({
      filters: {
        age: null,
        name: null,
        position: null,
      },
      modalMessage: 'error',
      modalVisible: true,
      players: [
        {
          name: 'David de Gea',
        },
        {
          name: 'Sergio Romero',
        },
      ],
    });
  });

  it('should handle FETCH_PLAYERS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.FETCH_PLAYERS_SUCCESS,
        players: [
          {
            name: 'Romelu Lukaku',
          },
        ],
      })
    ).toEqual({
      filters: {
        age: null,
        name: null,
        position: null,
      },
      modalMessage: '',
      modalVisible: false,
      players: [
        {
          name: 'Romelu Lukaku',
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
        modalMessage: '',
        modalVisible: false,
        players: [
          {
            name: 'Romelu Lukaku',
          },
          {
            name: 'Romelu Lukaku',
          },
        ],
      }, {
        type: types.FETCH_PLAYERS_SUCCESS,
        players: [
          {
            name: 'David de Gea',
          },
          {
            name: 'Sergio Romero',
          },
        ],
      })
    ).toEqual({
      filters: {
        age: null,
        name: null,
        position: null,
      },
      modalMessage: '',
      modalVisible: false,
      players: [
        {
          name: 'David de Gea',
        },
        {
          name: 'Sergio Romero',
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
      modalMessage: '',
      modalVisible: false,
      players: [],
    });

    expect(
      reducer({
        filters: {
          age: 24,
          name: null,
          position: null,
        },
        modalMessage: '',
        modalVisible: false,
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
      modalMessage: '',
      modalVisible: false,
      players: [],
    });

    expect(
      reducer({
        filters: {
          age: 24,
          name: 'romero',
          position: null,
        },
        modalMessage: '',
        modalVisible: false,
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
      modalMessage: '',
      modalVisible: false,
      players: [
        {
          name: 'Sergio Romero'
        }
      ],
    });
  });
});
