<template>
  <v-container fluid>
    <Toolbar :title="count + '件'"></Toolbar>
    <div v-if="emptyStateFlg">
      <EmptyState
        :message="
          '高く評価したレスはありません。レスを見ていき、高く評価してみましょう！'
        "
      ></EmptyState>
    </div>
    <div v-else>
      <v-subheader>{{ "レス一覧" }}</v-subheader>
      <div
        v-for="responseContent in filteredResponseList"
        :key="responseContent.uniqueId"
      >
        <v-btn
          :to="{
            name: 'thread-detail',
            params: { threadId: responseContent[0].threadId }
          }"
          text
          color="accent"
          >{{ "下記レスがあるスレッドを見に行く" }}</v-btn
        >
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
import { mapGetters } from "vuex";
import responseService from "@/service/response/response-service";
import EmptyState from "@/components/layout/EmptyState";
import ResponseList from "@/components/response/ResponseList";
import Toolbar from "@/components/layout/Toolbar";
export default {
  data: () => ({
    snackbarMessage: "",
    snackbar: false,
    responseList: [],
    filteredResponseList: [],
    count: 0,
    emptyStateFlg: false
  }),
  methods: {
    async showSnackbar(message) {
      this.snackbarMessage = await message;
      this.snackbar = true;
    },
    async searchResponse() {
      this.responseList = [];
      let querySnapshot = await responseService.searchAll();
      querySnapshot.forEach(document => {
        let responseContent = _.set(document.data(), "responseId", document.id);
        this.responseList.push(responseContent);
      });
    },
    async filterResponse() {
      this.filteredResponseList = [];
      this.count = 0;
      await this.responseList.forEach(async responseContent => {
        let filteredResponseContent = await responseContent.responseList
          .filter(
            response => response.niceList.indexOf(this.getLoginUser.uid) !== -1
          )
          .map(content => _.set(content, "threadId", responseContent.threadId))
          .map(content =>
            _.set(content, "responseId", responseContent.responseId)
          );
        if (filteredResponseContent.length !== 0) {
          this.filteredResponseList.push(filteredResponseContent);
          this.emptyStateFlg = false;
        } else {
          this.emptyStateFlg = true;
        }
        this.count = filteredResponseContent.length;
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
    EmptyState,
    ResponseList,
    Toolbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
