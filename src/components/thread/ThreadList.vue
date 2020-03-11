<template>
  <v-list three-line>
    <template v-for="(thread, index) in threads">
      <v-list-item :key="thread.threadId" @click="goThreadDetail(thread.threadId)">
        <v-list-item-content>
          <v-list-item-title v-html="thread.title"></v-list-item-title>
          <v-list-item-subtitle v-html="thread.subtitle"></v-list-item-subtitle>
          <v-list-item-subtitle v-html="thread.date"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="index + 1 < threads.length" :key="`divider-${thread.threadId}`"></v-divider>
    </template>
  </v-list>
</template>

<script>
import moment from "moment";
export default {
  name: "thread-list",
  data: () => ({
    threads: []
  }),
  methods: {
    goThreadDetail(threadId) {
      this.$router.push({
        name: "thread-detail",
        params: { threadId }
      });
    }
  },
  computed: {},
  created() {
    this.threads.push(
      {
        threadId: 0,
        title: "ひとつめ",
        subtitle: "サブ",
        date: this.formatDate(
          moment(new Date("2015-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 1,
        title: "ふたつめ",
        subtitle: "サブ",
        date: this.formatDate(
          moment(new Date("2016-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 2,
        title:
          "みっつめaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        subtitle: "サブ",
        date: this.formatDate(
          moment(new Date("2017-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 3,
        title: "ひとつめ",
        subtitle: "サブ",
        date: this.formatDate(
          moment(new Date("2018-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 4,
        title: "ふたつめ",
        subtitle: "サブ",
        date: this.formatDate(
          moment(new Date("2019-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 5,
        title: "ひとつめ",
        subtitle: "サブ",
        date: this.formatDate(
          moment(new Date("2020-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 6,
        title: "ふたつめ",
        subtitle: "サブ",
        date: this.formatDate(
          moment(new Date("2020-05-06")),
          "YYYY/MM/DD HH:mm"
        )
      }
    );
  },
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
