<template>
  <div>
    <v-container>
      <v-flex md2>
        <v-btn large color="primary" @click="registerResponse">レスを送る</v-btn>
      </v-flex>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex md8>
          <v-textarea v-model="content" placeholder="レス内容" outlined></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import responseService from "@/service/response/response-service";
export default {
  name: "response-registration",
  data: () => ({
    content: "",
    targetResponse: {}
  }),
  methods: {
    async registerResponse() {
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
        this.targetResponse.responseList.push(response);
        await responseService.modify(this.targetResponse, this.responseId);
      }
      this.content = await "";
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
  computed: {},
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
