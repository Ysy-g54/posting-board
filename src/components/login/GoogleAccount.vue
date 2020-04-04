<template>
  <v-layout align-center justify-center>
    <v-btn large class="custom-transform-class text-none" @click="onGoogleLoginClick">
      <img src="@/assets/google.png" width="32" height="32" />
      Googleアカウントで{{ btnOperationName }}
    </v-btn>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "google-account",
  data: () => ({}),
  methods: {
    ...mapActions(["loginByGoogleAccount"]),
    async onGoogleLoginClick() {
      await this.loginByGoogleAccount();
    }
  },
  props: {
    btnOperationName: { type: String, default: "", required: true }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
