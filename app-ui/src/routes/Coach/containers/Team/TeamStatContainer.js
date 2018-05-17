// @flow

import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import { fetchStats } from "../../modules/Team/TeamStatModule";



/**
 * @deprecated
 * Maps the redux state to component props
 * */
const mapStateToProps = (state ) => ({
  ...state.coach.teamStat,
  requestLock: state.coach.app.initialized
});


/**
 * @deprecated
 * Maps the redux dispatch function to component props
 * */
const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onFetchStats: () => dispatch(fetchStats()),
});




//export default connect(mockStateToProps, mockDispatchToProps)();