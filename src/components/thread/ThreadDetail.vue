<template>
  <v-container fluid>
    <Toolbar :title="title"></Toolbar>
    <span v-for="category in thread.categories" :key="category">
      <v-chip :color="getCategoryColor(category)">{{ formatCategory(category) }}</v-chip>
    </span>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <ResponseList :responseList="responseContent.responseList" :emptyStateFlg="emptyStateFlg"></ResponseList>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <ResponseRegistration
          :responseContent="responseContent"
          :responseId="responseId"
          @on-register-response-click="showSnackbar"
        ></ResponseRegistration>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import _ from "lodash";
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
    thread: {},
    title: "",
    emptyStateFlg: false
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
        this.emptyStateFlg = _.isEmpty(this.responseContent);
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
          this.title = `タイトル: ${this.thread.title}`;
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
  height: 540px;
  overflow-y: auto;
}
</style>
