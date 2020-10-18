<template>
  <v-container fluid>
    <Toolbar :title="title"></Toolbar>
    <div v-if="existThread">
      <span v-for="category in thread.categories" :key="category.categoryId">
        <v-chip :color="getCategoryColor(category)">{{ formatCategory(category) }}</v-chip>
      </span>
      <v-row>
        <v-col cols="12" sm="6">
          <Loading v-if="overlay" />
          <ResponseList
            v-else
            :responseList="responseContent.responseList"
            :emptyStateFlg="emptyStateFlg"
            @on-modification-response-click="showSnackbar"
          ></ResponseList>
        </v-col>
        <v-col>
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
    </div>
    <ContentNotFound v-else :message="'スレッドが見つかりません...。既に消されたか、IDが間違っているかを確認してください！'"></ContentNotFound>
  </v-container>
</template>

<script>
import _ from "lodash";
import database from "@/service/database.ts";
import responseService from "@/service/response/response-service.ts";
import threadService from "@/service/thread/thread-service.ts";
import ContentNotFound from "@/components/layout/ContentNotFound";
import Loading from "@/components/layout/Loading";
import ResponseList from "@/components/response/ResponseList";
import ResponseRegistration from "@/components/response/ResponseRegistration";
import Toolbar from "@/components/layout/Toolbar";
export default {
  data: () => ({
    overlay: true,
    snackbarMessage: "",
    snackbar: false,
    content: {},
    responseContent: {},
    responseId: "",
    thread: {},
    title: "",
    emptyStateFlg: false,
    existThread: true
  }),
  methods: {
    async showSnackbar(message) {
      this.snackbarMessage = await message;
      this.snackbar = true;
    },
    async searchThread() {
      if (this.$route.params.threadId !== undefined) {
        let querySnapshot = await threadService.searchByThreadId(
          this.$route.params.threadId
        );
        if (querySnapshot.exists) {
          this.thread = querySnapshot.data();
          this.title = `タイトル: ${this.thread.title}`;
        } else {
          this.existThread = false;
        }
      }
    }
  },
  firestore: {
    content: database.collection("response")
  },
  watch: {
    async content() {
      await this.content.find(document => {
        if (document.threadId === this.$route.params.threadId) {
          this.responseId = document.id;
          this.responseContent = document;
          this.responseContent.responseList.forEach(response => {
            _.set(response, "responseId", this.responseId);
          });
          return true;
        }
      });
      this.emptyStateFlg =
        this.content.length !== 0 &&
        (this.responseContent.responseList === undefined ||
          this.responseContent.responseList.length === 0);
      this.overlay = await false;
    },
    async $route() {
      await this.searchThread();
      let response = await responseService.searchByThreadId(
        this.$route.params.threadId
      );
      await response.forEach(document => {
        this.responseId = document.id;
        this.responseContent = document.data();
        this.responseContent.responseList.forEach(response => {
          _.set(response, "responseId", this.responseId);
        });
      });
      this.emptyStateFlg =
        this.responseContent.responseList === undefined ||
        this.responseContent.responseList.length === 0;
      this.overlay = await false;
    }
  },
  computed: {},
  async created() {
    await this.searchThread();
  },
  components: {
    ContentNotFound,
    Loading,
    ResponseList,
    ResponseRegistration,
    Toolbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.response-list {
  height: 478px;
  overflow-y: auto;
}
</style>
