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
    <SignUpGuideDialog ref="SignUpGuideDialog" :actionMessage="'検索をするなら'"></SignUpGuideDialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SignUpGuideDialog from "@/components/dialog/SignUpGuideDialog";
export default {
  data: () => ({
    q: ""
  }),
  methods: {
    searchThreadDetail() {
      document.activeElement.blur();
      if (!this.getLoginUser.isAuthState) {
        this.$refs.SignUpGuideDialog.openDialog();
        return;
      }
      this.$router.push({
        name: "search",
        query: { q: this.q }
      });
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
  components: {
    SignUpGuideDialog
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
