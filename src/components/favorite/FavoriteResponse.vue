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
      <Loading v-if="overlay" />
      <div
        v-else
        v-for="responseContent in filteredResponses"
        :key="responseContent.uniqueId"
      >
        <v-btn
          :to="{
            name: 'thread-detail',
            params: { threadId: responseContent[0].threadId },
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

<script lang="ts">
            
import _ from "lodash";
import { mapGetters } from "vuex";
                          
import responseService from "@/service/response/response-service.ts";
import EmptyState from "@/components/layout/EmptyState.vue";
            
import Loading from "@/components/layout/Loading.vue";
import ResponseList from "@/components/response/ResponseList.vue";
import Toolbar from "@/components/layout/Toolbar.vue";
export default {
  data: () => ({
    overlay: true,
    snackbarMessage: "",
    snackbar: false,
    responses: [],
    filteredResponses: [],
    count: 0,
    emptyStateFlg: false,
  }),
  methods: {
    async showSnackbar(message: string) {
      this.snackbarMessage = await message;
      this.snackbar = true;
    },
    async searchResponse() {
      this.responses = [];
      let querySnapshot = await responseService.searchAll();
      querySnapshot.forEach((document: any) => {
        let responseContent = _.set(document.data(), "responseId", document.id);
            
        this.responses.push(responseContent);
      });
    },
    async filterResponse() {
      this.filteredResponses = [];
      this.count = 0;
      await this.responses.forEach(async (responseContent) => {
                    
        let filteredResponseContent = await responseContent.responseList
          .filter(
                        
            (response) =>
              response.niceList.indexOf(this.getLoginUser.uid) !== -1
          )
                      
          .map((content) =>
                      
            _.set(content, "threadId", responseContent.threadId)
          )
                      
          .map((content) =>
                      
            _.set(content, "responseId", responseContent.responseId)
          );
        if (filteredResponseContent.length !== 0) {
                      
          this.filteredResponses.push(filteredResponseContent);
        }
        this.count += filteredResponseContent.length;
      });
      if (this.count !== 0) {
        this.emptyStateFlg = false;
      } else {
        this.emptyStateFlg = true;
      }
      this.overlay = await false;
    },
                
    async redrawResponse(message) {
      await this.searchResponse();
      await this.filterResponse();
      await this.showSnackbar(message);
    },
  },
  computed: {
    ...mapGetters(["getLoginUser"]),
  },
  watch: {},
  async created() {
    await this.searchResponse();
    await this.filterResponse();
  },
  components: {
    EmptyState,
    Loading,
    ResponseList,
    Toolbar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
