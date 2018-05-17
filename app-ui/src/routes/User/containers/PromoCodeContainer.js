// @flow
import { connect } from 'react-redux';
import type { Dispatch } from "redux";
import { verifyPromoCode, getPromoData } from "../modules/Promo/PromoCodeFormModule";
import PromoCodeForm from '../components/Account/PromoCodeForm';



export const  mapStateToProps = (state, props) => ({
  request: state.user.promo.request,
  data: state.user.promo.data.data,
});


export const mapDispatchToProps = (dispatch: Dispatch<*> ) => ({
  onVerifyCode: data => dispatch(verifyPromoCode(data)),
  onGetPromoData: () => dispatch(getPromoData()),
});


export default connect(mapStateToProps, mapDispatchToProps)(PromoCodeForm)