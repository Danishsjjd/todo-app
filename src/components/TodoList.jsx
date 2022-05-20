import { FaTrash, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setTodoData, setFilterData } from "../store/todoSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useEffect } from "react";
import { database } from "../config/firebase";
import {
	getDocs,
	collection,
	query,
	where,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function TodoList() {
	const userId = useSelector((state) => state.authSlice.userData.uid);
	const collectionRef = collection(database, "todo/");
	const queryRef = query(collectionRef, where("userId", "==", userId));
	const dispatch = useDispatch();
	const todoData = useSelector((state) => state.todoSlice.todoData);
	const filterData = useSelector((state) => state.todoSlice.filterData);
	const checkHandler = (todo) => {
		const newTodo = { ...todo, completed: !todo.completed };
		const newTodoData = todoData.map((item) => {
			if (item.id === todo.id) return newTodo;
			return item;
		});
		const docRef = doc(database, `todo/${todo.id}`);
		updateDoc(docRef, { ...todo, completed: !todo.completed })
			.then(() => {
				dispatch(setTodoData(newTodoData));
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};
	const deleteHandler = (todo) => {
		const docRef = doc(database, "todo", todo.id);
		deleteDoc(docRef)
			.then(() => {
				const newTodo = todoData.filter((item) => item.id !== todo.id);
				dispatch(setTodoData(newTodo));
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	useEffect(() => {
		async function getDocuments() {
			const querySnapshot = await getDocs(queryRef);
			const finalData = [];
			querySnapshot.forEach((doc) => {
				if (doc.exists) finalData.push({ ...doc.data(), id: doc.id });
			});

			dispatch(setTodoData(finalData));
			dispatch(setFilterData(finalData));
		}
		getDocuments();
	}, []);

	return (
		<>
			<TransitionGroup component="ul" className="todoList">
				{filterData &&
					filterData.map((todo) => (
						<CSSTransition
							key={todo.id}
							timeout={500}
							classNames="thisThat"
						>
							<li className={`${todo.completed ? "completed" : ""}`}>
								<div className="data">{todo.data}</div>
								<button
									className=" btnTrash"
									onClick={() => deleteHandler(todo)}
								>
									<FaTrash />
								</button>
								<button
									className=" btnCheck"
									onClick={() => checkHandler(todo)}
								>
									<FaCheck />
								</button>
							</li>
						</CSSTransition>
					))}
			</TransitionGroup>
		</>
	);
}
