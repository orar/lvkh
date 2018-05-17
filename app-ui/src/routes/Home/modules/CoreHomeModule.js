import { combineReducers } from 'redux';
import slideReducer from './Slide/SlideModule';
import supportReducer from './Support/SupportModule';
import fixtureReducer from './Fixture/FixtureModule';



export default combineReducers({
  slide: slideReducer,
  support: supportReducer,
  fixture: fixtureReducer,
});