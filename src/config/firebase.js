import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAsM1I9PdVjG4vMc3at5XV9p2tM6wfBfi8",
    authDomain: "chat-room-441c6.firebaseapp.com",
    projectId: "chat-room-441c6",
    storageBucket: "chat-room-441c6.appspot.com",
    messagingSenderId: "701401571888",
    appId: "1:701401571888:web:b799dc9c075d90798fc3f5",
  })
  .auth();
