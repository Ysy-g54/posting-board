import Vue from "vue";
import { firestorePlugin } from 'vuefire';
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from '@/configs/firebase.js';

Vue.use(firestorePlugin);
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export default database;