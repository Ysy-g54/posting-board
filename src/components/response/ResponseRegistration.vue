<template>
  <div>
    <v-container>
      <v-flex>
        <v-btn large color="primary" @click="registerResponse">レスを送る</v-btn>
      </v-flex>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex md12>
          <v-textarea
            v-model="content"
            placeholder="レス(※内容の更新・削除はできないのでご注意ください。)"
            outlined
            required
            :error-messages="getContentError"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import responseService from "@/service/response/response-service";
import { required } from "vuelidate/lib/validators";
export default {
  name: "response-registration",
  data: () => ({
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
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let response = {
        content: this.content,
        insertDateTime: new Date(Date.now())
      };
      if (this.responseId === "") {
        let target = {
          responseList: [response],
          threadId: this.$route.params.threadId
        };
        await responseService.register(target);
      } else {
        await this.targetResponse.responseList.push(response);
        await responseService.modify(this.targetResponse, this.responseId);
      }
      this.content = await "";
      this.$v.$reset();
      await this.$emit("on-register-response-click", "レスを送りました。");
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
    getContentError() {
      if (this.$v.content.$dirty && !this.$v.content.required) {
        return "レスは必須入力です。";
      } else {
        return [];
      }
    }
  },
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: -webkit-right;
}
</style>
