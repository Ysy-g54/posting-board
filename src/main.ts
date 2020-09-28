import Vue from "vue";
import "babel-polyfill";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './App.vue' or its correspondin... Remove this comment to see the full error message
import App from "./App.vue";
import router from "./router";
import store from "./store";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/plugins/vuetify' or its corr... Remove this comment to see the full error message
import vuetify from "@/plugins/vuetify";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/layout/CenterTemp... Remove this comment to see the full error message
import CenterTemplate from "@/components/layout/CenterTemplate";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/util/mixin' or its correspon... Remove this comment to see the full error message
import Mixin from "@/util/mixin";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/vuelidate` if it exists or... Remove this comment to see the full error message
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import { mapActions } from "vuex";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/lodash` if it exists or ad... Remove this comment to see the full error message
import _ from "lodash";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/service/thread/thread-servic... Remove this comment to see the full error message
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
    let threadListSnapshot: any = [];
    await querySnapshot.forEach((document: any) => {
      let threadSnapshot = _.set(document.data(), "threadId", document.id);
      threadListSnapshot.push(threadSnapshot);
    });
    this.fetchThreads(threadListSnapshot);
  },
}).$mount("#app");
