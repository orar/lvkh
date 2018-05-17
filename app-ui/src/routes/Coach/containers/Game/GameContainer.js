// @flow
import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import {fetchGames} from "../../modules/Game/GameModule";
import Game from '../../components/Game/Game';
import isNil from 'lodash/isNil';



const mapStateToProps = (state, props ) => ({
  isGuest: isNil(state.auth.user.data.id),
  ...state.coach.game.game,
});



const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onFetchGames: data => dispatch(fetchGames(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Game);