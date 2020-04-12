<template>
  <v-text-field
    @keyup.enter="searchThreadDetail"
    v-model="q"
    hide-details
    prepend-icon="mdi-magnify"
    placeholder="検索..."
    clearable
  ></v-text-field>
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
  computed: {},
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
