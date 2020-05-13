import Vue from "vue";
import Router from "vue-router";
import FavoriteResponse from "@/components/favorite/FavoriteResponse";
import Header from "@/components/layout/Header";
import Login from "@/components/login/Login";
import Signup from "@/components/signup/Signup";
import ThreadDetailSearchResult from "@/components/search/ThreadDetailSearchResult";
import Thread from "@/components/thread/Thread";
import ThreadDetail from "@/components/thread/ThreadDetail";
import ThreadRegistrationPage from "@/components/thread/ThreadRegistrationPage";
import Top from "@/components/top/Top";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "top",
      component: Top,
      meta: { isPublic: true, title: "トップ" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { isPublic: true, title: "ログイン" },
    },
    {
      path: "/brouse",
      component: Header,
      props: true,
      children: [
        {
          path: "/thread",
          name: "thread",
          component: Thread,
          meta: { isPublic: false, title: "スレッド" },
        },
        {
          path: "/thread-registration",
          name: "thread-registration",
          component: ThreadRegistrationPage,
          meta: { isPublic: false, title: "スレッド登録" },
        },
        {
          path: "/thread-detail/:threadId/:uniqueId?",
          name: "thread-detail",
          component: ThreadDetail,
          meta: { isPublic: false, title: "スレッド詳細" },
        },
        {
          path: "/search",
          query: { q: "word", category: "category" },
          name: "search",
          component: ThreadDetailSearchResult,
          meta: { isPublic: false, title: "スレッド・レスの検索結果" },
        },
        {
          path: "/favorite-response",
          name: "favorite-response",
          component: FavoriteResponse,
          meta: { isPublic: false, title: "高く評価したレス一覧" },
        },
      ],
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: { isPublic: true, title: "アカウントを作成する" },
    },
    {
      path: "*",
      redirect: "/thread",
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const names = ["login", "signup", "top"];
  if (names.some((record) => record === to.name)) {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        next({ name: "thread" });
      } else {
        // ログインしていない場合は指定した画面へ遷移します。
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
