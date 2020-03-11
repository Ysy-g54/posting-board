import Vue from "vue";
import Router from "vue-router";
import Header from "@/components/layout/Header";
import Login from "@/components/login/Login";
import Thread from "@/components/thread/Thread";
import ThreadDetail from "@/components/thread/ThreadDetail";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { isPublic: true, title: "ログイン" }
    },
    {
      path: "/browse",
      component: Header,
      props: true,
      children: [
        {
          path: "/thread",
          name: "thread",
          component: Thread,
          meta: { isPublic: true, title: "スレッド" }
        },
        {
          path: "/thread-detail/:threadId",
          name: "thread-detail",
          component: ThreadDetail,
          meta: { isPublic: true, title: "スレッド詳細" }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isPublic)) {
    // 遷移先がルート認証不要な場合は指定している画面へ遷移します。
    next();
  } else {
    // 遷移先がルート認証必要な場合は、ログインしているかどうか確認します。
    // firebase.auth().onAuthStateChanged(currentUser => {
    //   if (currentUser) {
    //     // ログインしている場合は指定している画面へ遷移します。
    //     next();
    //   } else {
    // ログインしていない場合はログイン画面へ遷移します。
    next({ name: "login" });
    //   }
    // });
  }
});

export default router;
