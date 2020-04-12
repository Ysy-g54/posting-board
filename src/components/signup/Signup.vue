<template>
  <v-container fluid>
    <Toolbar :title="'アカウントを作成する'"></Toolbar>
    <CenterTemplate>
      <v-flex sm8 md4 @keyup.enter="doSignup">
        <v-form onsubmit="return false;">
          <v-text-field
            v-model="userName"
            placeholder="アカウント名"
            outlined
            clearable
          ></v-text-field>
          <v-text-field
            v-model="mailAddress"
            placeholder="メールアドレス"
            outlined
            clearable
          ></v-text-field>
          <v-text-field
            v-model="password"
            placeholder="パスワード"
            outlined
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="changeShowPassword"
          ></v-text-field>
          <v-layout align-center justify-center>
            <v-btn large color="primary" @click="doSignup">作成する</v-btn>
          </v-layout>
        </v-form>
        <v-layout align-center justify-center>
          <div>または</div>
        </v-layout>
        <GoogleAccount :btnOperationName="'作成する'"></GoogleAccount>
      </v-flex>
      <v-snackbar v-model="snackbar">
        {{ snackbarMessage }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </CenterTemplate>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import GoogleAccount from "@/components/login/GoogleAccount";
import Toolbar from "@/components/layout/Toolbar";
export default {
  data: () => ({
    mailAddress: "",
    password: "",
    userName: "",
    snackbarMessage: "",
    snackbar: false,
    showPassword: false
  }),
  methods: {
    ...mapActions(["findLoginUser"]),
    changeShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async doSignup() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.mailAddress, this.password)
        .catch(() => {
          this.snackbarMessage =
            "アカウント作成に失敗しました。入力情報を確かめて、再度試してください。";
          this.snackbar = !this.snackbar;
        });
      let signupUser = await firebase.auth().currentUser;
      await signupUser.updateProfile({
        displayName: this.userName
      });
      await this.findLoginUser();
      await this.$router.push({
        name: "thread"
      });
    }
  },
  components: {
    GoogleAccount,
    Toolbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
