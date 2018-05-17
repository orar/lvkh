// @flow
import { createAction, handleActions } from 'redux-actions';
import { noDupConcat, pushArray } from "../../../../util/HelperUtil";
import {combineReducers} from "redux";



//TODO clean and minimize data
export type Player = {
  id: string,
  originID: string,
  originName: string,
  originJersey: number,
  seasonID: string,
  seasonYear: number,
  coverUrl: string,
  avatarUrl: string,
  name: string,
  jerseyName: string,
  age: number,
  goals: number,
  height: number,
  weight: number,
  performanceIndex: number,
  age: number,
  role: string,
  form: number,
  totalScore: number,
  evicted: boolean,
  injured: boolean,
  rating: number,
  price: number,
  country: string,
  dateTime: number,
}

/*
const CR7: Player = {
  id: 'e3d4acae42',
  originID: 'e3d4acae42',
  originName: 'Real Madrid',
  seasonID: 'e3d4acae42',
  seasonYear: 2017,
  coverUrl: 'cro_full.png',
  avatarUrl: 'cro.png',
  name: 'Cristiano Ronaldo',
  age: '27',
  goals: '67',
  height: '5.9',
  weight: 78,
  position: 7,
  role: 'forward',
  field: true,
  evicted: false,
  rating: 4.8,
  country: 'Portugal',
  dateTime: 1503432534323,
};
*/
type PlayerList = Array<Player>;



export const initialPlayerList: PlayerList = [];


export const fetchPlayerList = createAction('COACH_PLAYER_LIST_FETCH');

export const savePlayerList = createAction('COACH_PLAYER_LIST_SAVE');
//export const setPlayerList = createAction('COACH_PLAYER_LIST_SAVE_EXCLUSIVE');
export const clearPlayerList = createAction('COACH_PLAYER_LIST_CLEAR');


export default handleActions({
    [savePlayerList]: (state, action) => noDupConcat(state, action.payload, (s, p) => s.id === p.id),
    [clearPlayerList]: () => initialPlayerList
}, initialPlayerList)