<template>
  <div>
    <ThreadList></ThreadList>
    <ThreadRegistration @on-register-thread-click="showSnackbar"></ThreadRegistration>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import ThreadList from "@/components/thread/ThreadList";
import ThreadRegistration from "@/components/thread/ThreadRegistration";
export default {
  name: "thread",
  data: () => ({
    snackbarMessage: "",
    snackbar: false
  }),
  methods: {
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = !this.snackbar;
    }
  },
  computed: {},
  created() {},
  components: {
    ThreadList,
    ThreadRegistration
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
