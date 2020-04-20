<template>
  <div>
    <v-container>
      <v-flex>
        <v-btn large color="primary" @click="registerResponse" :loading="isBtnLoading">レスを送る</v-btn>
      </v-flex>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-tabs>
          <v-tab>編集</v-tab>
          <v-tab>プレビュー</v-tab>
          <v-tab-item>
            <v-flex md12>
              <v-textarea
                v-model="content"
                placeholder="レス(※更新はできません...。)"
                outlined
                required
                :error-messages="getContentError"
              ></v-textarea>
            </v-flex>
          </v-tab-item>
          <v-tab-item>
            <v-flex md12 class="preview">
              <div v-html="compiledMarkdown"></div>
            </v-flex>
          </v-tab-item>
        </v-tabs>
      </v-layout>
    </v-container>
    <SignUpGuideDialog ref="SignUpGuideDialog" :actionMessage="'レスを登録するなら'"></SignUpGuideDialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import responseService from "@/service/response/response-service";
import { required } from "vuelidate/lib/validators";
import SignUpGuideDialog from "@/components/guide/SignUpGuideDialog";
export default {
  data: () => ({
    isBtnLoading: false,
    content: "",
    targetResponse: {}
  }),
  validations: {
    content: {
      required
    }
  },
  methods: {
    async registerResponse() {
      if (!this.getLoginUser.isAuthState) {
        this.$refs.SignUpGuideDialog.openDialog();
        return;
      }

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.isBtnLoading = true;
      let response = {
        uniqueId: new Date().getTime().toString(16) + this.getLoginUser.uid,
        content: this.content,
        niceList: [],
        insertDateTime: new Date(Date.now()),
        insertUserId: this.getLoginUser.uid
      };

      if (this.responseId === "") {
        let target = {
          responseList: [response],
          threadId: this.$route.params.threadId
        };
        await responseService.register(target).catch(() => {
          this.$emit(
            "on-register-response-click",
            "レスを送るのに失敗しました。接続確認をし、再度お試しください。"
          );
        });
      } else {
        await this.searchResponseById();
        await this.targetResponse.responseList.push(response);
        await responseService
          .modify(this.targetResponse, this.responseId)
          .catch(() => {
            this.isBtnLoading = false;
            this.$emit(
              "on-register-response-click",
              "レスを送るのに失敗しました。接続確認をし、再度お試しください。"
            );
          });
      }
      this.content = await "";
      this.$v.$reset();
      this.isBtnLoading = false;
      await this.$emit("on-register-response-click", "レスを送りました。");
    },
    async searchResponseById() {
      let resultResponse = await responseService.searchByResponseId(
        this.responseId
      );
      this.targetResponse.responseList = [];
      this.targetResponse.responseList = resultResponse.data().responseList;
    }
  },
  props: {
    responseContent: { type: Object, required: false },
    responseId: { type: String, default: "", required: false }
  },
  watch: {
    responseContent() {
      this.targetResponse = this.responseContent;
    }
  },
  computed: {
    ...mapGetters(["getLoginUser"]),
    getContentError() {
      if (this.$v.content.$dirty && !this.$v.content.required) {
        return "レスは必須入力です。";
      } else {
        return [];
      }
    },
    compiledMarkdown() {
      return marked(this.content);
    }
  },
  created() {},
  components: {
    SignUpGuideDialog
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: -webkit-right;
}

.preview {
  height: 260px;
  text-align: -webkit-left;
}
</style>
