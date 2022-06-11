import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./config/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { setIsLogin, setUserData } from "./store/authSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

onAuthStateChanged(auth, (user) => {
	if (user) {
		store.dispatch(setIsLogin(true));
		store.dispatch(setUserData(user));
	} else {
		store.dispatch(setIsLogin(false));
		store.dispatch(setUserData({}));
	}
});

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
);
