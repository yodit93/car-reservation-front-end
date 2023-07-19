import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, deleteCar } from '../Redux/carsSlice';

const DeleteCar = () => {
  const { cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);


 

  return (
   
  );
};

export default DeleteCar;
