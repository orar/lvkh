// @flow
import { combineReducers } from 'redux';
import benchReducer from './BenchModule';
import formationReducer from './FormationModule';
import roleReducer from './RoleModule';
import positionReducer from './PositionModule';


export default combineReducers({
  formation: formationReducer,
  role: roleReducer,
  bench: benchReducer,
  position: positionReducer,
});