import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify";
import CenterTemplate from "@/components/template/CenterTemplate";
import Mixin from "@/util/mixin";

Vue.config.productionTip = false;
Vue.component("CenterTemplate", CenterTemplate);
Vue.mixin(Mixin);

new Vue({
	render: h => h(App),
	router,
	vuetify
}).$mount("#app");
