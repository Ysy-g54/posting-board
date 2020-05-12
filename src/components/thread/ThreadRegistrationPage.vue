<template>
  <v-container fluid>
    <Toolbar :title="'スレッドを登録する'"></Toolbar>
    <ThreadRegistration></ThreadRegistration>
  </v-container>
</template>

<script>
import ThreadRegistration from "@/components/thread/ThreadRegistration";
import Toolbar from "@/components/layout/Toolbar";
export default {
  data: () => ({}),
  validations: {},
  methods: {},
  computed: {},
  created() {},
  components: {
    ThreadRegistration,
    Toolbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
