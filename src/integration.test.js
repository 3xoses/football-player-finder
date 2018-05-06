import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PlayerFinderPage } from './players';
import setupStore from './setupStore';

const sleep = (n) => new Promise(resolve => setTimeout(resolve, n));

describe('App', () => {
  let mockPlayers;
  let store;

  beforeEach(() => {
    mockPlayers = [
      {
        contractUntil: '2022-06-30',
        dateOfBirth: '1993-05-13',
        jerseyNumber: 9,
        name: 'Romelu Lukaku',
        nationality: 'Belgium',
        position: 'Centre-Forward',
      },
      {
        contractUntil: '2019-06-30',
        dateOfBirth: '1990-11-07',
        jerseyNumber: 1,
        name: 'David de Gea',
        nationality: 'Spain',
        position: 'Keeper',
      },
      {
        contractUntil: '2021-06-30',
        dateOfBirth: '1987-02-22',
        jerseyNumber: 20,
        name: 'Sergio Romero',
        nationality: 'Argentina',
        position: 'Keeper',
      },
      {
        contractUntil: '2020-06-30',
        dateOfBirth: '1994-04-12',
        jerseyNumber: 3,
        name: 'Eric Bailly',
        nationality: "Cote d'Ivoire",
        position: 'Centre-Back',
      },
    ];

    store = setupStore();
  })

  afterEach(() => {
    fetchMock.restore();
  });

  it('it renders correctly with the initial filters', async () => {
    fetchMock
      .getOnce(process.env.REACT_APP_API_ENDPOINT, {
        body: mockPlayers,
        headers: {
          'content-type': 'application/json',
        },
      });

    let wrapper = mount(
      <Provider store={store}>
        <PlayerFinderPage />
      </Provider>
    );

    await sleep();

    wrapper = wrapper.update();

    expect(wrapper.find('input[name="age"]').props().value).toBe('');
    expect(wrapper.find('input[name="name"]').props().value).toBe('');
    expect(wrapper.find('select[name="position"]').props().value).toBe('');
    expect(wrapper.find('tbody').children().length).toBe(4);
  });

  it('it renders the modal error', async () => {
    fetchMock
      .getOnce(process.env.REACT_APP_API_ENDPOINT, {
        status: 404,
        throws: 'Network Error',
      });

    let wrapper = mount(
      <Provider store={store}>
        <PlayerFinderPage />
      </Provider>
    );

    await sleep();

    wrapper = wrapper.update();

    expect(wrapper.find('input[name="age"]').props().value).toBe('');
    expect(wrapper.find('input[name="name"]').props().value).toBe('');
    expect(wrapper.find('select[name="position"]').props().value).toBe('');
    expect(wrapper.find('tbody').children().length).toBe(0);
  });

  it('it filters players correctly', async () => {
    fetchMock
      .getOnce(process.env.REACT_APP_API_ENDPOINT, {
        body: mockPlayers,
        headers: {
          'content-type': 'application/json',
        },
      });

    const mockDate = new Date(2018, 4, 5);
    const OriginalDate = Date;
    Date = jest.fn((...args) => {
      if (!args.length) {
        return mockDate;
      }

      return new OriginalDate(...args);
    });
    Date.now = OriginalDate.now;
    Date.parse = OriginalDate.parse;
    Date.UTC = OriginalDate.UTC;

    let wrapper = mount(
      <Provider store={store}>
        <PlayerFinderPage />
      </Provider>
    );

    await sleep();

    wrapper = wrapper.update();

    wrapper.find('input[name="age"]').simulate('change', {
      target: {
        name: 'age',
        value: '24',
      },
    });

    const preventDefaultSpy = jest.fn();
    wrapper.find('form').simulate('submit', {
      preventDefault: preventDefaultSpy,
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(wrapper.find('input[name="age"]').props().value).toBe('24');
    expect(wrapper.find('input[name="name"]').props().value).toBe('');
    expect(wrapper.find('select[name="position"]').props().value).toBe('');
    expect(wrapper.find('tbody').children().length).toBe(2);
    expect(wrapper.find('tbody tr').at(0).find('td').first().text()).toBe('Romelu Lukaku');
    expect(wrapper.find('tbody tr').at(1).find('td').first().text()).toBe('Eric Bailly');
  });
});
