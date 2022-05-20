import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { setIsLogin, setUserData } from "../store/authSlice";

export default function Router() {
	const dispatch = useDispatch();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setIsLogin(true));
				dispatch(setUserData(user));
			}
		});
	}, []);
	const isLogin = useSelector((state) => state.authSlice.isLogin);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoutes isLogin={isLogin}>
							<Home />
						</PrivateRoutes>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoutes isLogin={isLogin}>
							<Login />
						</PublicRoutes>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
