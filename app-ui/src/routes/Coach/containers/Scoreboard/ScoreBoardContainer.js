// @flow

import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import ScoreBoard from "../../components/ScoreBoard";
import {fetchScores, fetchRoundScore} from "../../modules/Scoreboard/ScoreBoardModule";



/**
 * Maps the redux state to component props
 * */
const mapStateToProps = (state, props ) => ({
  ...state.coach.score.board[props.teamID],
});



/**
 * Maps the redux dispatch function to component props
 * */
const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
 // onGetStat: (teamID: string) => dispatch(fetchRoundScore(teamID)),
  onFetchScoreData: data => dispatch(fetchScores(data)),
});




export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);