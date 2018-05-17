// @flow
import { connect } from 'react-redux';
import type { Dispatch } from "redux";
import { redeemReward } from "../modules/Account/RedeemModule";
import Redeem from '../components/Account/Redeem';


export const  mapStateToProps = (state, props) => ({
  request: state.user.redeem
});


export const mapDispatchToProps = (dispatch: Dispatch<*> ) => ({
  onRedeemReward: data => dispatch(redeemReward(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Redeem);