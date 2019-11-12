import Vue from 'vue';
import Router from 'vue-router';
import StartPage from '../components/views/StartPage';
import ExperimentListPage from '../components/views/ExperimentListPage';
import CreateExperimentPage from '../components/views/CreateExperimentPage';
import LoginPage from '../components/views/LoginPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage,
    },
    {
      path: '/newexperiment',
      name: 'NewExperimentPage',
      component: CreateExperimentPage,
    },
    {
      path: '/experimentlist',
      name: 'ExperimentListPage',
      component: ExperimentListPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
  ],
});
