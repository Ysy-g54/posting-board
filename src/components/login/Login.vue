<template>
  <CenterTemplate>
    <div>
      <v-form onsubmit="return false;">
        <v-text-field v-model="userId" placeholder="ログインID" outlined clearable></v-text-field>
        <v-text-field v-model="password" placeholder="パスワード" outlined type="password"></v-text-field>
        <v-layout align-center justify-center>
          <v-btn large color="primary" @click="onLoginClick">ログイン</v-btn>
        </v-layout>
      </v-form>
    </div>
  </CenterTemplate>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    userId: "",
    password: ""
  }),
  methods: {
    onLoginClick() {
      this.$router.push({
        name: "hello-world"
      });
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
