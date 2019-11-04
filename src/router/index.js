import Vue from 'vue';
import Router from 'vue-router';
import StartPage from '../components/views/StartPage';
import FileUploadPage from '../components/views/FileUploadPage';

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
      path: '/fileuploadpage',
      name: 'FileUploadPage',
      component: FileUploadPage,
    },
  ],
});
