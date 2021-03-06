import { FaTrash, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setTodoData } from "../store/todoSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useEffect } from "react";
import { database } from "../config/firebase";
import {
	onSnapshot,
	collection,
	query,
	where,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";

export default function TodoList() {
	const userId = useSelector((state) => state.authSlice.userData.uid);
	const cloudLogin = useSelector((state) => state.authSlice.cloudLogin);
	const dispatch = useDispatch();
	const collectionRef = collection(database, "todo/");
	const filterData = useSelector((state) => state.todoSlice.filterData);
	const checkHandler = (todo) => {
		const docRef = doc(database, `todo/${todo.id}`);
		updateDoc(docRef, { ...todo, completed: !todo.completed });
	};
	const deleteHandler = (todo) => {
		const docRef = doc(database, "todo", todo.id);
		deleteDoc(docRef);
	};

	useEffect(() => {
		if (cloudLogin) {
			onSnapshot(
				query(collectionRef, where("userId", "==", userId)),
				(snapshot) => {
					dispatch(
						setTodoData(
							snapshot.docs.map((item) => ({
								...item.data(),
								id: item.id,
							}))
						)
					);
				}
			);
		}
	}, [cloudLogin]);

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
