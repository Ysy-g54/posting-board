<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <v-subheader>スレッド一覧</v-subheader>
        <span>{{ getThreadCount }} 個</span>
        <Loading v-if="overlay" />
        <ThreadList
          v-else
          :threadList="threads"
          :emptyStateFlg="emptyStateFlg"
          @on-remove-thread-detail-click="redrawThread"
          @success-copy-to-clip-board="showSnackbar"
        ></ThreadList>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <ThreadRegistration @on-register-thread-click="redrawThread"></ThreadRegistration>
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
import { mapActions } from "vuex";
import threadService from "@/service/thread/thread-service";
import Loading from "@/components/layout/Loading";
import ThreadList from "@/components/thread/ThreadList";
import ThreadRegistration from "@/components/thread/ThreadRegistration";
export default {
  data: () => ({
    overlay: true,
    snackbarMessage: "",
    snackbar: false,
    threads: [],
    emptyStateFlg: false
  }),
  methods: {
    ...mapActions(["fetchThreads"]),
    async showSnackbar(message) {
      this.snackbarMessage = await message;
      this.snackbar = true;
    },
    async redrawThread(message) {
      this.showSnackbar(message);
      await this.searchThread();
    },
    async searchThread() {
      let querySnapshot = await threadService.searchAll();
      let threadListSnapshot = [];
      await querySnapshot.forEach(document => {
        let threadSnapshot = _.set(document.data(), "threadId", document.id);
        threadListSnapshot.push(threadSnapshot);
      });
      this.threads = threadListSnapshot;
      this.fetchThreads(threadListSnapshot);
      this.emptyStateFlg = _.isEmpty(this.threads);
      this.overlay = await false;
    }
  },
  computed: {
    getThreadCount() {
      return this.threads.length;
    }
  },
  created() {
    this.searchThread();
  },
  components: {
    Loading,
    ThreadList,
    ThreadRegistration
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.thread-list {
  height: 538px;
  overflow-y: auto;
}
</style>
