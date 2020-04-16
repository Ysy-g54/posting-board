<template>
  <div>
    <v-toolbar class="sticky" color="indigo lighten-1" dark>
      <v-toolbar-title>posting-board</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="my-2" @click="goSignup">
        <v-btn text small>アカウント作成する</v-btn>
      </div>
    </v-toolbar>
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
        <v-layout align-center justify-center>
          <div>または</div>
        </v-layout>
        <GoogleAccount :btnOperationName="'ログイン'"></GoogleAccount>
      </v-flex>
      <v-snackbar v-model="snackbar">
        {{ snackbarMessage }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </CenterTemplate>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GoogleAccount from "@/components/login/GoogleAccount";
export default {
  data: () => ({
    mailAddress: "",
    password: "",
    snackbarMessage: "",
    snackbar: false,
    showPassword: false
  }),
  methods: {
    ...mapActions(["loginByEmailAndPassword", "loginByGoogleAccount"]),
    changeShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async onLoginClick() {
      let data = await {
        mailAddress: this.mailAddress,
        password: this.password
      };
      await this.loginByEmailAndPassword(data).catch(() => {
        this.snackbarMessage =
          "ログインに失敗しました。入力情報を確かめて、再度試してください。";
        this.snackbar = !this.snackbar;
      });
    },
    async onGoogleLoginClick() {
      await this.loginByGoogleAccount();
    },
    goSignup() {
      this.$router.push({
        name: "signup"
      });
    }
  },
  components: {
    GoogleAccount
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
