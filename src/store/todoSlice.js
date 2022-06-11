import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
	name: "todoSlice",
	initialState: {
		todoData: [],
		filterData: [],
	},
	reducers: {
		setTodoData: (state, action) => {
			state.todoData = action.payload;
		},
		setFilterData: (state, action) => {
			state.filterData = action.payload;
		},
	},
});

export default todoSlice.reducer;
export const { setTodoData, setFilterData } = todoSlice.actions;
