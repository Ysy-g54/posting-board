import Vue from "vue";
import Router from "vue-router";
import Header from "@/components/layout/Header";
import Login from "@/components/login/Login";
import ThreadDetailSearchResult from "@/components/search/ThreadDetailSearchResult";
import Thread from "@/components/thread/Thread";
import ThreadDetail from "@/components/thread/ThreadDetail";
import Signup from "@/components/signup/Signup";
import firebase from "firebase";

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
			path: "/brouse",
			component: Header,
			props: true,
			children: [
				{
					path: "/thread",
					name: "thread",
					component: Thread,
					meta: { isPublic: false, title: "スレッド" }
				},
				{
					path: "/thread-detail/:threadId",
					name: "thread-detail",
					component: ThreadDetail,
					meta: { isPublic: false, title: "スレッド詳細" }
				},
				{
					path: "/search",
					query: { q: "word" },
					name: "search",
					component: ThreadDetailSearchResult,
					meta: { isPublic: false, title: "スレッド・レスの検索結果" }
				}
				// {
				// 	path: "/my-favorite-response",
				// 	name: "my-favorite-response",
				// 	component: ThreadDetailSearchResult,
				// 	meta: { isPublic: false, title: "高く評価したレス一覧" }
				// }
			]
		},
		{
			path: "/signup",
			name: "signup",
			component: Signup,
			meta: { isPublic: true, title: "アカウントを作成する" }
		},
		{
			path: "*",
			redirect: "/thread"
		}
	],
	scrollBehavior() {
		return { x: 0, y: 0 }
	}
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.isPublic)) {
		// 遷移先がルート認証不要な場合は指定している画面へ遷移します。
		next();
	} else {
		// 遷移先がルート認証必要な場合は、ログインしているかどうか確認します。
		firebase.auth().onAuthStateChanged(currentUser => {
			if (currentUser) {
				next();
			} else {
				// ログインしていない場合はログイン画面へ遷移します。
				next({ name: "login" });
			}
		});
	}
});

export default router;
