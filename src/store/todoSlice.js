import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const todoSlice = createSlice({
	name: "todoSlice",
	initialState: {
		todoData: [],
		filterData: function () {
			return this.todoData;
		},
	},
	reducers: {
		setSingleTodoData: (state, action) => {
			state.todoData = [...state.todoData, action.payload];
		},
		setTodoData: (state, action) => {
			state.todoData = action.payload;
		},
		setFilterData: (state, action) => {
			state.filterData = action.payload;
		},
	},
});

export default todoSlice.reducer;
export const { setSingleTodoData, setTodoData } = todoSlice.actions;
