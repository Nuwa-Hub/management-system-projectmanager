import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getNotificationStart: (state) => {
      state.isFetching = true;
      state.notifications=[]
      state.error = false;
    },
    getNotificationSuccess: (state, action) => {
      state.isFetching = false;
      state.notifications = action.payload;
    },
    getNotificationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteNotificationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteNotificationSuccess: (state, action) => {
      state.isFetching = false;
      state.notifications.splice(
        state.notifications.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteNotificationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
 
    //add notification
    addNotificationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addNotificationSuccess: (state, action) => {
      state.isFetching = false;
    },
    addNotificationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getNotificationStart,
  getNotificationSuccess,
  getNotificationFailure,
  deleteNotificationStart,
  deleteNotificationSuccess,
  deleteNotificationFailure,
  addNotificationStart,
  addNotificationSuccess,
  addNotificationFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;