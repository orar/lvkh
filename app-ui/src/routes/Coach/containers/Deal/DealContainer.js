// @flow

import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import { getTeamDeals } from "../../modules/Deal/DealModule";
import Deal from "../../components/Deal";



const mapStateToProps = (state, props ) => ({
  ...state.coach.deal[props.teamID],
});



const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onGetExpenses: data => dispatch(getTeamDeals(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Deal);