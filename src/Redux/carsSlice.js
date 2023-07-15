import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cars: [],
  error: null,
  isLoading: false,
};

const url = 'http://127.0.0.1:3001/api/v1/cars';
export const getCars = createAsyncThunk('cars/getCars', async (_, { rejectWithValue }) => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to fetch data');
  }
});
const carsSlice = createSlice({
  name: 'cars',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getCars.fulfilled, (state, { payload }) => ({
        ...state,
        cars: payload,
        isLoading: false,
      }))
      .addCase(getCars.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }));
  },
});

export default carsSlice.reducer;
