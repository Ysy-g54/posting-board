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
import _ from "lodash";
import threadService from "@/service/thread/thread-service";

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
    ...mapActions(["findLoginUser", "fetchThreads"]),
  },
  async created() {
    await this.findLoginUser();
    let querySnapshot = await threadService.searchAll();
    let threadListSnapshot = [];
    await querySnapshot.forEach((document) => {
      let threadSnapshot = _.set(document.data(), "threadId", document.id);
      threadListSnapshot.push(threadSnapshot);
    });
    this.fetchThreads(threadListSnapshot);
  },
}).$mount("#app");
