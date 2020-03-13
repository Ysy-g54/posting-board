<template>
  <CenterTemplate>
    <v-flex sm8 md4>
      <v-form onsubmit="return false;">
        <v-text-field v-model="mailAddress" placeholder="メールアドレス" outlined clearable></v-text-field>
        <v-text-field
          v-model="password"
          placeholder="パスワード"
          outlined
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="changeShowPassword"
        ></v-text-field>
        <v-layout align-center justify-center>
          <v-btn large color="primary" @click="onLoginClick">ログイン</v-btn>
        </v-layout>
      </v-form>
    </v-flex>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </CenterTemplate>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data: () => ({
    mailAddress: "",
    password: "",
    snackbarMessage: "",
    snackbar: false,
    showPassword: false
  }),
  methods: {
    changeShowPassword() {
      this.showPassword = !this.showPassword;
    },
    onLoginClick() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mailAddress, this.password)
        .then(() => {
          this.$router.push({
            name: "thread"
          });
        })
        .catch(() => {
          this.snackbarMessage =
            "ログインに失敗しました。入力情報を確かめて、再度試してください。";
          this.snackbar = !this.snackbar;
        });
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
