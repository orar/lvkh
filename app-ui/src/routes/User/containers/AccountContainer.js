// @flow
import { connect } from 'react-redux';
import type { Dispatch } from "redux";
import { getAccount } from "../modules/Account/AccountModule";
import { verifyPromoCode } from "../modules/Promo/PromoCodeFormModule";
import Account from '../components/Account/Account';

import { clog } from "../../../util/HelperUtil";

export const  mapStateToProps = (state, props) => ({
  ...state.user.account,
});


export const mapDispatchToProps = (dispatch: Dispatch<*> ) => ({
  onGetAccount: () => dispatch(getAccount()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Account)