import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import CenterTemplate from "@/components/layout/CenterTemplate";
import Mixin from "@/util/mixin";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import { mapActions } from "vuex";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.component("CenterTemplate", CenterTemplate);
Vue.mixin(Mixin);

new Vue({
  render: (h) => h(App),
  router,
  store,
  vuetify,
  methods: {
    ...mapActions(["findLoginUser"]),
  },
  async created() {
    await this.findLoginUser();
  },
}).$mount("#app");
