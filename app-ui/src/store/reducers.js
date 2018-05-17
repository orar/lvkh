import { combineReducers } from 'redux';
import locationReducer from 'modules/LocationModule';
import i18nReducer from 'modules/I18nModule';
import stateReducer from 'modules/StateModule';
import authReducer from 'routes/Auth/modules/AuthModule';
import coachReducer from 'routes/Coach/modules/CoreCoachModule';
import userReducer from 'routes/User/modules/CoreUserModule';
import homeReducer from 'routes/Home/modules/CoreHomeModule';

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    location: locationReducer,
    i18n: i18nReducer,
    auth: authReducer,
    coach: coachReducer,
    user: userReducer,
    home: homeReducer,
    ...asyncReducers,
  });

  return (state, action) => appReducer(stateReducer(state, action), action);
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  const s = store;
  s.asyncReducers[key] = reducer;
  s.replaceReducer(makeRootReducer(s.asyncReducers));
};

export default makeRootReducer;
