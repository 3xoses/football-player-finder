import { shallow } from 'enzyme';
import React from 'react';
import { ModalError } from './ModalError';

describe('ModalError', () => {
  it('it renders correctly and keep hidden the modal if the modalVisible is false', () => {
    const closeModalSpy = jest.fn();

    const wrapper = shallow(
      <ModalError
        closeModal={closeModalSpy}
        modalMessage=""
        modalVisible={false}
      />
    );

    expect(wrapper.find('.d-none .modal').length).toBe(1);
  });

  it('it renders correctly and show the modal if the modalVisible is true', () => {
    const closeModalSpy = jest.fn();

    const wrapper = shallow(
      <ModalError
        closeModal={closeModalSpy}
        modalMessage="error"
        modalVisible={true}
      />
    );

    expect(wrapper.find('.d-none .modal').length).toBe(0);
    expect(wrapper.find('.modal .modal-body').at(0).text()).toBe('error');
  });

  it('it calls to close on click outside the modal', () => {
    const closeModalSpy = jest.fn();

    const wrapper = shallow(
      <ModalError
        closeModal={closeModalSpy}
        modalMessage="error"
        modalVisible={true}
      />
    );

    wrapper.find('.modal-backdrop').simulate('click');

    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('it calls to close on click the close button', () => {
    const closeModalSpy = jest.fn();

    const wrapper = shallow(
      <ModalError
        closeModal={closeModalSpy}
        modalMessage="error"
        modalVisible={true}
      />
    );

    wrapper.find('button.close').simulate('click');

    expect(closeModalSpy).toHaveBeenCalled();
  });
});
