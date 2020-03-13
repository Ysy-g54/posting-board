<template>
  <v-list three-line>
    <template v-for="(thread, index) in threadList">
      <v-list-item :key="thread.threadId" @click="goThreadDetail(thread.threadId)">
        <v-list-item-content>
          <v-list-item-title v-html="thread.title"></v-list-item-title>
          <span v-for="(category, index) in thread.categories" :key="category">
            <v-chip v-if="index === 0">{{ formatCategory(category) }}</v-chip>
            <span
              v-else-if="index === 1"
              class="grey--text caption"
            >他{{ thread.categories.length - index }}つタグが付いています。</span>
          </span>
          <v-list-item-subtitle v-html="thread.description"></v-list-item-subtitle>
          <v-list-item-subtitle v-html="`作成日: ${ formatDate(thread.insertDateTime)}`"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="index + 1 < threadList.length" :key="`divider-${thread.threadId}`"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "thread-list",
  data: () => ({}),
  methods: {
    goThreadDetail(threadId) {
      this.$router.push({
        name: "thread-detail",
        params: { threadId }
      });
    }
  },
  props: {
    threadList: { type: Array, required: false }
  },
  computed: {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-list {
  height: 550px;
  overflow-y: auto;
}
</style>
