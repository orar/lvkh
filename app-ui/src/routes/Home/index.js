import HomeLayout from './layout/HomeLayout';
import HomeContainer from './containers/Home/HomeContainer';
import config from 'config/index';


export default (store) => ({
  component: HomeLayout,
  childRoutes: [
    {
      path: config.route.index,
      component: HomeContainer,
    }]
})