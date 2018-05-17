// @flow
import { connect } from 'react-redux';
import type { Dispatch } from "redux";
import { getAccount } from "../modules/Account/AccountModule";
import AccountWidget from '../components/Account/AccountWidget';


export const  mapStateToProps = (state, props) => ({
  ...state.user.account
});


export const mapDispatchToProps = (dispatch: Dispatch<*> ) => ({
  onGetAccount: data => dispatch(getAccount(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AccountWidget)