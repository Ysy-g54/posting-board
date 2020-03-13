<template>
  <v-list three-line>
    <template v-for="(response, index) in responseList">
      <v-card class="mx-auto" outlined :key="index">
        <div>{{ response.content }}</div>
        <v-list-item-subtitle v-html="`送った日: ${ formatDate(response.insertDateTime)}`"></v-list-item-subtitle>
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
    responseList: { type: Array, required: false }
  },
  watch: {},
  computed: {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
