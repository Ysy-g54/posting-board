import Vue from "vue";
import firebase from "firebase";
import "firebase/firestore";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  // @ts-expect-error ts-migrate(2345) FIXME: Object literal may only specify known properties, ... Remove this comment to see the full error message
  namespaced: true,
  state: {
    loginUser: {
      displayName: "",
      mailAddress: "",
      uid: "",
      isAuthState: false,
    },
    isLoading: true,
    threads: [],
  },
  mutations: {
    async setLoginUser(state) {
      await firebase.auth().onAuthStateChanged((loginUser) => {
        if (loginUser !== null) {
          state.loginUser.displayName = loginUser.displayName || "";
          state.loginUser.mailAddress = loginUser.email || "";
          state.loginUser.uid = loginUser.uid || "";
          state.loginUser.isAuthState = true;
        }
        state.isLoading = false;
      });
      return true;
    },
    setThreads(state, threads) {
      state.threads = threads;
    },
    logout(state) {
      state.loginUser.displayName = "";
      state.loginUser.mailAddress = "";
      state.loginUser.uid = "";
      state.loginUser.isAuthState = false;
    },
  },
  actions: {
    loginByEmailAndPassword(context, params) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(params.mailAddress, params.password)
        .then(() => {
          context.commit("setLoginUser");
        });
    },
    async loginByGoogleAccount(context) {
      let provider = await new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithRedirect(provider);
      await context.commit("setLoginUser");
    },
    async findLoginUser(context) {
      await context.commit("setLoginUser");
      return true;
    },
    async fetchThreads(context, params) {
      context.commit("setThreads", params);
    },
    logout(context) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit("logout");
        });
    },
  },
  getters: {
    getLoginUser: (state) => {
      return state.loginUser;
    },
    getIsLoading: (state) => {
      return state.isLoading;
    },
    getThreads: (state) => {
      return state.threads;
    },
  },
});

export default store;
