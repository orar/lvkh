import NotFoundLayout from 'layouts/NotFoundLayout';
import adminRoute from './Admin';
import authRoute from './Auth';
import coachRoute from './Coach';
import userRoute from './User';
import homeRoute from './Home';

export default store => ([
  homeRoute(store),
  authRoute(store),
  coachRoute(store),
  userRoute(store),
  /*adminRoute(store),*/

  {
    path: '*',
    component: NotFoundLayout,
  },
]);
