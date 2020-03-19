<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-subheader>スレッド一覧</v-subheader>
        <ThreadList :threadList="threadList"></ThreadList>
      </v-col>
      <v-col>
        <ThreadRegistration @on-register-thread-click="showSnackbar"></ThreadRegistration>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import _ from "lodash";
import threadService from "@/service/thread/thread-service";
import ThreadList from "@/components/thread/ThreadList";
import ThreadRegistration from "@/components/thread/ThreadRegistration";
export default {
  name: "thread",
  data: () => ({
    snackbarMessage: "",
    snackbar: false,
    threadList: []
  }),
  methods: {
    async showSnackbar(message) {
      this.snackbarMessage = await message;
      this.snackbar = await !this.snackbar;
      await this.searchThread();
    },
    async searchThread() {
      let querySnapshot = await threadService.searchAll();
      let threadListSnapshot = [];
      querySnapshot.forEach(document => {
        let threadSnapshot = _.set(document.data(), "threadId", document.id);
        threadListSnapshot.push(threadSnapshot);
      });
      this.threadList = threadListSnapshot;
    }
  },
  computed: {},
  created() {
    this.searchThread();
  },
  components: {
    ThreadList,
    ThreadRegistration
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-list {
  height: 540px;
  overflow-y: auto;
}
</style>
