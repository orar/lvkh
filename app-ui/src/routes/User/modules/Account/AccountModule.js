// @flow
import { createAction, handleActions } from 'redux-actions';


export type Reward = {
  id: string,
  teamID: string,
  reward: string,
  value: number,
  redeemed: boolean,
  dateTime: number,
}

export type Account = {
  id: string,
  userID: string,
  balance: number, //balance: actual amount of money unspent
  vBalance: number, //fantasy balance in millions
  rewardBalance: number,
  rewardHistory: Array<Reward>,
  dateCreated: number,
};

type AccountState = {
 // initialized: boolean,
  data: Account
}

export const initialAccount: AccountState  = {
  data: {}
};


export const getAccount = createAction('USER_ACCOUNT_GET');

export const saveAccount = createAction('USER_ACCOUNT_SAVE');
export const resetAccount = createAction('USER_ACCOUNT_RESET');


export default handleActions({
  [saveAccount]: (state, action) => ({ data: action.payload }),
  [resetAccount]: () => initialAccount,
}, initialAccount);
