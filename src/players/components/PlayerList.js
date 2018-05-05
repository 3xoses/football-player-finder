import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerList extends Component {
  render() {
    return(
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Position</th>
            <th>Nationality</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {this.props.players.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.nationality}</td>
              <td>{player.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      dateOfBirth: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nationality: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default PlayerList;
