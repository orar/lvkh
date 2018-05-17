// Uncomment the stuff to inject reducers or sagas for code splitting (https://webpack.js.org/guides/code-splitting/)
import { injectReducer } from 'store/reducers';
import { injectSaga } from 'store/sagas';
import config from 'config/index';
import CoachContainer from './containers/Coach/CoachContainer';
import GameContainer from './containers/Game/GameContainer';
import StageComponent from './components/Team/Stage';
import CoachComponent from './components/Coach/Coach';
import PlayerListContainer from './containers/PlayerList/PlayerListContainer';
import { secured } from '../Auth/util/wrappers';

export default ( store ) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./layouts/CoachLayout').default;
      const reducer = require('./modules/CoreCoachModule').default;
      const saga = require('./sagas/CoachSaga').default;

      injectReducer(store, { key: 'coach', reducer });
      injectSaga(store, { key: 'coach', saga });

      cb(null, Component);
    }, 'coach');
  },

  childRoutes: [
    {
      path: config.route.coach.game,
      component: GameContainer
    },
    {
      path: config.route.coach.app,
      component: CoachContainer
    },
   /* {
      path: '/plist',
      component: Transfer,
    }*/
  ]

});
