<template>
  <div>
    <v-list three-line>
      <template v-for="thread in threads">
        <v-card class="mx-auto" outlined :key="thread.threadId">
          <div>{{ thread.title}}</div>
          <v-list-item-subtitle>{{ thread.date }}</v-list-item-subtitle>
        </v-card>
      </template>
    </v-list>
    <ResponseRegistration @on-register-thread-click="showSnackbar"></ResponseRegistration>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import ResponseRegistration from "@/components/response/ResponseRegistration";
import moment from "moment";
export default {
  name: "thread-detail",
  data: () => ({
    snackbarMessage: "",
    snackbar: false,
    threads: []
  }),
  methods: {
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = !this.snackbar;
    }
  },
  computed: {},
  created() {
    this.threads.push(
      {
        threadId: 0,
        title: "ひとつめ",
        date: this.formatDate(
          moment(new Date("2015-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 1,
        title: "ふたつめ",
        date: this.formatDate(
          moment(new Date("2016-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 2,
        title:
          "みっつめaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        date: this.formatDate(
          moment(new Date("2017-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 3,
        title: "ひとつめ",
        date: this.formatDate(
          moment(new Date("2018-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 4,
        title: "ふたつめ",
        date: this.formatDate(
          moment(new Date("2019-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 5,
        title: "ひとつめ",
        date: this.formatDate(
          moment(new Date("2020-05-05")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 6,
        title: "ふたつめ",
        date: this.formatDate(
          moment(new Date("2020-05-06")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 7,
        title: "ふたつめ",
        date: this.formatDate(
          moment(new Date("2020-05-06")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 8,
        title: "ふたつめ",
        date: this.formatDate(
          moment(new Date("2020-05-06")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 9,
        title: "ふたつめ",
        date: this.formatDate(
          moment(new Date("2020-05-06")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 10,
        title: "ふたつめ",
        date: this.formatDate(
          moment(new Date("2020-05-06")),
          "YYYY/MM/DD HH:mm"
        )
      },
      {
        threadId: 11,
        title: "ふたつめ",
        date: this.formatDate(
          moment(new Date("2020-05-06")),
          "YYYY/MM/DD HH:mm"
        )
      }
    );
  },
  components: {
    ResponseRegistration
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-list {
  height: 600px;
  overflow-y: auto;
}
</style>
