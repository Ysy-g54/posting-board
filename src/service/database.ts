import Vue from "vue";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "@/configs/firebase.ts";

Vue.use(firestorePlugin);
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.firestore();
export default database;
