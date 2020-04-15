<template>
  <div>
    <v-toolbar class="sticky" color="indigo lighten-1" dark>
      <v-toolbar-title>posting-board</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <div class="my-2" @click="goSignup">
        <v-btn text small>アカウント作成する</v-btn>
      </div>-->
    </v-toolbar>
    <CenterTemplate>
      <v-flex sm8 md4>
        <v-layout align-center justify-center></v-layout>
      </v-flex>
    </CenterTemplate>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {},
  components: {}
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
