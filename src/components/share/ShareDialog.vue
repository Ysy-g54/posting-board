<template>
  <v-dialog v-model="showDialog" max-width="460">
    <v-list>
      <v-list-item
        v-for="shareApp in getShareApps"
        :key="shareApp.appNm"
        @click="shareThreadDetail(shareApp.url)"
      >
        <div>
          <v-img :src="require(`../../assets/share/${shareApp.img}`)" height="80" width="80" />
        </div>
        <v-list-item-title>
          <span>{{ shareApp.appNm }}</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="copyToClipBoard">
        <div>
          <v-img :src="require(`../../assets/share/${getCopyContent.img}`)" height="80" width="80" />
        </div>
        <v-list-item-title>
          <span>{{ getCopyContent.nm }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script>
import { shareApps, copy } from "../../constants";
export default {
  data: () => ({
    showDialog: false,
    targetThreadId: ""
  }),
  methods: {
    openDialog(threadId) {
      this.targetThreadId = threadId;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    async shareThreadDetail(url) {
      let threadUrl = await this.$router.resolve({
        name: "thread-detail",
        params: {
          threadId: this.targetThreadId
        }
      }).href;
      let targetUrl =
        url + location.origin + "/" + encodeURIComponent(threadUrl);
      window.open(targetUrl, "_blank", "noopener");
    },
    async copyToClipBoard() {
      let threadUrl = await this.$router.resolve({
        name: "thread-detail",
        params: {
          threadId: this.targetThreadId
        }
      }).href;
      const copyText = location.origin + threadUrl;
      await navigator.clipboard.writeText(copyText);
      await this.closeDialog();
      await this.$emit("on-copy-to-clip-board-click");
    }
  },
  props: {},
  computed: {
    getCopyContent() {
      return copy;
    },
    getShareApps() {
      return shareApps;
    }
  },
  watch: {},
  components: {}
};
</script>
