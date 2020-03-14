<template>
  <div>
    <v-toolbar color="indigo lighten-1" dark>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>{{ "ログアウト" }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
import firebase from "firebase";
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
    },
    async logout() {
      await firebase.auth().signOut();
      await this.$router.push({
        name: "login"
      });
    }
  },
  watch: {},
  created() {
    this.q = this.$route.query.q;
  }
};
</script>
