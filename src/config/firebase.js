import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
	apiKey: "AIzaSyCxJ8UpqPtRlv09poFnFuF4pHL6p2EUgiQ",
	authDomain: "todo-app-d0c20.firebaseapp.com",
	projectId: "todo-app-d0c20",
	storageBucket: "todo-app-d0c20.appspot.com",
	messagingSenderId: "91375117837",
	appId: "1:91375117837:web:b58e95ff337097e3ee5744",
};
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const auth = getAuth(app)