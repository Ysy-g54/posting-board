import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [

  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.isPublic)) {
//     // 遷移先がルート認証不要な場合は指定している画面へ遷移します。
//     next();
//   } else {
//     // 遷移先がルート認証必要な場合は、ログインしているかどうか確認します。
//     firebase.auth().onAuthStateChanged(currentUser => {
//       if (currentUser) {
//         // ログインしている場合は指定している画面へ遷移します。
//         next();
//       } else {
//         // ログインしていない場合はログイン画面へ遷移します。
//         next({ name: "login" });
//       }
//     });
//   }
// });

export default router;
