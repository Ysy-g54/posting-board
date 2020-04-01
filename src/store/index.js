import Vue from "vue";
import firebase from "firebase";
import "firebase/firestore";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
	namespaced: true,
	state: {
		loginUser: {
			displayName: "",
			mailAddress: "",
			uid: "",
		}
	},
	mutations: {
		async setLoginUser(state) {
			await firebase.auth().onAuthStateChanged(loginUser => {
				state.loginUser.displayName = loginUser.displayName || "";
				state.loginUser.mailAddress = loginUser.email || "";
				state.loginUser.uid = loginUser.uid || "";
			});
		},
		logout(state) {
			state.loginUser.displayName = "";
			state.loginUser.mailAddress = "";
			state.loginUser.uid = "";
		}
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
		},
		logout(context) {
			return firebase
				.auth()
				.signOut()
				.then(() => {
					context.commit("logout");
				});
		}
	},
	getters: {
		getLoginUser: state => {
			return state.loginUser;
		}
	}
});

export default store;
