import firebase from "firebase";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyAJQ_IXFHnZxzZ_5vuVav5woTZYqM5Y5a4",
  authDomain: "security-dev-project.firebaseapp.com",
  projectId: "security-dev-project",
  storageBucket: "security-dev-project.appspot.com",
  messagingSenderId: "727344406665",
  appId: "1:727344406665:web:58469aa7c48dd20a2e6658",
});
