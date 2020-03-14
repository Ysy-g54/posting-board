<template>
  <div>
    <Toolbar :title="thread.title"></Toolbar>
    <ResponseList :responseList="responseContent.responseList"></ResponseList>
    <ResponseRegistration
      :responseContent="responseContent"
      :responseId="responseId"
      @on-register-response-click="showSnackbar"
    ></ResponseRegistration>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import responseService from "@/service/response/response-service";
import threadService from "@/service/thread/thread-service";
import ResponseList from "@/components/response/ResponseList";
import ResponseRegistration from "@/components/response/ResponseRegistration";
import Toolbar from "@/components/layout/Toolbar";
export default {
  name: "thread-detail",
  data: () => ({
    snackbarMessage: "",
    snackbar: false,
    responseContent: {},
    responseId: "",
    thread: {}
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
          this.responseContent = document.data();
          this.responseId = document.id;
        });
      } else {
        this.$router.back();
      }
    },
    async searchThread() {
      if (this.$route.params.threadId !== undefined) {
        let querySnapshot = await threadService.searchByThreadId(
          this.$route.params.threadId
        );
        if (querySnapshot.exists) {
          this.thread = querySnapshot.data();
        }
      }
    }
  },
  computed: {},
  created() {
    this.searchResponse();
    this.searchThread();
  },
  components: {
    ResponseList,
    ResponseRegistration,
    Toolbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-list {
  height: 520px;
  overflow-y: auto;
}
</style>
