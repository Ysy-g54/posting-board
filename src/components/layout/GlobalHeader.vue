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
      <v-toolbar-title>
        <div>
          <v-btn class="custom-transform-class text-none" text :to="{name: 'thread'}">posting-board</v-btn>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        @keyup.enter="searchThreadDetail"
        v-model="q"
        hide-details
        prepend-icon="mdi-magnify"
        placeholder="検索..."
        clearable
      ></v-text-field>
    </v-toolbar>
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
  watch: {
    async "$route.query.q"() {
      if (this.$route.query.q !== undefined) {
        this.q = this.$route.query.q;
      }
    }
  },
  created() {
    if (this.$route.query.q !== undefined) {
      this.q = this.$route.query.q;
    }
  }
};
</script>
