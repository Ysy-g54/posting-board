<template>
  <div>
    <v-toolbar color="indigo lighten-1" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>posting-board</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        @keyup.enter="searchThreadDetail"
        v-model="q"
        hide-details
        prepend-icon="mdi-magnify"
        placeholder="スレッド・レスの内容で検索"
        clearable
      ></v-text-field>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: () => ({
    q: ""
  }),
  methods: {
    searchThreadDetail() {
      document.activeElement.blur();
      this.$router.push({
        name: "search",
        query: { q: this.q }
      });
    }
  },
  watch: {},
  created() {
    this.q = this.$route.query.q;
  }
};
</script>
