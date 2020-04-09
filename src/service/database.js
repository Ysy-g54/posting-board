import Vue from "vue";
import { firestorePlugin } from 'vuefire';
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(firestorePlugin);
// let database = null;
// fetch('/__/firebase/init.json').then(async response => {
// 	console.error(await response, response.json());
// 	firebase.initializeApp(await response);

// });
const database = firebase.firestore();
export default database;

