<template>
  <div>
    <ThreadList :threadList="resultThreadList[0]"></ThreadList>
    <ResponseList
      v-for="(responseContent, index) in resultResponseContentList"
      :key="index"
      :responseList="responseContent"
    ></ResponseList>
  </div>
</template>

<script>
import _ from "lodash";
import responseService from "@/service/response/response-service";
import threadService from "@/service/thread/thread-service";
import ResponseList from "@/components/response/ResponseList";
import ThreadList from "@/components/thread/ThreadList";
export default {
  name: "thread-detail-search-result",
  data: () => ({
    responseContentList: [],
    resultResponseContentList: [],
    threadList: [],
    resultThreadList: []
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
      await this.responseContentList.forEach(async responseContent =>
        this.resultResponseContentList.push(
          await responseContent.responseList.filter(
            response =>
              response.content !== null &&
              response.content.includes(this.$route.query.q)
          )
        )
      );
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
    }
  },
  computed: {},
  watch: {
    async "$route.query.q"() {
      if (this.$route.query.q !== undefined) {
        await this.filterResponse();
        await this.filterThread();
      }
    }
  },
  async created() {
    await this.searchResponse();
    await this.filterResponse();
    await this.searchThread();
    await this.filterThread();
  },
  components: {
    ResponseList,
    ThreadList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
