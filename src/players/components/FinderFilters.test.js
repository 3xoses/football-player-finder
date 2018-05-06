import { shallow } from 'enzyme';
import React from 'react';
import { FinderFilters } from './FinderFilters';

describe('FinderFilters', () => {
  describe('initial state', () => {
    it('it renders correctly with the initial default filters', () => {
      const filters = {
        age: null,
        name: null,
        position: null,
      };

      const wrapper = shallow(
        <FinderFilters filters={filters}/>
      );

      expect(wrapper.find('input[name="age"]').props().value).toBe('');
      expect(wrapper.find('input[name="name"]').props().value).toBe('');
      expect(wrapper.find('select[name="position"]').props().value).toBe('');
    });

    it('it renders correctly with the initial set filters', () => {
      const filters = {
        age: 24,
        name: 'romero',
        position: 'Keeper',
      };

      const wrapper = shallow(
        <FinderFilters filters={filters}/>
      );

      expect(wrapper.find('input[name="age"]').props().value).toBe('24');
      expect(wrapper.find('input[name="name"]').props().value).toBe('romero');
      expect(wrapper.find('select[name="position"]').props().value).toBe('Keeper');
    });
  });

  describe('onInputChange', () => {
    it('it renders correctly on change age input', () => {
      const filters = {
        age: null,
        name: null,
        position: null,
      };

      const wrapper = shallow(
        <FinderFilters filters={filters}/>
      );

      wrapper.find('input[name="age"]').simulate('change', {
        target: {
          name: 'age',
          value: '24',
        },
      });

      expect(wrapper.find('input[name="age"]').props().value).toBe('24');
      expect(wrapper.find('input[name="name"]').props().value).toBe('');
      expect(wrapper.find('select[name="position"]').props().value).toBe('');
    });
  });

  describe('onSubmit', () => {
    it('it calls to filter players', () => {
      const filters = {
        age: null,
        name: null,
        position: null,
      };
      const filterPlayersSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = shallow(
        <FinderFilters filterPlayers={filterPlayersSpy} filters={filters}/>
      );

      wrapper.find('form').simulate('submit', {
        preventDefault: preventDefaultSpy,
      });

      expect(filterPlayersSpy).toHaveBeenCalledWith({
        age: null,
        name: null,
        position: null,
      });
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('it calls to filter players with values', () => {
      const filters = {
        age: 24,
        name: 'romero',
        position: 'Keeper',
      };
      const filterPlayersSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = shallow(
        <FinderFilters filterPlayers={filterPlayersSpy} filters={filters}/>
      );

      wrapper.find('form').simulate('submit', {
        preventDefault: preventDefaultSpy,
      });

      expect(filterPlayersSpy).toHaveBeenCalledWith({
        age: 24,
        name: 'romero',
        position: 'Keeper',
      });
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });
});
