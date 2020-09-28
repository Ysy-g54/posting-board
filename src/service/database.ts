import Vue from "vue";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/configs/firebase.js' or its ... Remove this comment to see the full error message
import { firebaseConfig } from "@/configs/firebase.js";

Vue.use(firestorePlugin);
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.firestore();
export default database;
