<template>
  <v-dialog v-model="showDialog" max-width="460">
    <v-card>
      <v-card-title>
        <span class="headline">レスを他のスレッドで共有する。</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="selectedThread"
                outlined
                required
                item-text="title"
                item-value="threadId"
                :items="getThreads"
                label="スレッドを検索する"
                :error-messages="getSelectedThreadError"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="content" placeholder="レス(※更新はできません...。)" outlined></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="registerResponse">レスを送る</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import responseService from "@/service/response/response-service";
export default {
  data: () => ({
    selectedThread: "",
    content: "",
    showDialog: false,
    uniqueId: ""
  }),
  validations: {
    selectedThread: {
      required
    }
  },
  methods: {
    async registerResponse() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let threadId = "";
      if (this.$route.params.threadId !== undefined) {
        threadId = this.$route.params.threadId;
      } else {
        threadId = this.response.threadId;
      }

      let threadUrl = await this.$router.resolve({
        name: "thread-detail",
        params: {
          threadId: threadId
        }
      }).href;

      let shareContent = this.response.content;
      let indexOfResult = this.response.content.indexOf(
        "[メッセージを確認する。]"
      );
      if (indexOfResult !== -1) {
        shareContent = shareContent.slice(0, indexOfResult);
      }
      let message =
        this.content +
        "\n\n" +
        "> " +
        shareContent +
        "\n" +
        "[メッセージを確認する。]" +
        "\n\n" +
        "[メッセージを確認する。]: " +
        location.origin +
        "/" +
        threadUrl +
        "/" +
        this.uniqueId;

      let response = {
        uniqueId: new Date().getTime().toString(16) + this.getLoginUser.uid,
        content: message,
        niceList: [],
        insertDateTime: new Date(Date.now()),
        insertUserId: this.getLoginUser.uid
      };
      let querySnapshot = await responseService.searchByThreadId(
        this.selectedThread
      );
      let isNotEmptyFlg = true;
      let responseId = "";
      let targetResponse = {};
      querySnapshot.forEach(document => {
        targetResponse = document.data();
        isNotEmptyFlg = false;
        responseId = document.id;
      });
      if (isNotEmptyFlg) {
        let target = {
          responseList: [response],
          threadId: this.selectedThread
        };
        await responseService.register(target);
      } else {
        await targetResponse.responseList.push(response);
        await responseService.modify(targetResponse, responseId);
      }

      this.$router.push({
        path: `/thread-detail/${this.selectedThread}`
      });
      this.content = "";
      this.uniqueId = "";
      this.closeDialog();
    },
    openDialog(uniqueId) {
      this.uniqueId = uniqueId;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    }
  },
  props: {
    response: { type: Object, required: true }
  },
  computed: {
    ...mapGetters(["getLoginUser", "getThreads"]),
    getSelectedThreadError() {
      if (this.$v.selectedThread.$dirty && !this.$v.selectedThread.required) {
        return "スレッドは選択必須です。";
      } else {
        return [];
      }
    }
  },
  watch: {},
  components: {},
  created() {}
};
</script>
