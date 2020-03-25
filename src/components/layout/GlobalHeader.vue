<template>
  <div>
    <v-toolbar color="indigo lighten-1" dark>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ getLoginUser.displayName }}</v-list-item-title>
              <v-list-item-title>{{ getLoginUser.mailAddress }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="onLogoutClick">
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
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    q: ""
  }),
  methods: {
    ...mapActions(["logout"]),
    searchThreadDetail() {
      document.activeElement.blur();
      this.$router.push({
        name: "search",
        query: { q: this.q }
      });
    },
    async onLogoutClick() {
      await this.logout();
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
  computed: {
    ...mapGetters(["getLoginUser"])
  },
  created() {
    if (this.$route.query.q !== undefined) {
      this.q = this.$route.query.q;
    }
  }
};
</script>
