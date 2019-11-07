<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <div class="card">
          <div> Hi {{userName}} </div>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';
import AuthenticationService from '../../service/AuthenticationService';

export default {
  name: 'UserInfoPage',
  components: { BasePage },
  data() {
    return {
      userName: '',
    };
  },
  created() {
    this.userName = AuthenticationService.getMe();
  },
};
</script>

<style scoped>

</style>
