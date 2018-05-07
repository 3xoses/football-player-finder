import React, { Component } from 'react';
import { connect } from 'react-redux';
import FinderFilters from './FinderFilters';
import ModalError from './ModalError';
import VisiblePlayerList from './VisiblePlayerList';
import { fetchPlayers } from '../actions';

export class PlayerFinderPage extends Component {
  componentDidMount() {
    this.props.fetchPlayers();
  }

  render() {
    return (
      <div className="container">
        <ModalError />

        <div>
          <h1 className="player-finder-page-title">Football Player Finder</h1>
        </div>

        <FinderFilters />

        <VisiblePlayerList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPlayers: () => dispatch(fetchPlayers()),
});

export default connect(
  null,
  mapDispatchToProps,
)(PlayerFinderPage);
