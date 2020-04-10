<template>
  <div>
    <Toolbar :title="count + '件'"></Toolbar>
    <v-subheader v-if="count !== 0">{{ "レス一覧" }}</v-subheader>
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
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import responseService from "@/service/response/response-service";
import ResponseList from "@/components/response/ResponseList";
import Toolbar from "@/components/layout/Toolbar";
export default {
  name: "favorite-response",
  data: () => ({
    snackbarMessage: "",
    snackbar: false,
    responseContentList: [],
    resultResponseContentList: [],
    count: 0
  }),
  methods: {
    async showSnackbar(message) {
      this.snackbarMessage = await message;
      this.snackbar = await !this.snackbar;
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
      this.count = 0;
      await this.responseContentList.forEach(async responseContent => {
        let filterResponseContent = await responseContent.responseList
          .filter(
            response => response.niceList.indexOf(this.getLoginUser.uid) !== -1
          )
          .map(content => _.set(content, "threadId", responseContent.threadId))
          .map(content =>
            _.set(content, "responseId", responseContent.responseId)
          );
        if (filterResponseContent.length !== 0) {
          this.resultResponseContentList.push(filterResponseContent);
        }
        this.count = filterResponseContent.length;
      });
    },
    async redrawResponse(message) {
      await this.searchResponse();
      await this.filterResponse();
      await this.showSnackbar(message);
    }
  },
  computed: {
    ...mapGetters(["getLoginUser"])
  },
  watch: {},
  async created() {
    await this.searchResponse();
    await this.filterResponse();
  },
  components: {
    ResponseList,
    Toolbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
