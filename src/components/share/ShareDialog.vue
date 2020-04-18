<template>
  <v-dialog v-model="showDialog" max-width="460">
    <v-list>
      <v-list-item
        v-for="shareApp in shareApps"
        :key="shareApp.appNm"
        @click="shareMemo(shareApp.url)"
      >
        <div>
          <v-img :src="require(`../../assets/share/${shareApp.img}`)" height="80" width="80" />
        </div>
        <v-list-item-title>
          <span>{{ shareApp.appNm }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script>
import { shareApps } from "../../constants";
export default {
  data: () => ({
    shareApps: shareApps,
    showDialog: false,
    targetThread: {}
  }),
  methods: {
    openDialog(thread) {
      this.targetThread = thread;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    async shareMemo(url) {
      let threadUrl = await this.$router.resolve({
        name: "thread-detail",
        params: {
          threadId: this.targetThread.threadId
        }
      }).href;
      location.href = url + location.origin + encodeURIComponent(threadUrl);
    }
  },
  props: {},
  computed: {},
  watch: {},
  components: {}
};
</script>
