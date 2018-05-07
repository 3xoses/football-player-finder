import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterPlayers } from '../actions';
import { NAME, PLAYER_POSITIONS } from '../constants';

import './FinderFilters.css';

export class FinderFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        age: (this.props.filters.age !== null ? this.props.filters.age : '').toString(),
        name: this.props.filters.name || '',
        position: this.props.filters.position || '',
      },
    };
  }

  onInputChange = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        [event.target.name]: event.target.value,
      },
    });
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.filterPlayers({
      age: parseInt(this.state.filters.age, 10) || null,
      name: this.state.filters.name || null,
      position: this.state.filters.position || null,
    });
  }

  render() {
    return (
      <div className="finder-filters">
        <form onSubmit={this.onSubmit}>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <input
                className="form-control mb-2"
                name="name"
                onChange={this.onInputChange}
                pattern="[a-z|A-Z| ]*"
                placeholder="Name"
                value={this.state.filters.name}
              />
            </div>

            <div className="col-auto">
              <select
                className="form-control mb-2"
                name="position"
                onChange={this.onInputChange}
                value={this.state.filters.position}
              >
                <option value="">Position</option>
                {PLAYER_POSITIONS.map((position, i) => <option key={i} value={position}>{position}</option>)}
              </select>
            </div>

            <div className="col-auto">
              <input
                className="form-control mb-2"
                name="age"
                type="number"
                min="18"
                max="40"
                onChange={this.onInputChange}
                placeholder="Age"
                value={this.state.filters.age}
              />
            </div>

            <div className="col-auto">
              <button
                className="btn btn-primary mb-2"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
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
