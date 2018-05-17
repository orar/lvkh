// @flow
import { createAction, handleActions } from 'redux-actions';
import {combineReducers} from 'redux';
import isEmpty from 'lodash/isEmpty';

export type RequestState = {
  isPending: boolean,
  isComplete: boolean,
  isSuccess: boolean,
}

const initialRequestState: RequestState = {
  isPending: false,
  isComplete: false,
  isSuccess: false,
};

export type Promo = {
  id: string,
  title: string,
  company: string,
  logo: string,
}

type PromoData = {
  data: Promo
};

const initialPromoData = {
  data: {},
};


export const verifyPromoCode = createAction('USER_PROMO_VERIFY_PROMO_CODE');

export const requestPending = createAction('USER_PROMO_TOPUP_PENDING');
export const requestSuccessful = createAction('USER_PROMO_TOPUP_SUCCESSFUL');
export const requestFailed = createAction('USER_PROMO_TOPUP_FAILED');

export const getPromoData = createAction('USER_PROMO_DATA_GET');
export const savePromoData = createAction('USER_PROMO_DATA_SAVE');


export default combineReducers({
  request: handleActions({
  [requestPending]: (state, action) => ({ ...state, isPending: false }),
  [requestSuccessful]: (state, action) => ({ isPending: false, isComplete: true, isSuccess: true }),
  [requestFailed]: (state, action) => ({ isPending: false, isComplete: true, isSuccess: false }),
}, initialRequestState),
  data: handleActions({
    [savePromoData]: (state, action) => ({ ...state, data: action.payload })
}, initialPromoData)
});
