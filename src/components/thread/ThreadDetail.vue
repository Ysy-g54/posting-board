<template>
  <v-container fluid>
    <Toolbar :title="title"></Toolbar>
    <span v-for="category in thread.categories" :key="category.categoryId">
      <v-chip :color="getCategoryColor(category)">{{ formatCategory(category) }}</v-chip>
    </span>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <ResponseList
          :responseList="responseContent.responseList"
          :emptyStateFlg="emptyStateFlg"
          @on-modification-response-click="showSnackbar"
        ></ResponseList>
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
import database from "@/service/database";
import threadService from "@/service/thread/thread-service";
import ResponseList from "@/components/response/ResponseList";
import ResponseRegistration from "@/components/response/ResponseRegistration";
import Toolbar from "@/components/layout/Toolbar";
export default {
  name: "thread-detail",
  data: () => ({
    snackbarMessage: "",
    snackbar: false,
    content: {},
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
  firestore: {
    content: database.collection("response")
  },
  watch: {
    async content() {
      await this.content.forEach(async document => {
        if (document.threadId === this.$route.params.threadId) {
          this.responseContent = await document;
          this.responseId = await document.id;
          await this.responseContent.responseList.forEach(async response => {
            _.set(response, "responseId", this.responseId);
          });
        }
      });
      this.emptyStateFlg =
        (await _.isEmpty(this.responseContent)) ||
        (await this.responseContent.responseList.length) === 0;
    }
  },
  computed: {},
  async created() {
    await this.searchThread();
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
.response-list {
  height: 510px;
  overflow-y: auto;
}
</style>
