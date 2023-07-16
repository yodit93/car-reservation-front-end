import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';
import usersReducer from './userSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    cars: carsReducer,
  },
});

export default store;
