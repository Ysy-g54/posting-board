<template>
  <CenterTemplate>
    <v-flex sm8 md4>
      <v-form onsubmit="return false;">
        <v-text-field v-model="mailAddress" placeholder="メールアドレス" outlined clearable></v-text-field>
        <v-text-field v-model="password" placeholder="パスワード" outlined type="password"></v-text-field>
        <v-layout align-center justify-center>
          <v-btn large color="primary" @click="onLoginClick">ログイン</v-btn>
        </v-layout>
      </v-form>
    </v-flex>
  </CenterTemplate>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    mailAddress: "",
    password: ""
  }),
  methods: {
    onLoginClick() {
      this.$router.push({
        name: "thread"
      });
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
