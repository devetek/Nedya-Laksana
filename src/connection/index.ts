import app from "firebase/app";
import "firebase/database";
import "firebase/analytics";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBH0_lbGe4h0OoJ27P3tCP6nsnmgFIeIC8",
  authDomain: "nedya-laksana.firebaseapp.com",
  databaseURL: "https://nedya-laksana.firebaseio.com",
  projectId: "nedya-laksana",
  storageBucket: "nedya-laksana.appspot.com",
  messagingSenderId: "511914207591",
  appId: "1:511914207591:web:82d768fc907081367427c2",
  measurementId: "G-T3VVJMQKHX",
};

export interface IFirebaseClass {
  db?: app.database.Database;
  store?: app.firestore.Firestore;
  updateStartFrom: () => Promise<
    app.firestore.DocumentSnapshot<app.firestore.DocumentData>
  >;
  getStartFrom: () => Promise<
    app.firestore.DocumentSnapshot<app.firestore.DocumentData>
  >;
}

class Firebase implements IFirebaseClass {
  db: app.database.Database;
  store: app.firestore.Firestore;

  constructor() {
    app.initializeApp(config);
    app.analytics();
    this.db = app.database();
    this.store = app.firestore();
    this.store.settings({
      ignoreUndefinedProperties: true,
    });
  }

  updateStartFrom = () =>
    this.store.collection("first_value").doc("permanent").get();
  getStartFrom = () =>
    this.store.collection("first_value").doc("permanent").get();
}

export default Firebase;
