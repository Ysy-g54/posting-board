<template>
  <div v-if="emptyStateFlg">
    <EmptyState></EmptyState>
  </div>
  <div v-else class="response-list">
    <v-list three-line>
      <template v-for="(response, index) in responseList">
        <v-card class="mx-auto" outlined :key="index">
          <div v-html="compiledMarkdown(response.content)"></div>
          <v-list-item-subtitle v-html="`送った日: ${ formatDate(response.insertDateTime)}`"></v-list-item-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="response.insertUserId === getLoginUser.uid"
              icon
              @click="removeResponse(response)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import responseService from "@/service/response/response-service";
import EmptyState from "@/components/layout/EmptyState";
export default {
  name: "response-list",
  data: () => ({
    targetResponse: []
  }),
  methods: {
    compiledMarkdown(content) {
      return marked(content);
    },
    async removeResponse(response) {
      await this.searchResponseById(response.responseId);
      this.targetResponse.responseList = await this.targetResponse.responseList.filter(
        content => content.uniqueId !== response.uniqueId
      );
      await responseService.modify(this.targetResponse, response.responseId);
      await this.$emit("on-remove-response-click", "レスを削除しました。");
    },
    async searchResponseById(responseId) {
      let resultResponse = await responseService.searchByResponseId(responseId);
      this.targetResponse = [];
      this.targetResponse = resultResponse.data();
    }
  },
  props: {
    responseList: { type: Array, required: false },
    emptyStateFlg: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters(["getLoginUser"])
  },
  watch: {},
  created() {},
  components: {
    EmptyState
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
