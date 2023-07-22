import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  currentUser: JSON.parse(localStorage.getItem('currentUser')) ?? null,
  isAuthenticated: JSON.parse(localStorage.getItem('currentUser')) ?? false,
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
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    localStorage.setItem('isAuthenticated', true);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to create user');
  }
});
export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:3001/users/sign_in', userData, {
        withCredentials: true,
      });
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      localStorage.setItem('isAuthenticated', true);
      return response.data;
    } catch (err) {
      return rejectWithValue('Unable to log in the user');
    }
  },
);
export const signOutUser = createAsyncThunk(
  'users/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete('http://127.0.0.1:3001/users/sign_out', {
        withCredentials: true,
      });
      localStorage.removeItem('currentUser');
      localStorage.setItem('isAuthenticated', false);
      return response.data;
    } catch (err) {
      localStorage.removeItem('currentUser');
      localStorage.setItem('isAuthenticated', false);
      return rejectWithValue('Unable to sign out the user');
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => ({
      ...state,
      error: null,
    }),
  },
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
        currentUser: payload,
        isAuthenticated: true,
        isLoading: false,
      }))
      .addCase(createUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(loginUser.fulfilled, (state, { payload }) => ({
        ...state,
        currentUser: payload,
        isAuthenticated: true,
      }))
      .addCase(loginUser.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
      }))
      .addCase(signOutUser.fulfilled, (state) => ({
        ...state,
        currentUser: null,
        isAuthenticated: false,
      }))
      .addCase(signOutUser.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
      }));
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;
