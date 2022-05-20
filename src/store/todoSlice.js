import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
	name: "todoSlice",
	initialState: {
		todoData: [],
		filterData: [],
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
		setSingleFilterData: (state, action) => {
			state.todoData = [...state.todoData, action.payload];
		},
	},
});

export default todoSlice.reducer;
export const { setSingleTodoData, setTodoData, setFilterData, setSingleFilterData} =
	todoSlice.actions;
