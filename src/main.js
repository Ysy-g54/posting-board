import Vue from "vue";
import App from "./App.vue";
import firebase from 'firebase';
import firebaseConfig from '@/configs/firebase.js';
import router from "./router";
import vuetify from "@/plugins/vuetify";
import CenterTemplate from "@/components/layout/CenterTemplate";
import Mixin from "@/util/mixin";
import Vuelidate from 'vuelidate';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.component("CenterTemplate", CenterTemplate);
Vue.mixin(Mixin);

new Vue({
	render: h => h(App),
	router,
	vuetify,
	created() {
	}
}).$mount("#app");
