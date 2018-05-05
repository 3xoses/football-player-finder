import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PlayerList from './PlayerList';
import { getVisiblePlayers } from '../selectors';

const VisiblePlayerList = connect(
  createStructuredSelector({
    players: getVisiblePlayers
  })
)(PlayerList);

export default VisiblePlayerList;
