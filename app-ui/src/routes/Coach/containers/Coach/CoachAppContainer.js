// @flow

import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import { getTeam, fetchTeam } from "../../modules/Coach/CoachModule";
import CoachApp from '../../components/Coach/CoachApp';

const mapStateToProps = (state, props ) => ({
  ...state.coach.coach,
});



const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onFetchTeam: data => dispatch(fetchTeam(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CoachApp);