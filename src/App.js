import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<ToastContainer position="top center" />
			<Router />
		</>
	);
}

export default App;
