import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../store/todoSlice";
import authSlice from "../store/authSlice";

const store = configureStore({
	reducer: {
		todoSlice,
		authSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
