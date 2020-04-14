<template>
  <div>
    <v-text-field
      @keyup.enter="searchThreadDetail"
      v-model="q"
      hide-details
      prepend-icon="mdi-magnify"
      placeholder="検索..."
      clearable
    ></v-text-field>
    <v-dialog v-model="showDialog" max-width="290">
      <v-card>
        <v-card-text>
          {{
          "レスを高評価するならサインアップする必要があります！"
          }}
          <v-layout align-center justify-center>
            <v-btn color="primary" class="ma-2" dark :to="{ name: 'signup' }">{{ 'サインアップする！' }}</v-btn>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" text @click="closeDialog">{{ 'キャンセル' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    q: "",
    showDialog: false
  }),
  methods: {
    searchThreadDetail() {
      document.activeElement.blur();
      if (!this.getLoginUser.isAuthState) {
        this.showDialog = true;
        return;
      }
      this.$router.push({
        name: "search",
        query: { q: this.q }
      });
    },
    closeDialog() {
      this.showDialog = false;
    }
  },
  computed: {
    ...mapGetters(["getLoginUser"])
  },
  watch: {
    async "$route.query.q"() {
      if (this.$route.query.q !== undefined) {
        this.q = this.$route.query.q;
      }
    }
  },
  async created() {
    if (this.$route.query.q !== undefined) {
      this.q = this.$route.query.q;
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
