<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
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
      <v-col>
        <ThreadRegistration
          v-if="!$vuetify.breakpoint.xsOnly"
          @on-register-thread-click="redrawThread"
        ></ThreadRegistration>
        <v-btn
          v-else
          :to="'/thread-registration'"
          color="accent"
          dark
          right
          fab
          fixed
          class="speed-dial"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
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
      this.threads.length = 0;
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
    if (this.$route.params.snackbarMessage !== undefined) {
      this.showSnackbar(this.$route.params.snackbarMessage);
    }
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
  height: 470px;
  overflow-y: auto;
}

.speed-dial {
  bottom: 50px;
}
</style>
