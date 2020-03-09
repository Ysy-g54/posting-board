<template>
  <div class="text-center elevation-2 pa-12 headline">
    <div>ログイン</div>
    <div>
      <v-text-field label="ログインID" :rules="rules" hide-details="auto"></v-text-field>
    </div>
    <div>
      <v-text-field label="パスワード"></v-text-field>
    </div>
    <div>
      <v-btn @click="onLoginClick">ログイン</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    sheet: false
  }),
  methods: {
    onLoginClick() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
