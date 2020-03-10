import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify";
import CenterTemplate from "@/components/template/CenterTemplate";

Vue.config.productionTip = false;
Vue.component("CenterTemplate", CenterTemplate);

new Vue({
  render: h => h(App),
  router,
  vuetify
}).$mount("#app");
