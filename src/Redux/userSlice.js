import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  error: null,
};

const url = 'http://127.0.0.1:3001/api/v1/users';
export const getUsers = createAsyncThunk('users/getUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to fetch users');
  }
});
export const createUser = createAsyncThunk('users/createUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(url, userData);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to create user');
  }
});
export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, userData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${url}/${userId}`, userData);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to update user');
  }
});
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { rejectWithValue }) => {
  try {
    await axios.delete(`${url}/${userId}`);
    return userId;
  } catch (err) {
    return rejectWithValue('Unable to delete user');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getUsers.fulfilled, (state, { payload }) => ({
        ...state,
        users: payload,
        isLoading: false,
      }))
      .addCase(getUsers.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(createUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(createUser.fulfilled, (state, { payload }) => ({
        ...state,
        users: [...state.users, payload], // Add the created user to the existing list
        isLoading: false,
      }))
      .addCase(createUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(updateUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const updatedUsers = state.users.map((user) => {
          if (user.id === payload.id) {
            return payload; // Replace the updated user in the list
          }
          return user;
        });

        return {
          ...state,
          users: updatedUsers,
          isLoading: false,
        };
      })
      .addCase(updateUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(deleteUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(deleteUser.fulfilled, (state, { payload }) => ({
        ...state,
        users: state.users.filter((user) => user.id !== payload),
        isLoading: false,
      }))
      .addCase(deleteUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }));
  },
});

export default usersSlice.reducer;
