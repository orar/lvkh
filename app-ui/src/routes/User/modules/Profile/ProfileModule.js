// @flow
import { createAction, handleActions } from 'redux-actions';
import {noDupConcat} from "../../../../util/HelperUtil";


export type FanPlayer = {
  id: string,
  name: string,
  country: string,
  avatar: string,
};

export type FanCountry = {
  id: string,
  name: string,
  flag: string,
}


export type UserProfile = {
  id: string,
  nationalID?: string,// secure
  username: string,
  firstName: string,
  midName : string,
  lastName: string,
  alias: string,
  age: number,
  gender: string,
  address: string,
  city: string,
  avatar: string,
  cover: string,
  country: string,
  statusMsg: string,
  fanPlayers: Array<FanPlayer>,
  fanCountries: Array<FanCountry>,
  dateCreated: number,
};

type UserProfileData = {
  user: UserProfile,
  data: Array<UserProfile>,
}

const initialUserProfile: UserProfileData = {
  user: {},
  data: []
};


export const getProfile = createAction('USER_PROFILE_FETCH');
export const getUserProfile = createAction('USER_OWN_PROFILE_FETCH');

export const saveProfile = createAction('USER_PROFILE_SAVE');
export const saveUserProfile = createAction('USER_OWN_PROFILE_SAVE');
export const resetProfile = createAction('USER_PROFILE_DELETE');


export default handleActions({
  [saveUserProfile]: (state, action) => ({ ...state, user: action.payload }),
  [saveProfile]: (state, actions) => ({ ...state, data: noDupConcat(state.data, actions.payload, (s, p) => s.id === p.id)}),
  [resetProfile]: () => initialUserProfile,
}, initialUserProfile)