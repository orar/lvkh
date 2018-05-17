// @flow
import { createAction, handleActions } from 'redux-actions';

export type TeamSettings = {
  score: boolean,
  commentary: boolean,
  win: boolean,
  postMatch: boolean,

}

export type Settings = {
  teams: Array<{
    id: string,
    name: string,
    settings: TeamSettings
  }>,
  newsletter: boolean,
  brandAlert: boolean,
}

export const initialSettingState: Settings = {
  teams: [],
  newsletter: true,
  brandAlert: true,
};

export const getSettings = createAction('USER_SETTINGS_FETCH');

export const saveSettings = createAction('USER_SETTINGS_SAVE');
export const updateSettings = createAction('USER_SETTINGS_UPDATE');


export default handleActions({
  [saveSettings]: (state, action) => ({ ...state, data: action.payload }),
}, initialSettingState);