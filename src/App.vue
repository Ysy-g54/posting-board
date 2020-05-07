<template>
  <div>
    <v-app v-if="getIsLoading">
      <v-layout align-center justify-center>
        <v-progress-circular :size="200" :width="7" color="primary" indeterminate></v-progress-circular>
      </v-layout>
    </v-app>
    <v-app v-else>
      <router-view></router-view>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Footer from "@/components/layout/Footer";
export default {
  name: "App",
  computed: {
    ...mapGetters(["getIsLoading"])
  },
  components: {
    Footer
  }
};
</script>

<style scoped>
footer {
  margin-top: auto;
}
</style>
