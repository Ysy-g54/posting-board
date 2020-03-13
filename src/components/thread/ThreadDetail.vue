<template>
  <div>
    <ResponseList :responseContent="responseContent"></ResponseList>
    <ResponseRegistration @on-register-thread-click="showSnackbar"></ResponseRegistration>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import responseService from "@/service/response/response-service";
import ResponseList from "@/components/response/ResponseList";
import ResponseRegistration from "@/components/response/ResponseRegistration";
export default {
  name: "thread-detail",
  data: () => ({
    snackbarMessage: "",
    snackbar: false,
    responseContent: {}
  }),
  methods: {
    async showSnackbar(message) {
      this.snackbarMessage = await message;
      this.snackbar = await !this.snackbar;
      await this.searchResponse();
    },
    async searchResponse() {
      if (this.$route.params.threadId !== undefined) {
        let querySnapshot = await responseService.searchByThreadId(
          this.$route.params.threadId
        );
        querySnapshot.forEach(document => {
          console.error(document.data());
          this.responseContent = document.data();
        });
      }
    }
  },
  computed: {},
  created() {
    this.searchResponse();
  },
  components: {
    ResponseList,
    ResponseRegistration
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-list {
  height: 600px;
  overflow-y: auto;
}
</style>
