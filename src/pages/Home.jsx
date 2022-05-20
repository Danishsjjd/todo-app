import Form from "../components/Form";
import TodoList from "../components/TodoList";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData, setIsLogin } from "../store/authSlice";

function Home() {
	const dispatch = useDispatch();
	const signOutHandler = async () => {
		try {
			await signOut(auth);
			dispatch(setUserData({}));
			dispatch(setIsLogin(false));
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div className="container">
			<h1 style={{ textAlign: "center", margin: "20px 0", color: "white" }}>
				TODO's APP
			</h1>
			<Form />
			<TodoList />
			<button className="btn btn-danger" onClick={signOutHandler}>
				SignOut
			</button>
		</div>
	);
}

export default Home;
