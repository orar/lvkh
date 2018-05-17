// @flow

import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import Transfer from "../../components/Transfer/index";
import { makeTransfer } from "../../modules/Transfer/TransferModule";


const mapStateToProps = (state, props ) => ({
  ...state.coach.transfer.request,
  bank: state.user.account.data,
});


const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onTransfer: data => dispatch(makeTransfer(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Transfer);