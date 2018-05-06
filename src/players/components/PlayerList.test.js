import { shallow } from 'enzyme';
import React from 'react';
import { PlayerList } from './PlayerList';

describe('PlayerList', () => {
  it('it renders correctly for empty players', () => {
    const players = [];

    const wrapper = shallow(
      <PlayerList players={players}/>
    );

    expect(wrapper.find('tbody').children().length).toBe(0);
  });

  it('it renders correctly for n players', () => {
    const players = [
      {
        age: 24,
        name: 'Romelu Lukaku',
        nationality: 'Belgium',
        position: 'Centre-Forward',
      },
      {
        age: 27,
        name: 'David de Gea ',
        nationality: 'Spain',
        position: 'Keeper',
      },
    ];

    const wrapper = shallow(
      <PlayerList players={players}/>
    );

    expect(wrapper.find('tbody').children().length).toBe(2);
  });
});
