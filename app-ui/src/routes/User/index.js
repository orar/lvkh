// Uncomment the stuff to inject reducers or sagas for code splitting (https://webpack.js.org/guides/code-splitting/)
import { injectReducer } from 'store/reducers';
import { injectSaga } from 'store/sagas';
import config from 'config/index';
import AccountContainer from './containers/AccountContainer';
import UserProfileContainer from "./containers/UserProfileContainer";
import { secured } from '../Auth/util/wrappers';


export default ( store ) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./layout/UserLayout').default;
      const reducer = require('./modules/CoreUserModule').default;
      const saga = require('./sagas/UserSaga').default;

      injectReducer(store, { key: 'user', reducer });
      injectSaga(store, { key: 'user', saga });

      cb(null, Component);
    }, 'user');
  },

  childRoutes: [
    {
      path: config.route.user.account,
      component: secured(AccountContainer)
    },
    {
      path: config.route.user.profile,
      component: secured(UserProfileContainer)
    }
  ]

});
