// @flow
import { createAction, handleActions } from 'redux-actions';
//import { subscribe } from "../../../../modules/ActionModule";
//TODO: Subscribe actions to ActionModule;
export type Goal = {
  id: string,
  utcTime: number,
  gameTime: string,
  playerID: string,
  playerName: string,
  type: string,
}

export type FixtureTeam = {
  name: string,
  flag: string,
  goals: Array<Goal>,

}

export type Fixture = {
  id: string,
  kickoff: boolean,
  stage: string,
  location: string,
  stadium: string,
  scores: string,
  time: number,
  team1: FixtureTeam,
  team2: FixtureTeam,
}

type Fixtures = {
  data: Array<Fixture>,
}

export const initialFixtures: Fixtures  = {
  data: []
};


export const fetchFixtures = createAction('HOME_FIXTURE_FETCH');

export const saveFixtures = createAction('HOME_FIXTURE_SAVE');
//subscribe(saveFixtures);

export const updateFixture = createAction('HOME_FIXTURE_UPDATE');
export const resetFixture = createAction('HOME_FIXTURE_RESET');


export default handleActions({
  [saveFixtures]: (state, action) => ({ data: action.payload }),
  [resetFixture]: () => initialFixtures,
}, initialFixtures);
