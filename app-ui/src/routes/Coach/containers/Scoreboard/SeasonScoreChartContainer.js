// @flow

import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import SeasonScoreGraph from "../../components/ScoreBoard/SeasonScoreGraph";
import { fetchSeasonScoreChart } from "../../modules/Scoreboard/SeasonScoreChartModule";

import { clog } from "../../../../util/HelperUtil";

const mapStateToProps = (state, props ) => ({
  data: state.coach.score.seasonChart[props.teamID],
});



const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onFetchGraphData: data => dispatch(fetchSeasonScoreChart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeasonScoreGraph);