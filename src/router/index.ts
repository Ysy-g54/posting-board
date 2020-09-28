import Vue from "vue";
import Router from "vue-router";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/favorite/Favorite... Remove this comment to see the full error message
import FavoriteResponse from "@/components/favorite/FavoriteResponse";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/layout/Header' or... Remove this comment to see the full error message
import Header from "@/components/layout/Header";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/login/Login' or i... Remove this comment to see the full error message
import Login from "@/components/login/Login";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/signup/Signup' or... Remove this comment to see the full error message
import Signup from "@/components/signup/Signup";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/search/ThreadDeta... Remove this comment to see the full error message
import ThreadDetailSearchResult from "@/components/search/ThreadDetailSearchResult";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/thread/Thread' or... Remove this comment to see the full error message
import Thread from "@/components/thread/Thread";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/thread/ThreadDeta... Remove this comment to see the full error message
import ThreadDetail from "@/components/thread/ThreadDetail";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/thread/ThreadRegi... Remove this comment to see the full error message
import ThreadRegistrationPage from "@/components/thread/ThreadRegistrationPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/top/Top' or its c... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2322) FIXME: Object literal may only specify known properties, ... Remove this comment to see the full error message
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
