<template>
  <v-container fluid>
    <Toolbar :title="'検索結果 ' + count + '件'"></Toolbar>
    <div v-if="emptyStateFlg">
      <EmptyState :message="'条件を変えて再度検索してみてください...。'"></EmptyState>
    </div>
    <div v-else>
      <v-subheader v-if="notEmptyThread">{{ "スレッド一覧" }}</v-subheader>
      <Loading v-if="overlay" />
      <div v-else>
        <ThreadList
          :threadList="filteredThreads[0]"
          @on-remove-thread-detail-click="redrawThreadDetail"
        ></ThreadList>
        <v-divider class="mx-4" vertical></v-divider>
        <v-subheader v-if="responseCount !== 0">
          {{
          "レス一覧"
          }}
        </v-subheader>
        <div v-for="responseContent in filteredResponseContents" :key="responseContent.uniqueId">
          <v-btn
            :to="{
            name: 'thread-detail',
            params: { threadId: responseContent[0].threadId }
          }"
            text
            color="accent"
          >{{ "下記レスがあるスレッドを見に行く" }}</v-btn>
          <ResponseList
            :responseList="responseContent"
            @on-modification-response-click="redrawResponse"
          ></ResponseList>
        </div>
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
import Loading from "@/components/layout/Loading";
import ResponseList from "@/components/response/ResponseList";
import ThreadList from "@/components/thread/ThreadList";
import Toolbar from "@/components/layout/Toolbar";
export default {
  data: () => ({
    overlay: true,
    snackbarMessage: "",
    snackbar: false,
    responseContents: [],
    filteredResponseContents: [],
    responseCount: 0,
    threads: [],
    filteredThreads: [],
    count: 0,
    emptyStateFlg: false
  }),
  methods: {
    async showSnackbar(message) {
      this.snackbarMessage = await message;
      this.snackbar = true;
    },
    async searchResponse() {
      this.responseContents = [];
      let querySnapshot = await responseService.searchAll();
      querySnapshot.forEach(document => {
        let responseContent = _.set(document.data(), "responseId", document.id);
        this.responseContents.push(responseContent);
      });
    },
    async filterResponse() {
      this.filteredResponseContents = [];
      this.responseCount = 0;
      await this.responseContents.forEach(async responseContent => {
        let filterResponseContent = await responseContent.responseList
          .filter(
            response =>
              response.content !== "" &&
              response.content.includes(this.$route.query.q)
          )
          .map(content => _.set(content, "threadId", responseContent.threadId))
          .map(content =>
            _.set(content, "responseId", responseContent.responseId)
          );
        if (filterResponseContent.length !== 0) {
          this.filteredResponseContents.push(filterResponseContent);
          this.responseCount += filterResponseContent.length;
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
      this.threads = [];
      this.threads = threadListSnapshot;
    },
    async filterThread() {
      this.filteredThreads = [];
      await this.filteredThreads.push(
        await this.threads.filter(
          threadContent =>
            threadContent.title !== "" &&
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
      this.overlay = await false;
      await this.showSnackbar(message);
    },
    async redrawResponse(message) {
      await this.searchResponse();
      await this.filterResponse();
      await this.calcCount();
      await this.isEmptySearchResult();
      this.overlay = await false;
      await this.showSnackbar(message);
    },
    async calcCount() {
      this.count = 0;
      this.count = this.responseCount + this.filteredThreads[0].length;
    },
    async isEmptySearchResult() {
      this.emptyStateFlg = this.count === 0;
    }
  },
  computed: {
    notEmptyThread() {
      return !_.isEmpty(this.filteredThreads[0]);
    }
  },
  watch: {
    async "$route.query.q"() {
      if (this.$route.query.q !== undefined) {
        await this.filterResponse();
        await this.filterThread();
        await this.calcCount();
        await this.isEmptySearchResult();
        this.overlay = await false;
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
    this.overlay = await false;
  },
  components: {
    EmptyState,
    Loading,
    ResponseList,
    ThreadList,
    Toolbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
