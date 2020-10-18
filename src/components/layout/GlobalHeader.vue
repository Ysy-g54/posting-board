<template>
  <div>
    <v-toolbar color="indigo lighten-1" dark>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list v-if="getLoginUser.isAuthState">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{
                getLoginUser.displayName
                }}
              </v-list-item-title>
              <v-list-item-title>
                {{
                getLoginUser.mailAddress
                }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item :to="'/favorite-response'">
            <v-icon>mdi-thumb-up</v-icon>
            <v-list-item-title>
              {{
              "高く評価したレスを確認する"
              }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item :href="getContactForm" target="_blank" rel="noopener">
            <v-icon>mdi-contacts</v-icon>
            <v-list-item-title>{{ "コンタクト" }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="onLogoutClick">
            <v-icon>mdi-exit-to-app</v-icon>
            <v-list-item-title>{{ "ログアウト" }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item :to="'/signup'">
            <v-icon>mdi-account-plus</v-icon>
            <v-list-item-title>
              {{
              "アカウントを作成する"
              }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title>
        <v-btn class="custom-transform-class text-none" text :to="'/thread'">
          <div>postingBoard</div>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="!$vuetify.breakpoint.xsOnly">
        <ThreadSearchTag />
        <ThreadDetailSearchField />
      </template>
      <template v-if="$vuetify.breakpoint.xsOnly" v-slot:extension>
        <ThreadSearchTag />
        <ThreadDetailSearchField />
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { contactForm } from "../../constants.ts";
import ThreadDetailSearchField from "@/components/search/ThreadDetailSearchField";
import ThreadSearchTag from "@/components/search/ThreadSearchTag";
export default {
  data: () => ({}),
  methods: {
    ...mapActions(["logout"]),
    async onLogoutClick() {
      await this.logout();
      await this.$router.push({
        name: "top"
      });
    }
  },
  watch: {},
  computed: {
    ...mapGetters(["getLoginUser"]),
    getContactForm() {
      return contactForm;
    }
  },
  created() {},
  components: {
    ThreadDetailSearchField,
    ThreadSearchTag
  }
};
</script>
