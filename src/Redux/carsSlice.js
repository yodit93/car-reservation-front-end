import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cars: [],
  error: null,
  isLoading: true,
  cardetails: [],
};

const url = 'https://carbooker.onrender.com/api/v1/cars';
export const getCars = createAsyncThunk('cars/getCars', async (_, { rejectWithValue }) => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to fetch data');
  }
});
export const createCar = createAsyncThunk('cars/createCar', async (carData, { rejectWithValue }) => {
  try {
    const response = await axios.post(url, carData);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to create car');
  }
});
export const updateCar = createAsyncThunk('cars/updateCar', async ({ carId, carData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${url}/${carId}`, carData);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to update car');
  }
});
export const deleteCar = createAsyncThunk('cars/deleteCar', async (carId, { rejectWithValue }) => {
  try {
    await axios.delete(`${url}/${carId}`);
    return carId;
  } catch (err) {
    return rejectWithValue('Unable to delete car');
  }
});

export const fetchCarDetails = createAsyncThunk('cars/cardetails', async (id) => {
  try {
    const response = await axios.get(`https://carbooker.onrender.com/api/v1/cars/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCars.fulfilled, (state, { payload }) => ({
        ...state,
        cars: payload,
        isLoading: false,
      }))
      .addCase(getCars.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(createCar.fulfilled, (state, { payload }) => ({
        ...state,
        cars: [...state.cars, payload], // Add the created car to the existing list
        isLoading: false,
      }))
      .addCase(createCar.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(updateCar.fulfilled, (state, { payload }) => {
        const updatedCars = state.cars.map((car) => {
          if (car.id === payload.id) {
            return payload; // Replace the updated car in the list
          }
          return car;
        });

        return {
          ...state,
          cars: updatedCars,
          isLoading: false,
        };
      })
      .addCase(updateCar.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(deleteCar.fulfilled, (state, { payload }) => ({
        ...state,
        cars: state.cars.filter((car) => car.id !== payload),
        isLoading: false,
      }))
      .addCase(deleteCar.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(fetchCarDetails.fulfilled, (state, { payload }) => {
        const newDescription = [];
        newDescription.push(payload);
        return {
          ...state,
          isLoading: false,
          cardetails: newDescription,
        };
      });
  },
});

export default carsSlice.reducer;
