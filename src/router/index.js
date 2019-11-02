import Vue from 'vue';
import Router from 'vue-router';
import StartPage from '../components/views/StartPage';
import FileUpload from '../components/views/FileUpload';

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
      path: '/fileupload',
      name: 'FileUpload',
      component: FileUpload,
    },
  ],
});
