<template>
  <div v-if="emptyStateFlg">
    <EmptyState :message="
        '表示するスレッドがありません。スレッドを作成して話してみましょう！'
      "></EmptyState>
  </div>
  <div v-else>
    <v-list three-line class="thread-list">
      <template v-for="(thread, index) in threadList">
        <v-list-item :key="thread.threadId">
          <v-list-item-content>
            <a v-html="thread.title" @click="goThreadDetail(thread.threadId)"></a>
            <span v-for="(category, index) in thread.categories" :key="category">
              <v-chip v-if="index === 0" :color="getCategoryColor(category)">
                {{
                formatCategory(category)
                }}
              </v-chip>
              <span v-else-if="index === 1" class="grey--text caption">
                他{{
                thread.categories.length - index
                }}つタグが付いています。
              </span>
            </span>
            <v-list-item-subtitle v-if="thread.description !== ''" v-html="thread.description"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="`作成日: ${formatDate(thread.insertDateTime)}`"></v-list-item-subtitle>
          </v-list-item-content>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="openShareDialog(thread.threadId)">
                <v-icon>mdi-share-variant</v-icon>
                <v-list-item-title>{{ "共有する" }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="thread.insertUserId === getLoginUser.uid"
                @click="openDialog(thread.threadId)"
              >
                <v-icon>mdi-delete</v-icon>
                <v-list-item-title>{{ "削除する" }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
        <v-divider v-if="index + 1 < threadList.length" :key="`divider-${thread.threadId}`"></v-divider>
      </template>
      <v-dialog v-model="showDialog" max-width="460">
        <v-card>
          <v-card-text>
            {{
            "スレッド内のレスポンス情報も全て削除しますが、よろしいですか?"
            }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" text @click="closeDialog">キャンセル</v-btn>
            <v-btn color="secondary" text @click="removeThreadDetail">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
    <ShareDialog ref="ShareDialog" @on-copy-to-clip-board-click="showSnackbar"></ShareDialog>
  </div>
</template>

<script>
import responseService from "@/service/response/response-service";
import threadService from "@/service/thread/thread-service";
import EmptyState from "@/components/layout/EmptyState";
import ShareDialog from "@/components/share/ShareDialog";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    showDialog: false,
    targetThreadId: ""
  }),
  methods: {
    showSnackbar() {
      this.$emit(
        "success-copy-to-clip-board",
        "クリップボードにコピーしました。"
      );
    },
    goThreadDetail(threadId) {
      this.$router.push({
        name: "thread-detail",
        params: { threadId }
      });
    },
    openDialog(threadId) {
      this.targetThreadId = threadId;
      this.showDialog = true;
    },
    openShareDialog(thread) {
      this.$refs.ShareDialog.openDialog(thread);
    },
    closeDialog() {
      this.showDialog = false;
    },
    async removeThreadDetail() {
      let querySnapshot = await responseService.searchByThreadId(
        this.targetThreadId
      );
      await querySnapshot.forEach(async document => {
        let responseId = document.id;
        await responseService.remove(responseId);
      });
      await threadService.remove(this.targetThreadId);
      await this.closeDialog();
      await this.$emit(
        "on-remove-thread-detail-click",
        "スレッドを削除しました。"
      );
    }
  },
  props: {
    threadList: { type: Array, required: false },
    emptyStateFlg: { type: Boolean, default: false }
  },
  watch: {},
  computed: {
    ...mapGetters(["getLoginUser"])
  },
  created() {},
  components: {
    EmptyState,
    ShareDialog
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
