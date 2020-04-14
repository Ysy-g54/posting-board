<template>
  <div v-if="emptyStateFlg">
    <EmptyState :message="'レスがまだ送られていないようです...。レスを送ってみましょう！'"></EmptyState>
  </div>
  <div v-else class="response-list">
    <v-list three-line>
      <template v-for="response in responseList">
        <Response
          :response="response"
          :key="response.uniqueId"
          @on-remove-response-click="removeResponse"
          @on-modification-response-click="modifyNice"
        ></Response>
      </template>
    </v-list>
    <v-dialog v-model="showDialog" max-width="290">
      <v-card>
        <v-card-text>
          {{
          "レスを高評価するならサインアップする必要があります！"
          }}
          <v-layout align-center justify-center>
            <v-btn color="primary" class="ma-2" dark :to="{ name: 'signup' }">{{ 'サインアップする！' }}</v-btn>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" text @click="closeDialog">{{ 'キャンセル' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import responseService from "@/service/response/response-service";
import EmptyState from "@/components/layout/EmptyState";
import Response from "@/components/response/Response";
export default {
  data: () => ({
    showDialog: false,
    targetResponse: []
  }),
  methods: {
    async searchResponseById(responseId) {
      let resultResponse = await responseService.searchByResponseId(responseId);
      this.targetResponse = [];
      this.targetResponse = resultResponse.data();
    },
    async modifyNice(response) {
      if (!this.getLoginUser.isAuthState) {
        this.showDialog = true;
        return;
      }
      await this.searchResponseById(response.responseId);
      let snackBarMessage = "";
      await this.targetResponse.responseList.find(target => {
        if (target.uniqueId === response.uniqueId) {
          if (target.niceList.indexOf(this.getLoginUser.uid) === -1) {
            snackBarMessage = "高く評価したレスに追加しました。";
            target.niceList.push(this.getLoginUser.uid);
          } else if (target.niceList === undefined) {
            target.niceList = [this.getLoginUser.uid];
          } else {
            snackBarMessage = "高く評価したレスから削除しました。";
            target.niceList = target.niceList.filter(
              nice => nice !== this.getLoginUser.uid
            );
          }
          return true;
        }
      });
      await responseService.modify(this.targetResponse, response.responseId);
      await this.$emit("on-modification-response-click", snackBarMessage);
    },
    async removeResponse(response) {
      await this.searchResponseById(response.responseId);
      this.targetResponse.responseList = await this.targetResponse.responseList.filter(
        content => content.uniqueId !== response.uniqueId
      );
      await responseService.modify(this.targetResponse, response.responseId);
      await this.$emit(
        "on-modification-response-click",
        "レスを削除しました。"
      );
    },
    closeDialog() {
      this.showDialog = false;
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
    EmptyState,
    Response
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
