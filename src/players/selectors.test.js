import { NAME } from './constants';
import { getVisiblePlayers } from './selectors';

describe('players selectors', () => {
  describe('getVisiblePlayers', () => {
    let mockPlayers;

    beforeEach(() => {
      mockPlayers = [
        {
          age: 24,
          contractUntil: '2022-06-30',
          dateOfBirth: '1993-05-13',
          jerseyNumber: 9,
          name: 'Romelu Lukaku',
          nationality: 'Belgium',
          position: 'Centre-Forward',
        }, {
          age: 27,
          contractUntil: '2019-06-30',
          dateOfBirth: '1990-11-07',
          jerseyNumber: 1,
          name: 'David de Gea',
          nationality: 'Spain',
          position: 'Keeper',
        }, {
          age: 31,
          contractUntil: '2021-06-30',
          dateOfBirth: '1987-02-22',
          jerseyNumber: 20,
          name: 'Sergio Romero',
          nationality: 'Argentina',
          position: 'Keeper',
        }, {
          age: 24,
          contractUntil: '2020-06-30',
          dateOfBirth: '1994-04-12',
          jerseyNumber: 3,
          name: 'Eric Bailly',
          nationality: "Cote d'Ivoire",
          position: 'Centre-Back',
        },
      ];
    });

    it('it should not filter anything', () => {
      const mockState = {
        [NAME]: {
          filters: {
            age: null,
            name: null,
            position: null,
          },
          players: mockPlayers,
        },
      };

      expect(getVisiblePlayers(mockState).length).toBe(4);
    });

    it('it should filter by age', () => {
      const mockState = {
        [NAME]: {
          filters: {
            age: 24,
            name: null,
            position: null,
          },
          players: mockPlayers,
        },
      };
      const result = getVisiblePlayers(mockState);

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Romelu Lukaku');
      expect(result[1].name).toBe('Eric Bailly');
    });

    it('it should filter by age and name', () => {
      const mockState = {
        [NAME]: {
          filters: {
            age: 24,
            name: 'romelu',
            position: null,
          },
          players: mockPlayers,
        },
      };
      const result = getVisiblePlayers(mockState);

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Romelu Lukaku');
    });

    it('it should filter by age, name and position', () => {
      const mockState = {
        [NAME]: {
          filters: {
            age: 24,
            name: 'romelu',
            position: 'Keeper',
          },
          players: mockPlayers,
        },
      };
      const result = getVisiblePlayers(mockState);

      expect(result.length).toBe(0);
    });

    it('it should filter by name, partial word', () => {
      const mockState = {
        [NAME]: {
          filters: {
            age: null,
            name: 'rome',
            position: null,
          },
          players: mockPlayers,
        },
      };
      const result = getVisiblePlayers(mockState);

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Romelu Lukaku');
      expect(result[1].name).toBe('Sergio Romero');
    });

    it('it should filter by name, many words', () => {
      const mockState = {
        [NAME]: {
          filters: {
            age: null,
            name: 'romelu luk',
            position: null,
          },
          players: mockPlayers,
        },
      };
      const result = getVisiblePlayers(mockState);

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Romelu Lukaku');
    });

    it('it should filter by position', () => {
      const mockState = {
        [NAME]: {
          filters: {
            age: null,
            name: null,
            position: 'Keeper',
          },
          players: mockPlayers,
        },
      };
      const result = getVisiblePlayers(mockState);

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('David de Gea');
      expect(result[1].name).toBe('Sergio Romero');
    });
  });
});