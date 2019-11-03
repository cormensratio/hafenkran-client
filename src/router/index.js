import Vue from 'vue';
import Router from 'vue-router';
import StartPage from '../components/views/StartPage';
import UploadedDockerfilesPage from '../components/views/UploadedDockerfilesPage';

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
      path: '/',
      name: 'UploadedDockerfilesPage',
      component: UploadedDockerfilesPage,
    },
  ],
});
