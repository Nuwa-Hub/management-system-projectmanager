import { createSlice } from "@reduxjs/toolkit";

export const choreSlice = createSlice({
  name: "chore",
  initialState: {
    chores: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getChoreStart: (state) => {
      state.isFetching = true;
      state.chores=[]
      state.error = false;
    },
    getChoreSuccess: (state, action) => {
      state.isFetching = false;
      state.chores = action.payload;
    },
    getChoreFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteChoreStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteChoreSuccess: (state, action) => {
      state.isFetching = false;
      state.chores.splice(
        state.chores.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteChoreFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateChoreStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateChoreSuccess: (state, action) => {
      state.isFetching = false;
      state.chores[
        state.chores.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.chore;
    },
    updateChoreFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //add chore
    addChoreStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addChoreSuccess: (state, action) => {
      state.isFetching = false;
      state.chores.unshift(action.payload);
    },
    addChoreFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getChoreStart,
  getChoreSuccess,
  getChoreFailure,
  deleteChoreStart,
  deleteChoreSuccess,
  deleteChoreFailure,
  updateChoreStart,
  updateChoreSuccess,
  updateChoreFailure,
  addChoreStart,
  addChoreSuccess,
  addChoreFailure,
} = choreSlice.actions;

export default choreSlice.reducer;