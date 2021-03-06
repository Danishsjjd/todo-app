import { useState, useLayoutEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFilterData } from "../store/todoSlice";
import { database } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Form() {
	const dispatch = useDispatch();
	const todoData = useSelector((state) => state.todoSlice.todoData);
	const [todo, setTodo] = useState("");
	const [status, setStatus] = useState("");

	const userId = useSelector((state) => state.authSlice.userData.uid);
	const collectionRef = collection(database, "todo/");

	useLayoutEffect(() => {
		filterTodo();
	}, [todoData, status]);

	function filterTodo() {
		switch (status) {
			case "completed":
				const filterData = todoData.filter(
					(item) => item.completed === true
				);
				dispatch(setFilterData(filterData));
				break;

			case "remaining":
				const filterItems = todoData.filter(
					(item) => item.completed === false
				);
				dispatch(setFilterData(filterItems));
				break;
			default:
				dispatch(setFilterData(todoData));
				break;
		}
	}

	const filterChangeHandler = (e) => {
		const value = e.target.value;
		setStatus(value);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		if (!todo) return alert("please Enter todo first");
		const finalData = {
			data: todo,
			completed: false,
			userId: userId,
		};
		await addDoc(collectionRef, { ...finalData })
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
