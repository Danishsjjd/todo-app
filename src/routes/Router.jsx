import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { useSelector } from "react-redux";

export default function Router() {
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
