import { createSlice } from "@reduxjs/toolkit";

export const developerSlice = createSlice({
  name: "developer",
  initialState: {
    developers: [],
    managers:[],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getDeveloperStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getDeveloperSuccess: (state, action) => {
      state.isFetching = false;
      state.developers = action.payload;
    },
    getDeveloperFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //get managers
    getManagerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getManagerSuccess: (state, action) => {
      state.isFetching = false;
      state.managers = action.payload;
    },
    getManagerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteDeveloperStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteDeveloperSuccess: (state, action) => {
      state.isFetching = false;
      state.developers.splice(
        state.developers.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteDeveloperFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateDeveloperStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateDeveloperSuccess: (state, action) => {
      state.isFetching = false;
      state.developers[
        state.developers.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.developer;
    },
    updateDeveloperFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addDeveloperStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addDeveloperSuccess: (state, action) => {
      state.isFetching = false;
      state.developers.push(action.payload);
    },
    addDeveloperFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getDeveloperStart,
  getDeveloperSuccess,
  getDeveloperFailure,
  deleteDeveloperStart,
  deleteDeveloperSuccess,
  deleteDeveloperFailure,
  updateDeveloperStart,
  updateDeveloperSuccess,
  updateDeveloperFailure,
  addDeveloperStart,
  addDeveloperSuccess,
  addDeveloperFailure,
  getManagerStart,
  getManagerSuccess,
  getManagerFailure,
} = developerSlice.actions;

export default developerSlice.reducer;