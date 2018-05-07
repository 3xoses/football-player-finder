import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import { NAME } from '../constants';

import './ModalError.css';

export class ModalError extends Component {
  render() {
    const modalClassName = !this.props.modalVisible ? 'd-none' : '';

    return (
      <div className={modalClassName}>
        <div
          className="modal fade show centered-modal"
          role="dialog"
          tabIndex="-1"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error</h5>

                <button type="button" className="close" onClick={this.props.closeModal}>
                  <span>×</span>
                </button>
              </div>

              <div className="modal-body">
                <p>{this.props.modalMessage}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-backdrop fade show" onClick={this.props.closeModal}></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalMessage: state[NAME].modalMessage,
  modalVisible: state[NAME].modalVisible,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalError);
