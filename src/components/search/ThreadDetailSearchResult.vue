<template>
  <div>
    <Toolbar :title="'検索結果 ' + 	resultCount + '件'"></Toolbar>
    <v-subheader v-if="notEmptyThread">{{ "スレッド一覧" }}</v-subheader>
    <ThreadList :threadList="resultThreadList[0]"></ThreadList>
    <v-divider class="mx-4" vertical></v-divider>
    <v-subheader v-if="resultResponseCount !== 0">{{ "レス一覧" }}</v-subheader>
    <div v-for="responseContent in resultResponseContentList" :key="responseContent[0].threadId">
      <v-btn
        :to="{name: 'thread-detail', params: { threadId: responseContent[0].threadId }}"
        text
        color="accent"
      >{{'下記レスがあるスレッドを見に行く'}}</v-btn>
      <ResponseList :responseList="responseContent"></ResponseList>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import responseService from "@/service/response/response-service";
import threadService from "@/service/thread/thread-service";
import ResponseList from "@/components/response/ResponseList";
import ThreadList from "@/components/thread/ThreadList";
import Toolbar from "@/components/layout/Toolbar";
export default {
  name: "thread-detail-search-result",
  data: () => ({
    responseContentList: [],
    resultResponseContentList: [],
    resultResponseCount: 0,
    threadList: [],
    resultThreadList: [],
    resultCount: 0
  }),
  methods: {
    async searchResponse() {
      let querySnapshot = await responseService.searchAll();
      querySnapshot.forEach(document => {
        this.responseContentList.push(document.data());
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
          .map(content => _.set(content, "threadId", responseContent.threadId));
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
    async calcCount() {
      this.resultCount = 0;
      this.resultCount =
        this.resultResponseCount + this.resultThreadList[0].length;
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
      }
    }
  },
  async created() {
    await this.searchResponse();
    await this.filterResponse();
    await this.searchThread();
    await this.filterThread();
    await this.calcCount();
  },
  components: {
    ResponseList,
    ThreadList,
    Toolbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
