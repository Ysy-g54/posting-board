<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-tag</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="category in getCategories"
        :key="category.categoryId"
        @click="onClickCategory(category.categoryId)"
      >
        <v-badge dot left :color="category.color"></v-badge>
        <v-list-item-title>{{ category.categoryNm }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { categories } from "@/constants";
export default {
  data: () => ({}),
  methods: {
    onClickCategory(categoryId) {
      this.$router.push({
        name: "search",
        query: { q: this.$route.query.q, category: categoryId }
      });
    }
  },
  computed: {
    getCategories() {
      return categories;
    }
  },
  watch: {},
  async created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
