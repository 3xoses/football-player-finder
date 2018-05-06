import { shallow } from 'enzyme';
import React from 'react';
import { PlayerFinderPage } from './PlayerFinderPage';

describe('PlayerFinderPage', () => {
  it('it renders correctly and calls to fetchPlayers', () => {
    const fetchPlayersSpy = jest.fn();

    const wrapper = shallow(
      <PlayerFinderPage fetchPlayers={fetchPlayersSpy}/>
    );

    expect(fetchPlayersSpy).toHaveBeenCalled();
  }); 
});
