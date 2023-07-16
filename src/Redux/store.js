import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';
import usersReducer from './userSlice';
import reservationsReducer from './reservationsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    cars: carsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
