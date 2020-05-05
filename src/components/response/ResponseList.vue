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
          @on-response-share-click="openShareDialog"
        ></Response>
      </template>
    </v-list>
    <ResponseShareDialog ref="ResponseShareDialog" :response="shareResponse"></ResponseShareDialog>
    <SignUpGuideDialog ref="SignUpGuideDialog" :actionMessage="actionMessage"></SignUpGuideDialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import responseService from "@/service/response/response-service";
import EmptyState from "@/components/layout/EmptyState";
import Response from "@/components/response/Response";
import ResponseShareDialog from "@/components/share/ResponseShareDialog";
import SignUpGuideDialog from "@/components/guide/SignUpGuideDialog";
export default {
  data: () => ({
    actionMessage: "",
    shareResponse: {},
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
        this.actionMessage = "レスを高評価するなら";
        this.$refs.SignUpGuideDialog.openDialog();
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
    openShareDialog(response) {
      if (!this.getLoginUser.isAuthState) {
        this.actionMessage = "レスを他のスレッドで共有するなら";
        this.$refs.SignUpGuideDialog.openDialog();
        return;
      }
      this.shareResponse = response;
      this.$refs.ResponseShareDialog.openDialog(response.uniqueId);
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
    Response,
    ResponseShareDialog,
    SignUpGuideDialog
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
