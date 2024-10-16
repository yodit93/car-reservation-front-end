import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservations: [],
  error: null,
  isLoading: false,
};

const url = 'https://carbooker-backend.onrender.com/api/v1/reservations';
export const getReservations = createAsyncThunk('reservations/getReservations', async (_, { rejectWithValue }) => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to fetch reservations');
  }
});
export const createReservation = createAsyncThunk('reservations/createReservation', async (reservationData, { rejectWithValue }) => {
  try {
    const response = await axios.post(url, reservationData);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to create reservation');
  }
});
export const updateReservation = createAsyncThunk('reservations/updateReservation', async ({ reservationId, reservationData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${url}/${reservationId}`, reservationData);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to update reservation');
  }
});
export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async (reservationId, { rejectWithValue }) => {
  try {
    await axios.delete(`${url}/${reservationId}`);
    return reservationId;
  } catch (err) {
    return rejectWithValue('Unable to delete reservation');
  }
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getReservations.fulfilled, (state, { payload }) => ({
        ...state,
        reservations: payload,
        isLoading: false,
      }))
      .addCase(getReservations.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(createReservation.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(createReservation.fulfilled, (state, { payload }) => ({
        ...state,
        reservations: [...state.reservations, payload],
        isLoading: false,
      }))
      .addCase(createReservation.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(updateReservation.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(updateReservation.fulfilled, (state, { payload }) => {
        const updatedReservations = state.reservations.map((reservation) => {
          if (reservation.id === payload.id) {
            return payload; // Replace the updated reservation in the list
          }
          return reservation;
        });

        return {
          ...state,
          reservations: updatedReservations,
          isLoading: false,
        };
      })
      .addCase(updateReservation.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(deleteReservation.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(deleteReservation.fulfilled, (state, { payload }) => ({
        ...state,
        reservations: state.reservations.filter((reservation) => reservation.id !== payload),
        isLoading: false,
      }))
      .addCase(deleteReservation.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }));
  },
});

export default reservationsSlice.reducer;
