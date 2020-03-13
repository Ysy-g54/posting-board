<template>
  <v-list three-line>
    <template v-for="response in responseList">
      <v-card class="mx-auto" outlined :key="response.responseId">
        <div>{{ response.content}}</div>
        <v-list-item-subtitle v-html="`作成日: ${ formatDate(response.insertDateTime)}`"></v-list-item-subtitle>
      </v-card>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "response-list",
  data: () => ({}),
  methods: {},
  props: {
    responseContent: { type: Object, required: false }
  },
  computed: {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-list {
  height: 600px;
  overflow-y: auto;
}
</style>
