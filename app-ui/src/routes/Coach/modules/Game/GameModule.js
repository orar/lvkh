// @flow
import { createAction, handleActions } from 'redux-actions';
import { noDupConcat } from "../../../../util/HelperUtil";


export type GamePlan = {
  id: string,
  name: string,
  cover: string,
  order: number, //for sorting arrangment
  message: string, //brand message
  isPrivate: boolean,
  dateTime: number,
}

export type Game = {
  pageHeader: string,
  pageSubHeader: string,
  plans: Array<GamePlan>,
}


export type GameData = {
  data: Game

}

export const initialGameData: GameData = {
  data: {}
};


export const fetchGames = createAction('COACH_GAME_FETCH');
export const saveGames = createAction('COACH_GAME_SAVE');
export const resetGames = createAction('COACH_GAME_RESET');


export default handleActions({
  [saveGames]: (state, action) => ({ data: action.payload }),
  [resetGames]: () => initialGameData,
}, initialGameData);