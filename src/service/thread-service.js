import firebase from "firebase";
import "firebase/firestore";

/**
 * スレッド情報を取得します。
 * 
 * @returns スレッド情報
 */
function searchAll() {
	return firebase.firestore().collection("thread").get();
}

/**
 * スレッド情報を登録します。
 * @param  {Object} thread
 * @returns 登録したスレッド情報
 */
function register(thread) {
	return firebase.firestore().collection("thread").add(thread);
}

export default {
	searchAll,
	register
};
