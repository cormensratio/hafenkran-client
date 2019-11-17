import Vue from 'vue';
import Router from 'vue-router';
import StartPage from '../components/views/StartPage';
import ExperimentListPage from '../components/views/ExperimentListPage';
import CreateExperimentPage from '../components/views/CreateExperimentPage';
import LoginPage from '../components/views/LoginPage';
import store from '../store/store';
import ExecutionsListPage from '../components/views/ExecutionsListPage';

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
      component: CreateExperimentPage,
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
      path: '/executionsList',
      name: 'ExecutionsListPage',
      component: ExecutionsListPage,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const test = process.env.AUTHENTICATION_REQUIRED;
  if (test) {
    if (to.meta.requiresAuth) {
      if (!store.getters.isAuthenticated) {
        next('/login');
      }
    }
  }
  next();
});


export default router;
