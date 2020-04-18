<template>
  <div>
    <v-toolbar class="sticky" color="indigo lighten-1" dark>
      <v-toolbar-title>
        <div class="d-none d-sm-flex">posting-board</div>
        <div class="d-flex d-sm-none">board</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="my-2">
        <v-btn text small :to="'/login'">ログイン</v-btn>
      </div>
      <div class="my-2">
        <v-btn text small :to="'/signup'">アカウント作成する</v-btn>
      </div>
    </v-toolbar>
    <AppGuide />
  </div>
</template>

<script>
import AppGuide from "@/components/guide/AppGuide";
export default {
  data: () => ({}),
  methods: {},
  components: {
    AppGuide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
