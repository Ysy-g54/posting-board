<template>
  <v-toolbar flat>
    <v-btn icon @click="back">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-subheader>{{ title }}</v-subheader>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    back() {
      this.$router.back();
    }
  },
  props: {
    title: { type: String, default: "" }
  },
  watch: {},
  created() {}
};
</script>
