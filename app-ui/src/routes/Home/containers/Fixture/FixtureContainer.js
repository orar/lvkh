// @flow
import { connect } from 'react-redux';
import groupBy from 'lodash/groupBy';
import type { Dispatch } from "redux";
import { fetchFixtures, saveFixtures } from "../../modules/Fixture/FixtureModule";
import type { Fixture} from "../../modules/Fixture/FixtureModule";
import FixtureComponent from '../../components/Fixture/index';
import Moment from 'moment';

import FixtureData from './FixtureData';
import { clog } from "../../../../util/HelperUtil";

const stageGroup = (data: Array<Fixture>) => {
  return groupBy(data, 'stage');
};

const dateGroup = (data: Array<Fixture>) => {
  return groupBy(data, d => Moment.utc(d.time).format("YYYY-MM-DD"));
};

const fixtureSort = (data: Array<Fixture> = []) => {
  const stages = stageGroup(data);
  const fxs = {};
  for( let key in stages){
    if(stages.hasOwnProperty(key)) {
      fxs[key] = dateGroup(stages[key]);
    }
  }
  return fxs;
};

export const  mapStateToProps = (state, props) => ({
  data: fixtureSort(state.home.fixture.data),
});


export const mapDispatchToProps = (dispatch: Dispatch<*> ) => ({
  onFetchFixtures: () => dispatch(fetchFixtures()),
  onSaveFixtures: () => dispatch(saveFixtures(FixtureData)),
});


export default connect(mapStateToProps, mapDispatchToProps)(FixtureComponent)