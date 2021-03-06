import firebase from "firebase";
import "firebase/firestore";

/**
 * レスポンスリスト情報を取得します。
 * 
 * @returns レスポンスリスト情報
 */
function searchAll() {
	return firebase.firestore().collection("response").get();
}

/**
 * レスポンスIDをもとにレスポンス情報を取得します。
 * @param  {String} responseId
 * @returns レスポンス情報
 */
function searchByResponseId(responseId) {
	return firebase.firestore().collection("response").doc(responseId).get();
}

/**
 * スレッドIDをもとにレスポンスリスト情報を取得します。
 * 
 * @returns レスポンスリスト情報
 */
function searchByThreadId(threadId) {
	return firebase.firestore().collection("response").where("threadId", "==", threadId).get();
}

/**
 * レスポンス情報を登録します。
 * @param  {Object} response
 * @returns 登録したスレッド情報
 */
function register(response) {
	return firebase.firestore().collection("response").add(response);
}

/**
 * レスポンス情報を更新します。
 * @param  {Object} response
 * @param  {String} responseId
 * @returns 更新したスレッド情報
 */
function modify(response, responseId) {
	return firebase.firestore().collection("response").doc(responseId).set(response);
}
/**
 * レスポンスIDをもとにレスポンス情報を削除します。
 * @param  {String} responseId
 */
function remove(responseId) {
	firebase.firestore().collection("response").doc(responseId).delete();
}

export default {
	searchAll,
	searchByResponseId,
	searchByThreadId,
	register,
	modify,
	remove
};
