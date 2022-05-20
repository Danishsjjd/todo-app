import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSingleTodoData } from "../store/todoSlice";
import { database } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Form() {
	const dispatch = useDispatch();
	const [todo, setTodo] = useState("");

	const userId = useSelector((state) => state.authSlice.userData.uid);
	const collectionRef = collection(database, "todo/");

	const filterChangeHandler = (e) => {
		const value = e.target.value
		switch (value) {
			case "all":
				
				break;
		
			default:
				break;
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!todo) return alert("please Enter todo first");
		const finalData = {
			data: todo,
			completed: false,
			userId: userId,
		};
		addDoc(collectionRef, { ...finalData })
			.then((data) => {
				dispatch(setSingleTodoData({ ...finalData, id: data.id }));
			})
			.catch((error) => {
				toast.error(error.message);
			});
		setTodo("");
	};

	return (
		<form className="form" onSubmit={submitHandler}>
			<div className="inputs">
				<input
					type="text"
					value={todo}
					onChange={(e) => setTodo(e.target.value)}
					placeholder="Enter Todo"
				/>
				<button type="submit" className="btn">
					<FaPlus color="white" />
				</button>
			</div>
			<div className="select">
				<select onChange={filterChangeHandler}>
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="remaining">Remaining</option>
				</select>
			</div>
		</form>
	);
}
