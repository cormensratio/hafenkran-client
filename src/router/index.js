import Vue from 'vue';
import Router from 'vue-router';
import { isNil } from 'lodash';
import StartPage from '../components/views/StartPage';
import ExperimentListPage from '../components/views/ExperimentListPage';
import LoginPage from '../components/views/LoginPage';
import ExecutionsListPage from '../components/views/ExecutionsListPage';
import ExecutionDetailsPage from '../components/views/ExecutionDetailsPage';
import NewExperimentPage from '../components/views/NewExperimentPage';
import UserList from '../components/views/UserList';
import UserSettingsPage from '../components/views/UserSettingsPage';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/newexperiment',
      name: 'NewExperimentPage',
      component: NewExperimentPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/experimentlist',
      name: 'ExperimentListPage',
      component: ExperimentListPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/executionlist',
      name: 'ExecutionsListPage',
      component: ExecutionsListPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/execution/:executionId',
      name: 'ExecutionDetails',
      component: ExecutionDetailsPage,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserList,
      meta: {
        requiresAUth: true,
      },
    },
    {
      path: '/settings',
      name: 'UserSettings',
      component: UserSettingsPage,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (process.env.AUTHENTICATION_REQUIRED) {
    if (to.meta.requiresAuth) {
      if (isNil(localStorage.getItem('user'))) {
        next('/login');
      }
    }
  }
  next();
});


export default router;
