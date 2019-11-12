<template>
    <base-page>
      <template slot="body">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
              <v-card class="elevation-24 shaped">
                <v-spacer></v-spacer>
                <v-toolbar dark color="blue">
                  <v-toolbar-title color="white">Login to Hafenkran</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="name" label="Name" prepend-icon="person" ></v-text-field>
                    <v-text-field v-model="password"
                                  label="Password" prepend-icon="lock"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions justify-center>
                  <v-btn large dark color="blue">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'LoginPage',
  components: { BasePage },
};
</script>

<style scoped>

</style>
