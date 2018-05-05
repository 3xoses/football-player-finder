import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterPlayers } from '../actions';
import { NAME, PLAYER_POSITIONS } from '../constants';

class FinderFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        ...this.props.filters,
      },
    };
  }

  onInputChange = inputName => event => {
    this.setState({
      filters: {
        ...this.state.filters,
        [inputName]: event.target.value,
      },
    });
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.filterPlayers({
      ...this.state.filters,
      age: parseInt(this.state.filters.age, 10),
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="name"
            onChange={this.onInputChange('name')}
            pattern="[a-z|A-Z| ]*"
            placeholder="Name"
            value={this.state.filters.name}
          />

          <select
            name="position"
            onChange={this.onInputChange('position')}
            value={this.state.filters.position}
          >
            <option value="">Position</option>
            {PLAYER_POSITIONS.map((position, i) => <option key={i} value={position}>{position}</option>)}
          </select>

          <input
            name="age"
            type="number"
            min="18"
            max="40"
            onChange={this.onInputChange('age')}
            placeholder="Age"
            value={this.state.filters.age}
          />

          <button type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state[NAME].filters,
});

const mapDispatchToProps = dispatch => ({
  filterPlayers: (filters) => dispatch(filterPlayers(filters)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinderFilters);
