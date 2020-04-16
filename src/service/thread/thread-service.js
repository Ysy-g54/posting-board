import firebase from "firebase";
import "firebase/firestore";

/**
 * スレッドリスト情報を取得します。
 *
 * @returns スレッドリスト情報
 */
function searchAll() {
  return firebase
    .firestore()
    .collection("thread")
    .orderBy("insertDateTime", "desc")
    .get();
}

/**
 * スレッドIDをもとにスレッド情報を取得します。
 * @param  {String} threadId
 * @returns スレッド情報
 */
function searchByThreadId(threadId) {
  return firebase
    .firestore()
    .collection("thread")
    .doc(threadId)
    .get();
}

/**
 * スレッド情報を登録します。
 * @param  {Object} thread
 * @returns 登録したスレッド情報
 */
function register(thread) {
  return firebase
    .firestore()
    .collection("thread")
    .add(thread);
}

/**
 * スレッドIDをもとにスレッド情報を削除します。
 * @param  {String} threadId
 */
function remove(threadId) {
  firebase
    .firestore()
    .collection("thread")
    .doc(threadId)
    .delete();
}

export default {
  searchAll,
  searchByThreadId,
  register,
  remove
};
