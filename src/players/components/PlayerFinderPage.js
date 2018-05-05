import React, { Component } from 'react';
import { connect } from 'react-redux';
import FinderFilters from './FinderFilters';
import VisiblePlayerList from './VisiblePlayerList';
import { fetchPlayers } from '../actions';

class PlayerFinderPage extends Component {
  componentDidMount() {
    this.props.fetchPlayers();
  }

  render() {
    return (
      <div>
        <div>
          <h3>Football Player Finder</h3>
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
