import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, deleteCar } from '../Redux/carsSlice';

const DeleteCar = () => {
  const { cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleDelete = (carId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (confirmDelete) {
      dispatch(deleteCar(carId));
    }
  };
 

  return (
   
  );
};

export default DeleteCar;
