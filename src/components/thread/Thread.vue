<template>
  <div>
    <ThreadList></ThreadList>
    <div>
      <v-btn large color="secondary">スレッドを作成する</v-btn>
    </div>
  </div>
</template>

<script>
import ThreadList from "@/components/thread/ThreadList";
export default {
  name: "thread",
  data: () => ({
    threads: []
  }),
  methods: {},
  computed: {},
  created() {},
  components: {
    ThreadList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
