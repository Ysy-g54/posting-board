<template>
  <div>
    <v-app v-if="getIsLoading">
      <v-layout align-center justify-center>
        <v-progress-circular :size="200" :width="7" color="primary" indeterminate></v-progress-circular>
      </v-layout>
    </v-app>
    <v-app v-else>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters(["getIsLoading"])
  }
};
</script>

<style>
</style>
