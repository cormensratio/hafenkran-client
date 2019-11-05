import Vue from 'vue';
import Router from 'vue-router';
import StartPage from '../components/views/StartPage';
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
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
  ],
});
