<template>
  <v-container fluid>
    <Toolbar :title="'検索結果 ' + 	resultCount + '件'"></Toolbar>
    <div v-if="emptyStateFlg">
      <EmptyState :message="'条件を変えて再度検索してみてください・・・。'"></EmptyState>
    </div>
    <div v-else>
      <v-subheader v-if="notEmptyThread">{{ "スレッド一覧" }}</v-subheader>
      <ThreadList
        :threadList="resultThreadList[0]"
        @on-remove-thread-detail-click="redrawThreadDetail"
      ></ThreadList>
      <v-divider class="mx-4" vertical></v-divider>
      <v-subheader v-if="resultResponseCount !== 0">{{ "レス一覧" }}</v-subheader>
      <div v-for="responseContent in resultResponseContentList" :key="responseContent.uniqueId">
        <v-btn
          :to="{name: 'thread-detail', params: { threadId: responseContent[0].threadId }}"
          text
          color="accent"
        >{{'下記レスがあるスレッドを見に行く'}}</v-btn>
        <ResponseList
          :responseList="responseContent"
          @on-modification-response-click="redrawResponse"
        ></ResponseList>
      </div>
      <v-snackbar v-model="snackbar">
        {{ snackbarMessage }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import _ from "lodash";
import responseService from "@/service/response/response-service";
import threadService from "@/service/thread/thread-service";
import EmptyState from "@/components/layout/EmptyState";
import ResponseList from "@/components/response/ResponseList";
import ThreadList from "@/components/thread/ThreadList";
import Toolbar from "@/components/layout/Toolbar";
export default {
  name: "thread-detail-search-result",
  data: () => ({
    snackbarMessage: "",
    snackbar: false,
    responseContentList: [],
    resultResponseContentList: [],
    resultResponseCount: 0,
    threadList: [],
    resultThreadList: [],
    resultCount: 0,
    emptyStateFlg: false
  }),
  methods: {
    async showSnackbar(message) {
      this.snackbarMessage = await message;
      this.snackbar = true;
    },
    async searchResponse() {
      this.responseContentList = [];
      let querySnapshot = await responseService.searchAll();
      querySnapshot.forEach(document => {
        let responseContent = _.set(document.data(), "responseId", document.id);
        this.responseContentList.push(responseContent);
      });
    },
    async filterResponse() {
      this.resultResponseContentList = [];
      this.resultResponseCount = 0;
      await this.responseContentList.forEach(async responseContent => {
        let filterResponseContent = await responseContent.responseList
          .filter(
            response =>
              response.content !== null &&
              response.content.includes(this.$route.query.q)
          )
          .map(content => _.set(content, "threadId", responseContent.threadId))
          .map(content =>
            _.set(content, "responseId", responseContent.responseId)
          );
        if (filterResponseContent.length !== 0) {
          this.resultResponseContentList.push(filterResponseContent);
          this.resultResponseCount += filterResponseContent.length;
        }
      });
    },
    async searchThread() {
      let querySnapshot = await threadService.searchAll();
      let threadListSnapshot = [];
      querySnapshot.forEach(document => {
        let threadSnapshot = _.set(document.data(), "threadId", document.id);
        threadListSnapshot.push(threadSnapshot);
      });
      this.threadList = [];
      this.threadList = threadListSnapshot;
    },
    async filterThread() {
      this.resultThreadList = [];
      await this.resultThreadList.push(
        await this.threadList.filter(
          threadContent =>
            threadContent.title !== null &&
            threadContent.title.includes(this.$route.query.q)
        )
      );
    },
    async redrawThreadDetail(message) {
      await this.searchResponse();
      await this.filterResponse();
      await this.searchThread();
      await this.filterThread();
      await this.calcCount();
      await this.isEmptySearchResult();
      await this.showSnackbar(message);
    },
    async redrawResponse(message) {
      await this.searchResponse();
      await this.filterResponse();
      await this.calcCount();
      await this.isEmptySearchResult();
      await this.showSnackbar(message);
    },
    async calcCount() {
      this.resultCount = 0;
      this.resultCount =
        this.resultResponseCount + this.resultThreadList[0].length;
    },
    async isEmptySearchResult() {
      this.emptyStateFlg = this.resultCount === 0 ? true : false;
    }
  },
  computed: {
    notEmptyThread() {
      return !_.isEmpty(this.resultThreadList[0]);
    }
  },
  watch: {
    async "$route.query.q"() {
      if (this.$route.query.q !== undefined) {
        await this.filterResponse();
        await this.filterThread();
        await this.calcCount();
        await this.isEmptySearchResult();
      }
    }
  },
  async created() {
    await this.searchResponse();
    await this.filterResponse();
    await this.searchThread();
    await this.filterThread();
    await this.calcCount();
    await this.isEmptySearchResult();
  },
  components: {
    EmptyState,
    ResponseList,
    ThreadList,
    Toolbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
