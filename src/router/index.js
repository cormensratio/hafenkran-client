import Vue from 'vue';
import Router from 'vue-router';
import StartPage from '../components/views/StartPage';
import ExperimentListPage from '../components/views/ExperimentListPage';
import CreateExperimentPage from '../components/views/CreateExperimentPage';
import LoginPage from '../components/views/LoginPage';
import ProtectedPage from '../components/views/ProtectedPage';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage,
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
    },
    {
      path: '/experimentlist',
      name: 'ExperimentListPage',
      component: ExperimentListPage,
    },
    {
      path: '/protected',
      name: 'Protected',
      component: ProtectedPage,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta) {
    next();
  }

  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('user');

    if (!token) {
      alert('You are not authenticated!');
      next('/login');
    }
  }
  next();
});


export default router;
