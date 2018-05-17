// @flow
import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import RoundScoreDetailComponent from "../../components/ScoreBoard/RoundScoreDetail";
import { fetchRoundScoreDetail } from "../../modules/Scoreboard/RoundScoreDetailModule";

import {clog} from "../../../../util/HelperUtil";


/**
 * Maps the redux state to component props
 * */
const mapStateToProps = (state, props ) => ({
  //Select from roundScore state in redux by teamID and select by the roundID -- 2dimensional
    ...((state.coach.score.roundScore[props.teamID] || {})[props.roundID]) || {},
});



/**
 * Maps the redux dispatch function to component props
 *
 * Fetches score list
 * */
const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onFetchScoreList: data => dispatch(fetchRoundScoreDetail(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoundScoreDetailComponent);