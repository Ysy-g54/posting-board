<template>
  <v-card class="mx-auto" outlined>
    <div v-html="compiledMarkdown(response.content)"></div>
    <v-list-item-subtitle
      v-html="`送った日: ${formatDate(response.insertDateTime)}`"
    ></v-list-item-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="modifyNice(response)">
        <v-icon v-if="isNotNiceClick">mdi-thumb-up</v-icon>
        <v-icon v-else color="blue">mdi-thumb-up</v-icon>
      </v-btn>
      <div>{{ response.niceList.length }}</div>
      <!-- <v-icon>mdi-share-variant</v-icon> -->
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

<script>
import { mapGetters } from "vuex";
import marked from "marked";
export default {
  data: () => ({
    targetResponse: []
  }),
  methods: {
    compiledMarkdown(content) {
      return marked(content);
    },
    async removeResponse(response) {
      this.$emit("on-remove-response-click", response);
    },
    async modifyNice(response) {
      await this.$emit("on-modification-response-click", response);
    }
  },
  props: {
    response: { type: Object, required: true }
  },
  computed: {
    ...mapGetters(["getLoginUser"]),
    isNotNiceClick() {
      if (this.response.niceList.indexOf(this.getLoginUser.uid) === -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
