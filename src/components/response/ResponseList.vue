<template>
  <v-list three-line>
    <template v-for="(response, index) in responseList">
      <v-card class="mx-auto" outlined :key="index">
        <div>{{ response.content }}</div>
        <v-list-item-subtitle v-html="`送った日: ${ formatDate(response.insertDateTime)}`"></v-list-item-subtitle>
        <v-card-actions v-if="response.threadId !== undefined">
          <v-btn
            @click="goThreadDetail(response.threadId)"
            text
            color="accent"
          >{{'このスレがあるスレッドを見に行く'}}</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "response-list",
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
    responseList: { type: Array, required: false }
  },
  computed: {},
  watch: {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
