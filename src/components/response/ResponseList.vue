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
        </v-card>
      </template>
    </v-list>
  </div>
</template>

<script>
import marked from "marked";
import EmptyState from "@/components/layout/EmptyState";
export default {
  name: "response-list",
  data: () => ({}),
  methods: {
    compiledMarkdown(content) {
      return marked(content);
    }
  },
  props: {
    responseList: { type: Array, required: false },
    emptyStateFlg: { type: Boolean, default: false }
  },
  computed: {},
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
